"use client";

import { useRouter } from "next/navigation";
import { Tag } from "core/post";
import { styled } from "@/lib/style/system/jsx";
import { useToast } from "@/components/ui/toast";
import { addPost } from "../_action";

import { Flex } from "@/lib/style/system/jsx";
import { Plus } from "lucide-react";

type Props = {
  userId: string;
  tags: Tag[];
};

export function Footer({ userId, tags }: Props) {
  const router = useRouter();
  const { toast } = useToast();

  const newPost = async () => {
    const result = await addPost({ userId });

    if (result.post) {
      router.push(`/user/${result.post.id}`);
    } else {
      toast({
        title: "Error",
        description: "もう一度お試しください。",
      });
    }
  };

  return (
    <Flex wrap="nowrap" gap="s.200" justify="space-between">
      <Flex
        gap="s.100"
        wrap="nowrap"
        shrink="1"
        overflowX="scroll"
        css={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {tags.map((t, i) => {
          return (
            <styled.p key={i} fontSize=".8rem" whiteSpace="nowrap">
              #{t.name}
            </styled.p>
          );
        })}
      </Flex>

      <Plus size={24} onClick={newPost} />
    </Flex>
  );
}
