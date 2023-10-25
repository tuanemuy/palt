"use client";

import { useState, useEffect } from "react";
import { FullPost, AccessLevel } from "core/post";
import { getPost, editPost, editPostTags } from "../../_action";

import { Container, Flex, styled } from "@/lib/style/system/jsx";
import { Frame } from "@/components/frame";
import { PenSquare, BookOpen, LockKeyhole, UnlockKeyhole } from "lucide-react";
import { Editor } from "./Editor";

type Props = {
  userId: string;
  postId: string;
};

export function View({ userId, postId }: Props) {
  const [post, setPost] = useState<FullPost | null>(null);
  const isEditable =
    (post?.accessibleUsers.filter(
      (au) => au.userId === userId && au.level === AccessLevel.EDIT
    ).length || 0) > 0;
  const [isEditor, setIsEditor] = useState(false);

  const fetchPost = async () => {
    const { post } = await getPost({ id: postId });
    if (post) {
      setPost(post);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <Frame
      title={<styled.p fontWeight="bold">Palt</styled.p>}
      trailing={
        <Flex gap="s.200">
          {post?.isPublic ? (
            <styled.div color="warning">
              <UnlockKeyhole size={20} />
            </styled.div>
          ) : (
            <styled.div color="border">
              <LockKeyhole size={20} />
            </styled.div>
          )}

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
    >
      <Container position="relative" h="100%">
        {post && (
          <Editor
            postId={postId}
            initialContent={post.body}
            isEditable={isEditable && isEditor}
            onChangeBody={(body) => {
              editPost({
                id: postId,
                body,
              });
            }}
            onChangeTags={(tags) => {
              editPostTags({
                id: postId,
                userId: post.userId,
                tags,
              });
            }}
          />
        )}
      </Container>
    </Frame>
  );
}
