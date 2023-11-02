"use client";

import { useState, useEffect } from "react";
import twitter from "twitter-text";
// import { throttle } from "lodash-es";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import TipTapImage from "@tiptap/extension-image";
import { FullPost, AccessLevel } from "core/post";
import {
  getPost,
  editPost,
  editPostTags,
  uploadFileOnPost,
  cleanupPost,
} from "../../_action";

import { Container, Box, Flex, styled } from "@/lib/style/system/jsx";
import { Frame, Header } from "@/components/frame";
import { PenSquare, BookOpen } from "lucide-react";
import { EditorContent, EditorBar } from "@/components/post";

type Props = {
  userId: string;
  postId: string;
};

export function View({ userId, postId }: Props) {
  const [post, setPost] = useState<FullPost | null>(null);

  useEffect(() => {
    (async () => {
      const { post } = await getPost({ id: postId });
      if (post) {
        setPost(post);
      }
    })();
  }, []);

  if (post) {
    return <InnerView post={post} userId={userId} />;
  }
}

type InnerViewProps = {
  post: FullPost;
  userId: string;
};

export function InnerView({ post, userId }: InnerViewProps) {
  const isEditable =
    (post.accessibleUsers.filter(
      (au) => au.userId === userId && au.level === AccessLevel.EDIT
    ).length || 0) > 0;
  const [mode, setMode] = useState<"read" | "edit">("read");
  const [body, setBody] = useState(post.body);

  const editor = useEditor({
    extensions: [StarterKit, Link, TipTapImage],
    content: post.body,
    autofocus: true,
    editable: false,
    injectCSS: false,
    onUpdate: ({ editor }) => {
      setBody(editor.getHTML());
    },
    onDestroy: () => cleanupPost({ postId: post.id }),
  });

  useEffect(() => {
    const id =
      isEditable && mode === "edit"
        ? setTimeout(() => {
            editPost({
              id: post.id,
              body,
            });
            editPostTags({
              id: post.id,
              userId: post.userId,
              tags: twitter.extractHashtags(body),
            });
          }, 1000)
        : undefined;

    return () => {
      clearTimeout(id);
    };
  }, [body]);

  return (
    <Frame
      header={
        (isEditable === false || mode === "read") && (
          <Header
            title={
              <styled.img src="/images/logo_palt.png" w="auto" h="s.200" />
            }
            trailing={
              isEditable && (
                <Flex gap="s.200">
                  <styled.button
                    onClick={() => {
                      setMode("edit");
                      editor?.setEditable(true);
                    }}
                  >
                    <PenSquare size={20} />
                  </styled.button>
                </Flex>
              )
            }
          />
        )
      }
    >
      <Container>
        {isEditable && mode === "edit" && editor && (
          <EditorBar
            editor={editor}
            mode={mode}
            changeMode={(mode) => {
              setMode(mode);
              editor.setEditable(mode === "edit");
            }}
            uploadFile={async (
              name: string,
              body: Uint8Array,
              mimeType: string,
              maxWidth: number
            ) => {
              const { fileOnPost } = await uploadFileOnPost(
                post.id,
                name,
                body,
                mimeType,
                maxWidth
              );

              if (fileOnPost) {
                return fileOnPost.file;
              } else {
                throw new Error("Failed to upload a file.");
              }
            }}
          />
        )}

        <Box pt={isEditable && mode === "edit" ? "44px" : "0"}>
          {editor && <EditorContent editor={editor} />}
        </Box>
      </Container>
    </Frame>
  );
}
