"use client";

import { useRef, useState } from "react";
import { z } from "zod";
import { createId } from "@paralleldrive/cuid2";
import { SubmitHandler, useZodForm } from "util/form";
import { FullUser, OrderBy, stringToOrderBy, orderByToString } from "core/user";
import { FullFile, getUrl } from "core/file";
import { emptyAsNull } from "util/form";
import { useToast } from "@/components/ui/toast";
import { editUser, uploadPublicFile, deleteFile } from "../../_action";
import { ActionError, editUserSchema } from "../../_schema";

import NextLink from "next/link";
import { cx, css } from "@/lib/style/system/css";
import { icon } from "@/lib/style/system/recipes";
import { Box, Flex, styled } from "@/lib/style/system/jsx";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";

type Props = {
  user: FullUser;
};

export function Form({ user }: Props) {
  const { toast } = useToast();
  const thumbnailRef = useRef<HTMLInputElement>(null);
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useZodForm({
    schema: editUserSchema,
    defaultValues: {
      id: user.id,
      customId: user.customId || undefined,
      displayName: user.profile?.displayName,
      introduction: user.profile?.introduction,
      blogName: user.profile?.blogName,
      orderBy: stringToOrderBy(user.profile?.orderBy || "createdAt"),
    },
  });

  const [thumbnail, setThumbnail] = useState<FullFile | null>(
    user.profile?.thumbnail || null
  );

  const onChangeThumbnail = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.item(0);

    if (!file) {
      if (thumbnailRef.current) {
        thumbnailRef.current.value = "";
      }
      return;
    }

    if (thumbnail) {
      deleteFile(thumbnail.key).catch((_e) =>
        console.log("Failed to delete a file.")
      );
    }

    let mimeType = file.type;
    let converted: Blob = file;
    if (
      typeof window !== "undefined" &&
      (file.type === "image/heic" || file.type === "image/heif")
    ) {
      try {
        const heic2any = require("heic2any");
        const jpeg = await heic2any({
          blob: file,
          toType: "image/jpeg",
          quality: 1,
        });

        if (!Array.isArray(jpeg)) {
          converted = jpeg;
          mimeType = "image/jpeg";
        }
      } catch (_e) {
        console.error("Failed to convert an image.");
      }
    }

    const name = createId();
    let uploaded;
    try {
      const body = new Uint8Array(await converted.arrayBuffer());
      const result = await uploadPublicFile(name, body, mimeType, 640);

      if (result.file) {
        uploaded = result.file;
      } else {
        throw new Error("Failed to upload.");
      }
    } catch (_e) {
      toast({
        title: "Error",
        description: "画像をアップロードできませんでした。",
      });
      if (thumbnailRef.current) {
        thumbnailRef.current.value = "";
      }
      return;
    }

    try {
      const result = await editUser({
        id: user.id,
        thumbnailId: uploaded.id,
      });

      if (result.user) {
        setThumbnail(result.user.profile?.thumbnail || null);
      } else {
        throw new Error("Failed to edit user.");
      }

      toast({
        title: "Success",
        description: "画像を設定しました。",
      });
    } catch (_e) {
      deleteFile(uploaded.key).catch((_e) =>
        console.error("Failed to delete a file.")
      );
      toast({
        title: "Error",
        description: "画像を設定できませんでした。",
      });
    }

    if (thumbnailRef.current) {
      thumbnailRef.current.value = "";
    }
  };

  const onSubmit: SubmitHandler<z.infer<typeof editUserSchema>> = async (
    input
  ) => {
    const result = await editUser(input);

    if (result.user) {
      toast({
        title: "Success",
        description: "保存しました。",
      });
    } else if (result.error === ActionError.DuplicateNameError) {
      toast({
        title: "Error",
        description: "ユーザー名は既に使用されています。",
      });
    } else {
      toast({
        title: "Error",
        description: "申し訳ございません。<br/>もう一度お試しください。",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <Label htmlFor="thumbnail">プロフィール画像</Label>

        {thumbnail && (
          <Box
            w="m.300"
            h="m.300"
            borderRadius="token(sizes.m.150)"
            overflow="hidden"
            mt="s.100"
          >
            <styled.img
              src={getUrl(thumbnail, "webp@640")}
              alt="thumbnail"
              w="100%"
              h="100%"
              objectFit="cover"
            />
          </Box>
        )}

        <Flex gap="s.100" align="center" mt="s.100">
          <styled.input
            id="thumbnail"
            type="file"
            accept="image/*"
            ref={thumbnailRef}
            onChange={onChangeThumbnail}
            display="none"
          />
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              if (thumbnailRef.current) {
                thumbnailRef.current.click();
              }
            }}
          >
            画像をアップロード
          </Button>
        </Flex>
      </Box>

      <Box mt="s.200">
        <Label htmlFor="custom-id">ユーザーID</Label>
        <Input
          id="custom-id"
          {...register("customId", { ...emptyAsNull })}
          mt="s.100"
        />
        <styled.p mt="s.100" fontSize=".8rem" color="muted.foreground">
          30文字以内 ／ 半角英数字
        </styled.p>

        {errors.customId && (
          <Alert variant="destructive" mt="s.100">
            <AlertCircle />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>正しく入力してください</AlertDescription>
          </Alert>
        )}
      </Box>

      <Box mt="s.200">
        <Label htmlFor="display-name">表示名</Label>
        <Input id="display-name" {...register("displayName")} mt="s.100" />
        <styled.p mt="s.100" fontSize=".8rem" color="muted.foreground">
          30文字以内
        </styled.p>

        {errors.displayName && (
          <Alert variant="destructive" mt="s.100">
            <AlertCircle />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>正しく入力してください</AlertDescription>
          </Alert>
        )}
      </Box>

      <Box mt="s.200">
        <Label htmlFor="introduction">自己紹介</Label>
        <Textarea id="introduction" {...register("introduction")} mt="s.100" />
        <styled.p mt="s.100" fontSize=".8rem" color="muted.foreground">
          300文字以内
        </styled.p>

        {errors.introduction && (
          <Alert variant="destructive" mt="s.100">
            <AlertCircle />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>正しく入力してください</AlertDescription>
          </Alert>
        )}
      </Box>

      <Box mt="s.200">
        <Label htmlFor="blog-name">ブログ名</Label>
        <Input
          id="blog-name"
          {...register("blogName", { ...emptyAsNull })}
          mt="s.100"
        />
        <styled.p mt="s.100" fontSize=".8rem" color="muted.foreground">
          30文字以内
        </styled.p>

        {errors.blogName && (
          <Alert variant="destructive" mt="s.100">
            <AlertCircle />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>正しく入力してください</AlertDescription>
          </Alert>
        )}
      </Box>

      <Box mt="s.200">
        <Label htmlFor="blog-url">ブログURL</Label>
        <Box
          id="blog-url"
          mt="s.100"
          css={{
            "& a": {
              textDecoration: "underline",
            },
          }}
        >
          {user.customId && (
            <NextLink
              href={`${process.env.NEXT_PUBLIC_BASE_URL}/${user.customId}`}
              target="_blank"
            >{`${process.env.NEXT_PUBLIC_BASE_URL}/${user.customId}`}</NextLink>
          )}
          {!user.customId && (
            <p>ユーザーIDを設定すると、公開した投稿がブログになります。</p>
          )}
        </Box>
      </Box>

      <Box mt="s.200">
        <Label htmlFor="order-by">整列</Label>
        <Select
          onValueChange={(value) => setValue("orderBy", stringToOrderBy(value))}
          defaultValue={stringToOrderBy(user.profile?.orderBy || "createdAt")}
        >
          <SelectTrigger>
            <SelectValue placeholder="-" />
          </SelectTrigger>
          <SelectContent mt="s.100">
            <SelectGroup>
              <SelectItem value={OrderBy.CREATED}>
                {orderByToString(OrderBy.CREATED)}
              </SelectItem>
              <SelectItem value={OrderBy.UPDATED}>
                {orderByToString(OrderBy.UPDATED)}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {errors.orderBy && (
          <Alert variant="destructive" mt="s.100">
            <AlertCircle />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>選択してください</AlertDescription>
          </Alert>
        )}
      </Box>

      <Button type="submit" mt="m.50">
        {isSubmitting && (
          <Loader2 className={cx(icon(), css({ animation: "spin" }))} />
        )}
        保存
      </Button>
    </form>
  );
}
