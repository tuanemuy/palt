import { extractTitle, extractDescription } from "core/post";
import { getPost } from "../_action";

import NextLink from "next/link";
import { Container, Flex, styled } from "@/lib/style/system/jsx";
import { Frame } from "@/components/frame";
import { article } from "@/components/article";
import { ChevronLeft, LockKeyhole, UnlockKeyhole } from "lucide-react";

type Props = {
  params: {
    postId: string;
  };
};

export async function generateMetadata({ params: { postId } }: Props) {
  const { post } = await getPost({ id: postId });

  if (post) {
    const title = `${extractTitle(post)} | ${
      post.user.profile?.displayName || post.user.name
    }`;
    const description = extractDescription(post.body);
    return {
      title,
      description,
      twitter: {
        title,
        description,
        card: "summary_large_image",
      },
    };
  } else {
    return {
      title: "Palt",
      description:
        "Paltは、書くことに集中するための、非常にシンプルなメモアプリです。",
    };
  }
}

export default async function Page({ params: { postId } }: Props) {
  const { post } = await getPost({ id: postId });

  if (post) {
    return (
      <Frame
        title={<styled.img src="/images/logo_palt.png" w="auto" h="s.200" />}
        leading={
          <NextLink href={`/${post.user.name}`}>
            <ChevronLeft size={24} />
          </NextLink>
        }
        trailing={
          <Flex gap="s.200">
            {post?.isPublic ? (
              <UnlockKeyhole color="warning" size={20} />
            ) : (
              <LockKeyhole color="border" size={20} />
            )}
          </Flex>
        }
      >
        <Container position="relative" my="m.50">
          <article
            className={article}
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
        </Container>
      </Frame>
    );
  } else {
    throw new Error("Not found");
  }
}
