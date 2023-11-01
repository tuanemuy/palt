import { format } from "date-fns";
import { extractTitle, extractDescription } from "core/post";
import { getUrl } from "core/file";
import { getPost } from "../_action";

import NextLink from "next/link";
import { Container, Box, Flex, styled } from "@/lib/style/system/jsx";
import { Frame } from "@/components/frame";
import { article } from "@/components/article";
import { Separator } from "@/components/ui/separator";
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
      post.user.profile?.blogName ||
      `${post.user.profile?.displayName || post.user.customId}のノート`
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
      title: "Palt | 些細なことも、すべて書き留めよう。",
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
          <NextLink href={`/${post.user.customId}`}>
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

          <Flex gap="s.100" mt="m.50">
            <styled.p fontSize=".8rem">
              作成： {format(post.createdAt, "yyyy/MM/dd HH:mm")}
            </styled.p>

            <styled.p fontSize=".8rem">
              更新： {format(post.updatedAt, "yyyy/MM/dd HH:mm")}
            </styled.p>
          </Flex>

          <Separator mt="s.100" />

          <Flex mt="s.200" gap="s.200" align="center">
            <Box
              flexShrink="0"
              w="m.150"
              h="m.150"
              borderRadius="token(sizes.m.150)"
              overflow="hidden"
              bg="border"
            >
              {post.user.profile?.thumbnail && (
                <styled.img
                  src={getUrl(post.user.profile.thumbnail, "webp@640")}
                  alt="thumbnail"
                  w="100%"
                  h="100%"
                  objectFit="cover"
                />
              )}
            </Box>

            <Box flexShrink="1">
              <styled.h1 fontWeight="bold" fontSize="1.1rem" lineHeight="1.5">
                {post.user.profile?.displayName || post.user.customId}
              </styled.h1>
              <styled.p mt="s.50" fontSize=".9rem" lineHeight="1.75">
                {post.user.profile?.introduction || ""}
              </styled.p>
            </Box>
          </Flex>
        </Container>
      </Frame>
    );
  } else {
    throw new Error("Not found");
  }
}
