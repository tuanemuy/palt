import { prisma } from "db";
import { auth } from "@/lib/next-auth";

import NextLink from "next/link";
import { Container, styled } from "@/lib/style/system/jsx";
import { Frame } from "@/components/frame";
import { Article } from "@/components/article";
import { Button } from "@/components/ui/button";
import { LogIn, PenSquare } from "lucide-react";

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
      title={<styled.p fontWeight="bold">Palt</styled.p>}
      trailing={
        user ? (
          <NextLink href="/user">
            <PenSquare size="24" />
          </NextLink>
        ) : (
          <NextLink href="/api/auth/signin">
            <LogIn size="24" />
          </NextLink>
        )
      }
    >
      <Container py="m.50">
        <Article>
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
          <img src="/images/feature_02.svg" alt="書くだけ" width="320px" />

          <h3>仲間と共有</h3>
          <p>Sajiは、非常にシンプルなメモアプリです。</p>
          <img src="/images/feature_03.svg" alt="書くだけ" width="320px" />
        </Article>

        <NextLink href="/api/auth/signin">
          <Button w="100%" mt="m.100">
            今すぐ使ってみる
          </Button>
        </NextLink>
      </Container>
    </Frame>
  );
}
