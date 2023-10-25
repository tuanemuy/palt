"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FullPost,
  AccessibleUser,
  AccessLevel,
  accessLevelToString,
  stringToAccessLevel,
} from "core/post";
import { useToast } from "@/components/ui/toast";
import {
  getPost,
  editPost,
  editPostTags,
  addAccessibleUser,
  editAccessibleUser,
  removeAccessibleUser,
} from "../_action";

import NextLink from "next/link";
import { Container, Box, Flex, styled } from "@/lib/style/system/jsx";
import { Frame } from "@/components/frame";
import { Article } from "@/components/article";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ChevronLeft,
  LockKeyhole,
  UnlockKeyhole,
  Share,
  Plus,
  Trash2,
} from "lucide-react";
import { Editor } from "./Editor";

type Props = {
  post: FullPost;
};

export function View({ post }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [post, setPost] = useState<FullPost | null>(null);

  useEffect(() => {
    (async () => {
      const result = await getPost({ id: postId });
      if (result.post) {
        setPost(result.post);
      }
    })();
  }, []);

  return (
    <Frame
      title={<styled.p fontWeight="bold">Palt</styled.p>}
      leading={
        post && (
          <NextLink href={`/${post.user.name}`}>
            <ChevronLeft size={24} />
          </NextLink>
        )
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
        {post && !isEditable && (
          <Article>
            <div dangerouslySetInnerHTML={{ __html: post.body }} />
          </Article>
        )}

        {post && isEditable && (
          <Editor
            postId={postId}
            initialContent={post.body}
            onChangeBody={(body) => {
              editPost({
                id: postId,
                body,
              });
            }}
            onChangeTags={(tags) => {
              editPostTags({
                id: postId,
                userId: post.userId,
                tags,
              });
            }}
          />
        )}
      </Container>
    </Frame>
  );
}

type AccessibleUserProps = {
  postId: string;
  accessibleUser: AccessibleUser;
  onRemove: (userId: string) => void;
};

function AccessibleUser({
  postId,
  accessibleUser,
  onRemove,
}: AccessibleUserProps) {
  const changeAccessLevel = async (level: string) => {
    const l = stringToAccessLevel(level);
    if (l) {
      editAccessibleUser({
        postId,
        userId: accessibleUser.userId,
        level: l,
      });
    } else {
      const result = await removeAccessibleUser({
        postId,
        userId: accessibleUser.userId,
      });

      if (result.accessibleUser && onRemove) {
        onRemove(result.accessibleUser.userId);
      }
    }
  };

  return (
    <Flex gap="s.100" alignItems="center" w="100%" mt="s.200">
      <styled.p
        whiteSpace="nowrap"
        flexShrink="1"
        textOverflow="ellipsis"
        overflow="hidden"
      >
        {accessibleUser.user.name || "..."}
        {accessibleUser.user.email && ` (${accessibleUser.user.email})`}
      </styled.p>

      <Select
        onValueChange={(value) => changeAccessLevel(value)}
        defaultValue={
          stringToAccessLevel(accessibleUser.level) || AccessLevel.READ
        }
        w="m.100"
        required
      >
        <SelectTrigger flexShrink="0" w="8rem" whiteSpace="nowrap">
          <SelectValue placeholder="-" />
        </SelectTrigger>

        <SelectContent mt="s.100">
          <SelectGroup>
            <SelectItem value={AccessLevel.READ}>
              {accessLevelToString(AccessLevel.READ)}
            </SelectItem>
            <SelectItem value={AccessLevel.EDIT}>
              {accessLevelToString(AccessLevel.EDIT)}
            </SelectItem>
            <SelectItem value="none">取り消す</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </Flex>
  );
}
