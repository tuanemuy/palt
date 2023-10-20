"use client";

import { useRef, useState } from "react";
import { z } from "zod";
import mime from "mime";
import { createId } from "@paralleldrive/cuid2";
import { SubmitHandler, useZodForm } from "util/form";
import { OrderBy, stringToOrderBy, orderByToString } from "core/profile";
import { useToast } from "@/components/ui/toast";
import { UserWithProfile, editUser } from "../_action";
import { ActionError, editUserSchema } from "../_schema";

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
import { AlertCircle, Loader2, X } from "lucide-react";

type Props = {
  user: UserWithProfile;
};

export function SettingsForm({ user }: Props) {
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
      name: user.name || undefined,
      introduction: user.profile?.introduction,
      thumbnail: user.profile?.thumbnail || null,
      orderBy: stringToOrderBy(user.profile?.orderBy || "createdAt"),
    },
  });

  const [thumbnailSrc, setThumbnailSrc] = useState<string | null>(
    user.profile?.thumbnail?.url || null
  );

  const onChangeThumbnail = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.item(0);

    if (file) {
      setValue("thumbnail", {
        key: `${createId()}.${mime.getExtension(file.type)}`,
        mimeType: file.type,
      });
      setThumbnailSrc((v) => {
        v && URL.revokeObjectURL(v);
        const url = URL.createObjectURL(file);
        return url;
      });
    } else {
      setValue("thumbnail", null);
      setThumbnailSrc((v) => {
        v && URL.revokeObjectURL(v);
        return null;
      });
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
        <Flex gap="s.100" align="center">
          <Input
            id="thumbnail"
            type="file"
            ref={thumbnailRef}
            onChange={onChangeThumbnail}
            mt="s.100"
          />
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setValue("thumbnail", null);
              setThumbnailSrc((v) => {
                v && URL.revokeObjectURL(v);
                return null;
              });
            }}
          >
            <X size="24" />
          </Button>
        </Flex>

        {thumbnailSrc && (
          <styled.img
            src={thumbnailSrc}
            alt="thumbnail"
            maxW="l.100"
            h="auto"
            mt="s.100"
          />
        )}

        {errors.thumbnail && (
          <Alert variant="destructive" mt="s.100">
            <AlertCircle />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>正しく入力してください</AlertDescription>
          </Alert>
        )}
      </Box>

      <Box mt="s.200">
        <Label htmlFor="name">ユーザー名</Label>
        <Input id="name" {...register("name")} mt="s.100" />
        <styled.p mt="s.100" fontSize=".8rem" color="muted.foreground">
          30文字以内 ／ 半角英数字
        </styled.p>

        {errors.name && (
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
