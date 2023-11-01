"use client";

import { useState, useEffect } from "react";
import twitter from "twitter-text";
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

import { Container, Flex, styled } from "@/lib/style/system/jsx";
import { Frame } from "@/components/frame";
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
  const [isEditor, setIsEditor] = useState(false);
  const [bottom, setBottom] = useState<string>("100vh");
  const [body, setBody] = useState(post.body);

  const editor = useEditor({
    extensions: [StarterKit, Link, TipTapImage],
    content: post.body,
    autofocus: true,
    editable: isEditable,
    injectCSS: false,
    onUpdate: ({ editor }) => {
      setBody(editor.getHTML());
    },
    onDestroy: () => cleanupPost({ postId: post.id }),
    onFocus: () => {
      setBottom(`${window.scrollY + (window.visualViewport?.height || 0)}px`);
    },
    onBlur: () => {
      setBottom(`${window.scrollY + (window.visualViewport?.height || 0)}px`);
    },
  });

  useEffect(() => {
    const id = setTimeout(() => {
      editPost({
        id: post.id,
        body,
      });
      editPostTags({
        id: post.id,
        userId: post.userId,
        tags: twitter.extractHashtags(body),
      });
    }, 1000);

    return () => {
      clearTimeout(id);
    };
  }, [body]);

  useEffect(() => {
    const updateBottom = () => {
      if (editor?.isFocused) {
        setBottom(`${window.scrollY + (window.visualViewport?.height || 0)}px`);
      }
    };
    window.addEventListener("scroll", updateBottom);

    return () => {
      window.removeEventListener("scroll", updateBottom);
    };
  }, [editor]);

  return (
    <Frame
      title={<styled.img src="/images/logo_palt.png" w="auto" h="s.200" />}
      trailing={
        <Flex gap="s.200">
          {isEditable && isEditor && (
            <styled.button onClick={() => setIsEditor(false)}>
              <BookOpen size={20} />
            </styled.button>
          )}
          {isEditable && !isEditor && (
            <styled.button onClick={() => setIsEditor(true)}>
              <PenSquare size={20} />
            </styled.button>
          )}
        </Flex>
      }
      footer={
        isEditable &&
        editor && (
          <EditorBar
            editor={editor}
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
        )
      }
      bottom={editor?.isFocused ? bottom : undefined}
    >
      <Container>{editor && <EditorContent editor={editor} />}</Container>
    </Frame>
  );
}
