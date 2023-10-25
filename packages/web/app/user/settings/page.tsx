import { authOrRedirect } from "@/lib/next-auth";
import { getUser } from "../_action";

import NextLink from "next/link";
import { Container, styled } from "@/lib/style/system/jsx";
import { Frame } from "@/components/frame";
import { Form } from "./Form";
import { ChevronLeft } from "lucide-react";

export default async function Page() {
  const { id } = await authOrRedirect();
  const { user } = await getUser({ id });

  if (!user) {
    throw new Error("ユーザーが見つかりません");
  }

  return (
    <Frame
      title={<styled.p fontWeight="bold">Palt</styled.p>}
      leading={
        <NextLink href="/user">
          <ChevronLeft size={24} />
        </NextLink>
      }
    >
      <Container py="m.50">
        <Form user={user} />
      </Container>
    </Frame>
  );
}
