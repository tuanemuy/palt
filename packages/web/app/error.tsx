"use client";

import NextLink from "next/link";
import { Container, styled } from "@/lib/style/system/jsx";
import { Frame } from "@/components/frame";
import { Article } from "@/components/article";
import { Button } from "@/components/ui/button";

import { Settings } from "lucide-react";

type Props = {
  reset: () => void;
};

export default function Error({ reset }: Props) {
  return (
    <Frame
      title={<styled.p fontWeight="bold">Palt</styled.p>}
      trailing={
        <NextLink href="/user/settings">
          <Settings size={24} />
        </NextLink>
      }
    >
      <Container>
        <Article>
          <h1>Error</h1>
          <p>Something went wrong.</p>
        </Article>

        <Button onClick={() => reset()} mt="m.50">
          再読み込み
        </Button>
      </Container>
    </Frame>
  );
}
