"use client";

import { format } from "date-fns";
import { Revision } from "core/post";

import { Box, Flex, styled } from "@/lib/style/system/jsx";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { article } from "@/components/article";
import { ArchiveRestore } from "lucide-react";

type Props = {
  revision: Revision;
  onClick: () => void;
};

export function RevisionListItem({ revision, onClick }: Props) {
  return (
    <Box py="m.50">
      <Box
        position="relative"
        maxH={{ base: "l.100", md: "l.200" }}
        overflow="hidden"
      >
        <Box pb="s.200">
          <article
            className={article}
            dangerouslySetInnerHTML={{ __html: revision.body || "" }}
          />
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
          {format(revision.createdAt, "yyyy.MM.dd HH:mm")}
        </styled.p>

        <AlertDialog>
          <AlertDialogTrigger>
            <ArchiveRestore size={16} />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>復元しますか？</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>キャンセル</AlertDialogCancel>
              <AlertDialogAction asChild>
                <button onClick={onClick}>復元</button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Flex>
    </Box>
  );
}
