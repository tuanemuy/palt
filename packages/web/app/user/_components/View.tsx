"use client";

import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/toast";
import { FullUser } from "core/user";
import { Post, Tag } from "core/post";
import { getPosts, addPost, getTags, editTag } from "../_action";
import { Store } from "../_store";

import NextLink from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import { Container, Flex, styled } from "@/lib/style/system/jsx";
import { Frame } from "@/components/frame";
import { ListItem } from "@/components/post";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { Plus, Settings, LockKeyhole, UnlockKeyhole } from "lucide-react";

type Props = {
  user: FullUser;
};

export function View({ user }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const { inputTags, inputText } = useContext(Store);

  const perPage = 30;
  const [posts, setPosts] = useState<Post[]>([]);
  const [count, setCount] = useState(0);
  const [tags, setTags] = useState<Tag[]>([]);

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

  const publishTag = async (id: string, index: number, isPublic: boolean) => {
    const { tag } = await editTag({
      id,
      isPublic,
    });

    setTags((prev) => {
      prev[index] = tag || prev[index];
      return [...prev];
    });
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
    const id = setTimeout(() => {
      fetch(inputTags.value, inputText.value, true);
    }, 500);

    return () => {
      clearTimeout(id);
    };
  }, [inputText.value]);

  useEffect(() => {
    fetch(inputTags.value, inputText.value, true);

    (async () => {
      try {
        const result = await getTags({ userId: user.id });
        setTags(result.tags || []);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <Frame
      title={
        <Input
          w="m.300"
          fontSize="16px"
          value={inputText.value}
          onChange={(e) => {
            inputText.setValue(e.target.value);
          }}
        />
      }
      trailing={
        <NextLink href="/user/settings">
          <Settings size={24} />
        </NextLink>
      }
      drawer={
        <Flex direction="column" gap="s.250">
          {tags?.map((t, i) => {
            return (
              <Flex
                key={t.id}
                align="center"
                justify="space-between"
                gap="s.200"
              >
                <Flex align="center" gap="s.100">
                  <Checkbox
                    id={t.id}
                    name="tagIds"
                    checked={inputTags.value[t.id] !== undefined}
                    onCheckedChange={(checked) => {
                      const newTagsInput = inputTags.value;
                      newTagsInput[t.id] =
                        typeof checked === "string" || !checked ? undefined : t;
                      inputTags.setValue(newTagsInput);
                      fetch(newTagsInput, inputText.value, true);
                    }}
                  />
                  <Label htmlFor={t.id} minW="m.100">
                    {t.name}
                  </Label>
                </Flex>

                {t.isPublic && (
                  <styled.button
                    onClick={() => publishTag(t.id, i, false)}
                    color="foreground"
                  >
                    <UnlockKeyhole size={14} />
                  </styled.button>
                )}
                {!t.isPublic && (
                  <styled.button
                    onClick={() => publishTag(t.id, i, true)}
                    color="border"
                  >
                    <LockKeyhole size={14} />
                  </styled.button>
                )}
              </Flex>
            );
          })}
        </Flex>
      }
      footer={
        <Flex wrap="nowrap" gap="s.200" justify="space-between" w="100%">
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
            {Object.keys(inputTags.value).map((key) => {
              const t = inputTags.value[key];
              if (t) {
                return (
                  <styled.p key={t.id} fontSize=".9rem" whiteSpace="nowrap">
                    #{t.name}
                  </styled.p>
                );
              }
            })}
          </Flex>

          <Plus size={24} onClick={newPost} />
        </Flex>
      }
    >
      <Container>
        <InfiniteScroll
          dataLength={posts.length}
          next={() => {
            fetch(inputTags.value, inputText.value, false);
          }}
          hasMore={posts.length < count}
          loader={
            <styled.p mt="s.100" textAlign="center">
              Loading...
            </styled.p>
          }
        >
          {posts.length < 1 && (
            <Button
              onClick={newPost}
              variant="outline"
              mt="m.50"
              w="100%"
              mx="auto"
            >
              投稿を作成する
            </Button>
          )}
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
