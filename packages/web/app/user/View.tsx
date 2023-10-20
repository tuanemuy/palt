"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Tag } from "db";
import { useToast } from "@/components/ui/toast";
import { UserWithProfile, ListedPosts, getPosts, addPost } from "./_action";

import NextLink from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import { Container, Flex, styled } from "@/lib/style/system/jsx";
import { Frame } from "@/components/frame";
import { ListItem } from "@/components/post";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { Plus, Settings } from "lucide-react";

type Props = {
  user: UserWithProfile;
  tags: Tag[];
};

type FetchState = {
  perPage: number;
  page: number;
  tagsInput: {
    [key: string]: Tag | undefined;
  };
  text: string;
  count: number;
  posts: ListedPosts;
};

export function View({ user, tags }: Props) {
  const router = useRouter();
  const { toast } = useToast();

  const perPage = 30;
  const [posts, setPosts] = useState<ListedPosts>([]);
  const [count, setCount] = useState(0);
  const [tagsInput, setTagsInput] = useState<{
    [key: string]: Tag | undefined;
  }>({});
  const [text, setText] = useState<string>("");

  const newPost = async () => {
    const result = await addPost({ userId: user.id });

    if (result.post) {
      router.push(`/user/${result.post.id}`);
    } else {
      toast({
        title: "Error",
        description: "もう一度お試しください。",
      });
    }
  };

  const fetch = async (
    ti: { [key: string]: Tag | undefined },
    t: string,
    reset?: boolean
  ) => {
    const tagIds = Object.keys(ti)
      .map((key) => {
        return ti[key] ? key : null;
      })
      .filter((id): id is string => id !== null);

    const skip = reset ? 0 : posts.length;
    const result = await getPosts({
      skip,
      take: perPage,
      orderBy: user.profile?.orderBy || "createdAt",
      userId: user.id,
      tagIds: tagIds.length > 0 ? tagIds : undefined,
      text: t === "" ? undefined : t,
    });

    if (result.posts) {
      setPosts((prev) => (reset ? result.posts : [...prev, ...result.posts]));
      setCount(result.count);
    }
  };

  useEffect(() => {
    fetch(tagsInput, text, true);
  }, []);

  return (
    <Frame
      title={
        <Input
          w="m.300"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            fetch(tagsInput, e.target.value, true);
          }}
        />
      }
      trailing={
        <NextLink href="/user/settings">
          <Settings size={24} />
        </NextLink>
      }
      drawer={
        <Flex direction="column" gap="s.200">
          {tags?.map((t) => {
            return (
              <Flex key={t.id} align="center" gap="s.100">
                <Checkbox
                  id={t.id}
                  name="tagIds"
                  onCheckedChange={(checked) => {
                    const newTagsInput = tagsInput;
                    newTagsInput[t.id] =
                      typeof checked === "string" || !checked ? undefined : t;
                    setTagsInput(newTagsInput);
                    fetch(newTagsInput, text, true);
                  }}
                />
                <Label htmlFor={t.id}>{t.name}</Label>
              </Flex>
            );
          })}
        </Flex>
      }
      footer={
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
            {tags.map((t) => {
              return (
                <styled.p fontSize=".8rem" whiteSpace="nowrap">
                  #{t.name}
                </styled.p>
              );
            })}
          </Flex>

          <Plus size={24} onClick={newPost} />
        </Flex>
      }
    >
      <Container id="scroll" h="100%" overflowY="scroll">
        <InfiniteScroll
          scrollableTarget="scroll"
          dataLength={posts.length} //This is important field to render the next data
          next={() => {
            fetch(tagsInput, text, false);
          }}
          hasMore={posts.length < count}
          loader={
            <styled.p mt="s.100" textAlign="center">
              Loading...
            </styled.p>
          }
        >
          {posts.map((p) => {
            return (
              <styled.div
                key={p.id}
                css={{
                  "&:not(:first-child)": {
                    borderTop: "1px solid token(colors.border)",
                  },
                }}
              >
                <ListItem post={p} isEditable={true} />
              </styled.div>
            );
          })}
        </InfiniteScroll>
      </Container>
    </Frame>
  );
}
