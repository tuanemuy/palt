"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import twitter from "twitter-text";
import { throttle } from "lodash-es";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import TipTapImage from "@tiptap/extension-image";
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
  uploadFileOnPost,
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
import { EditorContent, EditorBar } from "@/components/post";

type Props = {
  postId: string;
};

export function View({ postId }: Props) {
  const [post, setPost] = useState<FullPost | null>(null);

  useEffect(() => {
    (async () => {
      const result = await getPost({ id: postId });
      if (result.post) {
        setPost(result.post);
      }
    })();
  }, []);

  if (post) return <InnerView post={post} />;
}

type InnerViewProps = {
  post: FullPost;
};

export function InnerView({ post }: InnerViewProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [absolute, setAbsolute] = useState<{ top: string; bottom: string }>({
    top: "0",
    bottom: "100dvh",
  });
  const [body, setBody] = useState(post.body);
  const [accessibleUsers, setAccessibleUsers] = useState<AccessibleUser[]>(
    post.accessibleUsers
  );
  const [isPublic, setIsPublic] = useState<boolean>(post.isPublic);
  const [emailOrName, setEmailOrName] = useState("");

  const editor = useEditor({
    extensions: [StarterKit, Link, TipTapImage],
    content: post.body,
    autofocus: true,
    editable: true,
    injectCSS: false,
    onUpdate: ({ editor }) => {
      setBody(editor.getHTML());
    },
    onDestroy: () => cleanupPost({ postId: post.id }),
    onFocus: () => {
      setAbsolute({
        top: `${window.scrollY}px`,
        bottom: `${window.scrollY + (window.visualViewport?.height || 0)}px`,
      });
    },
    onBlur: () => {
      setAbsolute({
        top: `${window.scrollY}px`,
        bottom: `${window.scrollY + (window.visualViewport?.height || 0)}px`,
      });
    },
  });

  const share = async (ownerId: string, targetEmailOrName: string) => {
    const { accessibleUser } = await addAccessibleUser({
      postId: post.id,
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
    const id = setTimeout(() => {
      editPost({
        id: post.id,
        body,
      });
      editPostTags({
        id: post.id,
        userId: post.userId,
        tags: twitter.extractHashtags(body),
      });
    }, 1000);

    return () => {
      clearTimeout(id);
    };
  }, [body]);

  useEffect(() => {
    const updateAbsolute = throttle(() => {
      if (editor?.isFocused) {
        setAbsolute({
          top: `${window.scrollY}px`,
          bottom: `${window.scrollY + (window.visualViewport?.height || 0)}px`,
        });
      }
    }, 1000 / 60);
    window.addEventListener("scroll", updateAbsolute, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateAbsolute);
    };
  }, [editor]);

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

                    <Box mt="s.200">
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
                              postId={post.id}
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

                    <Box mt="s.200">
                      <styled.h3
                        pb="s.50"
                        borderBottom="1px solid token(colors.border)"
                      >
                        共有リンク
                      </styled.h3>

                      <Box
                        overflowX="scroll"
                        mt="s.50"
                        py="s.100"
                        css={{
                          "& a": {
                            textDecoration: "underline",
                          },
                        }}
                      >
                        <NextLink
                          href={`/shared/${post.id}`}
                        >{`${process.env.NEXT_PUBLIC_BASE_URL}/shared/${post.id}`}</NextLink>
                      </Box>

                      <styled.p
                        mt="s.100"
                        fontSize=".8rem"
                        lineHeight="1.75"
                        color="muted.foreground"
                      >
                        共有済みのユーザーはこのリンクからアクセスできます。
                      </styled.p>
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
                          removePost({ id: post.id });
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
      footer={
        editor && (
          <EditorBar
            editor={editor}
            uploadFile={async (
              name: string,
              body: Uint8Array,
              mimeType: string,
              maxWidth: number
            ) => {
              const { fileOnPost } = await uploadFileOnPost(
                post.id,
                name,
                body,
                mimeType,
                maxWidth
              );

              if (fileOnPost) {
                return fileOnPost.file;
              } else {
                throw new Error("Failed to upload a file.");
              }
            }}
          />
        )
      }
      absolute={editor?.isFocused ? absolute : undefined}
    >
      <Container>{editor && <EditorContent editor={editor} />}</Container>
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
        {accessibleUser.user.customId || "..."}
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
