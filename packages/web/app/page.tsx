import { prisma } from "db";
import { auth } from "@/lib/next-auth";

import NextLink from "next/link";
import { Container, Flex, styled } from "@/lib/style/system/jsx";
import { article } from "@/components/article";
import { Frame } from "@/components/frame";
import { Button } from "@/components/ui/button";
import { LogIn, UserCircle } from "lucide-react";

export default async function Page() {
  const session = await auth();

  const user = session?.user
    ? await prisma.user.findUnique({
        where: {
          id: session.user.id,
        },
      })
    : null;

  return (
    <Frame
      title={<styled.img src="/images/logo_palt.png" w="auto" h="s.200" />}
      trailing={
        user ? (
          <NextLink href="/user">
            <UserCircle size={24} />
          </NextLink>
        ) : (
          <NextLink href="/api/auth/signin">
            <LogIn size={24} />
          </NextLink>
        )
      }
    >
      <Container py="m.50">
        <article className={article}>
          <styled.h1 fontSize="2.25rem !important">
            些細なことも、
            <br />
            すべて書き留めよう。
          </styled.h1>

          <p>
            Paltは、書くことに集中するための、非常にシンプルなメモアプリです。
          </p>

          <h2>特長</h2>

          <h3>書くだけ</h3>
          <p>
            タイトルを考える必要はありません。フォルダ分けする必要もありません。
            とにかく書き始めましょう！
          </p>
          <img src="/images/feature_01.svg" alt="書くだけ" width="320px" />

          <h3>すぐに見つかる</h3>
          <p>
            タグやキーワードで絞り込めば、それぞれの文書を開かなくても、すぐに見つかります。
          </p>
          <img
            src="/images/feature_02.svg"
            alt="すぐに見つかる"
            width="320px"
          />

          <h3>仲間と共有</h3>
          <p>
            メールアドレスやユーザー名を入力するだけで、文書をすぐに仲間と共有し、一緒に編集することができます。
          </p>
          <img src="/images/feature_03.svg" alt="仲間と共有" width="320px" />
        </article>

        <NextLink href="/user">
          <Button w="100%" mt="m.100">
            今すぐ使ってみる
          </Button>
        </NextLink>

        <Flex
          align="center"
          gap="s.200"
          mt="m.50"
          css={{
            "& a": {
              textDecoration: "underline",
            },
          }}
        >
          <NextLink href="/terms-of-use" target="_blank">
            利用規約
          </NextLink>
          <NextLink href="/privacy-policy">個人情報保護方針</NextLink>
        </Flex>
      </Container>
    </Frame>
  );
}
