import { format } from "date-fns";
import { Post } from "db";

import NextLink from "next/link";
import { Article } from "@/components/article";
import { Box, Flex, styled } from "@/lib/style/system/jsx";
import { PenSquare, LockKeyhole, UnlockKeyhole } from "lucide-react";

type Props = {
  post: Post;
  isEditable?: boolean;
};

export function ListItem({ post, isEditable }: Props) {
  return (
    <Box py="m.50">
      <Box
        position="relative"
        maxH={{ base: "l.100", md: "l.200" }}
        overflow="hidden"
      >
        <Box pb="s.200">
          <Article>
            <styled.div dangerouslySetInnerHTML={{ __html: post.body || "" }} />
          </Article>
        </Box>

        <Box
          position="absolute"
          zIndex="2"
          left="0"
          bottom="0"
          w="100%"
          h="s.200"
          bg="linear-gradient(0deg, token(colors.background), transparent)"
        />
      </Box>

      <Flex justify="space-between" mt="0">
        <styled.p fontSize=".8rem" color="muted.foreground">
          {format(post.createdAt, "yyyy.MM.dd HH:mm")}
        </styled.p>

        {isEditable && (
          <Flex align="center" gap="s.200">
            {post.isPublic && <UnlockKeyhole size={16} />}
            {!post.isPublic && <LockKeyhole size={16} />}

            <NextLink href={`/user/${post.id}`}>
              <PenSquare size={16} />
            </NextLink>
          </Flex>
        )}
      </Flex>
    </Box>
  );
}
