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
  removePost,
  addAccessibleUser,
  editAccessibleUser,
  removeAccessibleUser,
  cleanupPost,
} from "../../_action";

import NextLink from "next/link";
import { Container, Box, Flex, styled } from "@/lib/style/system/jsx";
import { Frame } from "@/components/frame";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronLeft,
  LockKeyhole,
  UnlockKeyhole,
  Menu,
  Share,
  Plus,
  Trash2,
  History,
} from "lucide-react";
import { Editor } from "./Editor";

type Props = {
  postId: string;
};

export function View({ postId }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [post, setPost] = useState<FullPost | null>(null);
  const [accessibleUsers, setAccessibleUsers] = useState<AccessibleUser[]>([]);
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [emailOrName, setEmailOrName] = useState("");

  const share = async (ownerId: string, targetEmailOrName: string) => {
    const { accessibleUser } = await addAccessibleUser({
      postId,
      ownerId,
      targetEmailOrName,
      level: AccessLevel.READ,
    });

    if (accessibleUser) {
      setAccessibleUsers((prev) => [...prev, accessibleUser]);
      setEmailOrName("");
    } else {
      toast({
        title: "Error",
        description: "共有できませんでした。",
      });
    }
  };

  useEffect(() => {
    (async () => {
      const result = await getPost({ id: postId });
      if (result.post) {
        setPost(result.post);
        setAccessibleUsers(result.post.accessibleUsers);
        setIsPublic(result.post.isPublic);
      }
    })();
  }, []);

  return (
    <Frame
      title={<styled.img src="/images/logo_palt.png" w="auto" h="s.200" />}
      leading={
        <NextLink href="/user">
          <ChevronLeft size={24} />
        </NextLink>
      }
      trailing={
        <Flex gap="s.200">
          <styled.button
            onClick={async () => {
              if (post) {
                setIsPublic(!isPublic);
                await editPost({
                  id: post.id,
                  isPublic: !isPublic,
                });
              }
            }}
            color={isPublic ? "warning" : "border"}
          >
            {isPublic ? <UnlockKeyhole size={20} /> : <LockKeyhole size={20} />}
          </styled.button>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Menu size={24} />
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <Dialog>
                <DialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Share size={16} />
                    共有
                  </DropdownMenuItem>
                </DialogTrigger>

                <DialogContent w="l.200" maxW="94%">
                  <DialogHeader p="s.50" overflow="hidden" textAlign="left">
                    <DialogTitle>投稿を共有</DialogTitle>

                    <Flex gap="s.100" mt="s.200">
                      <Input
                        value={emailOrName}
                        onChange={(e) => setEmailOrName(e.target.value || "")}
                        placeholder="Emailまたはユーザー名を入力"
                      />

                      {post && (
                        <Button>
                          <Plus
                            size={22}
                            onClick={() => {
                              if (emailOrName.length > 0) {
                                share(post.userId, emailOrName);
                              }
                            }}
                          />
                        </Button>
                      )}
                    </Flex>

                    <Box mt="m.50">
                      <styled.h3
                        pb="s.50"
                        borderBottom="1px solid token(colors.border)"
                      >
                        共有済み
                      </styled.h3>

                      <styled.ul display="flex" direction="column" gap="s.100">
                        {accessibleUsers?.map((au) => {
                          return (
                            <AccessibleUser
                              key={au.user.id}
                              postId={postId}
                              accessibleUser={au}
                              onRemove={(userId: string) => {
                                setAccessibleUsers((prev) =>
                                  prev.filter((au) => au.userId !== userId)
                                );
                                setEmailOrName("");
                              }}
                            />
                          );
                        })}
                      </styled.ul>
                    </Box>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              {post && (
                <DropdownMenuItem asChild>
                  <NextLink href={`/user/${post.id}/revision`}>
                    <History size={16} />
                    履歴
                  </NextLink>
                </DropdownMenuItem>
              )}

              <DropdownMenuSeparator />

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Trash2 size={16} />
                    削除
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>本当に削除しますか？</AlertDialogTitle>
                    <AlertDialogDescription>
                      削除した投稿を元に戻すことはできません。
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>キャンセル</AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <button
                        onClick={async () => {
                          removePost({ id: postId });
                          router.push("/user");
                        }}
                      >
                        削除
                      </button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </Flex>
      }
    >
      <Container position="relative" h="100%">
        {post && (
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
            onDestroy={() => cleanupPost({ postId })}
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
