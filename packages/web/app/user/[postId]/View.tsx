"use client";

import { useState, useEffect } from "react";
import { Post } from "db";
import { SinglePost, getPost, editPost } from "../_action";

import NextLink from "next/link";
import { Container, styled } from "@/lib/style/system/jsx";
import { Frame } from "@/components/frame";
import { ChevronLeft, LockKeyhole, UnlockKeyhole } from "lucide-react";
import { Editor } from "../_components";

type Props = {
  postId: string;
};

export function View({ postId }: Props) {
  const [post, setPost] = useState<SinglePost | null>(null);
  // const [tags, setTags] = useState(post.tags);

  useEffect(() => {
    (async () => {
      const result = await getPost({ id: postId });
      if (result.post) {
        setPost(result.post);
      }
    })();
  }, []);

  return (
    <Frame
      title={<styled.p fontWeight="bold">Palt</styled.p>}
      leading={
        <NextLink href="/user">
          <ChevronLeft size={24} />
        </NextLink>
      }
      trailing={
        <styled.button
          onClick={async () => {
            if (post) {
              const result = await editPost({
                id: post.id,
                body: post.body,
                isPublic: !post.isPublic,
              });

              setPost((prev) => result.post || prev);
            }
          }}
          color={post?.isPublic ? "foreground" : "border"}
        >
          {post?.isPublic ? (
            <UnlockKeyhole size={20} />
          ) : (
            <LockKeyhole size={20} />
          )}
        </styled.button>
      }
    >
      <Container position="relative" h="100%">
        {post && (
          <Editor
            post={post}
            onChange={async (body) => {
              const result = await editPost({
                id: post.id,
                body,
                isPublic: post.isPublic,
              });

              setPost((prev) => result.post || prev);
            }}
          />
        )}
      </Container>
    </Frame>
  );
}
