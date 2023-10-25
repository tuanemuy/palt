import { getPost } from "../_action";

import NextLink from "next/link";
import { Container, Flex, styled } from "@/lib/style/system/jsx";
import { Frame } from "@/components/frame";
import { Article } from "@/components/article";
import { ChevronLeft, LockKeyhole, UnlockKeyhole } from "lucide-react";

type Props = {
  params: {
    postId: string;
  };
};

export async function generateMetadata({ params: { postId } }: Props) {
  const { post } = await getPost({ id: postId });

  return {
    title: `title | ${post?.user.name}`,
    description: "Palt",
  };
}

export default async function Page({ params: { postId } }: Props) {
  const { post } = await getPost({ id: postId });

  if (post) {
    return (
      <Frame
        title={<styled.p fontWeight="bold">Palt</styled.p>}
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
        <Container position="relative" h="100%">
          <Article>
            <div dangerouslySetInnerHTML={{ __html: post.body }} />
          </Article>
        </Container>
      </Frame>
    );
  } else {
    throw new Error("Not found");
  }
}
