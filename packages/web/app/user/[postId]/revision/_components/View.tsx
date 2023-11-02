"use client";

import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/toast";
import { FullPost, Revision } from "core/post";
import { restoreRevision } from "../../../_action";

import NextLink from "next/link";
import { Container, styled } from "@/lib/style/system/jsx";
import { Frame, Header } from "@/components/frame";
import { RevisionListItem } from "@/components/post";

import { ChevronLeft } from "lucide-react";

type Props = {
  post: FullPost;
};

export function View({ post }: Props) {
  const router = useRouter();
  const { toast } = useToast();

  const restore = async (revision: Revision) => {
    try {
      await restoreRevision({
        userId: post.userId,
        postId: post.id,
        revisionId: revision.id,
        postBody: revision.body,
        revisionBody: post.body,
      });
      router.push(`/user/${post.id}`);
    } catch (_e) {
      toast({
        title: "Error",
        description: "復元できませんでした。",
      });
    }
  };

  return (
    <Frame
      header={
        <Header
          title={<styled.img src="/images/logo_palt.png" w="auto" h="s.200" />}
          leading={
            <NextLink href={`/user/${post.id}`}>
              <ChevronLeft size={24} />
            </NextLink>
          }
        />
      }
    >
      <Container id="scroll" h="100%" overflowY="scroll">
        {post.revisions.map((r) => {
          return (
            <styled.div
              key={r.id}
              css={{
                py: "m.100",
                borderTop: "1px solid token(colors.border)",
                "&:first-child": {
                  pt: "m.50",
                  borderTop: "none",
                },
              }}
            >
              <RevisionListItem
                revision={r}
                onClick={() => {
                  restore(r);
                }}
              />
            </styled.div>
          );
        })}
      </Container>
    </Frame>
  );
}
