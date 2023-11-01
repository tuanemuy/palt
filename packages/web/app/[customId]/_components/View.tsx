"use client";

import { useContext, useState, useEffect } from "react";
import { FullUser } from "core/user";
import { Post, Tag } from "core/post";
import { getUrl } from "core/file";
import { nl2br } from "util/common";
import { getPosts, getTags } from "../_action";
import { Store } from "../_store";

import NextLink from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import { Container, Box, Flex, styled } from "@/lib/style/system/jsx";
import { Frame } from "@/components/frame";
import { ListItem } from "@/components/post";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { LogIn, UserCircle } from "lucide-react";

type Props = {
  user: FullUser;
  isSignedIn: boolean;
};

export function View({ user, isSignedIn }: Props) {
  const { inputTags, inputText } = useContext(Store);

  const perPage = 30;
  const [posts, setPosts] = useState<Post[]>([]);
  const [count, setCount] = useState(0);
  const [tags, setTags] = useState<Tag[]>([]);

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
      orderBy: /* user.profile?.orderBy || */ "createdAt",
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
          value={inputText.value}
          onChange={(e) => {
            inputText.setValue(e.target.value);
          }}
        />
      }
      trailing={
        isSignedIn ? (
          <NextLink href="/user">
            <UserCircle size="24" />
          </NextLink>
        ) : (
          <NextLink href="/api/auth/signin">
            <LogIn size="24" />
          </NextLink>
        )
      }
      drawer={
        <Flex direction="column" gap="s.250">
          {tags?.map((t) => {
            return (
              <Flex key={t.id} align="center" gap="s.100">
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
            );
          })}
        </Flex>
      }
      footer={
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
          pullDownToRefresh
          pullDownToRefreshThreshold={100}
          pullDownToRefreshContent={
            <styled.p textAlign="center">&#8595; Pull down to refresh</styled.p>
          }
          releaseToRefreshContent={
            <styled.p textAlign="center">&#8593; Release to refresh</styled.p>
          }
          refreshFunction={() => {
            console.log("refresh");
            fetch(inputTags.value, inputText.value, true);
          }}
        >
          <Flex my="m.50" gap="s.200" align="center">
            <Box
              flexShrink="0"
              w="m.150"
              h="m.150"
              borderRadius="token(sizes.m.150)"
              overflow="hidden"
              bg="border"
            >
              {user.profile?.thumbnail && (
                <styled.img
                  src={getUrl(user.profile.thumbnail, "webp@640")}
                  alt="thumbnail"
                  w="100%"
                  h="100%"
                  objectFit="cover"
                />
              )}
            </Box>

            <Box flexShrink="1">
              <styled.h1 fontWeight="bold" fontSize="1.25rem" lineHeight="1.5">
                {user.profile?.blogName ||
                  `${user.profile?.displayName || user.customId}のノート`}
              </styled.h1>
              <styled.p fontSize=".8rem">
                by {user.profile?.displayName || user.customId}
              </styled.p>
              <styled.p
                mt="s.50"
                fontSize=".9rem"
                lineHeight="1.75"
                dangerouslySetInnerHTML={{
                  __html: nl2br(user.profile?.introduction || ""),
                }}
              />
            </Box>
          </Flex>

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
                <ListItem
                  post={p}
                  isEditable={false}
                  customId={user.customId || undefined}
                />
              </styled.div>
            );
          })}
        </InfiniteScroll>
      </Container>
    </Frame>
  );
}
