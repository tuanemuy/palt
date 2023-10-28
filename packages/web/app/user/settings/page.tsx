import { authOrRedirect } from "@/lib/next-auth";
import { getUser } from "../_action";

import NextLink from "next/link";
import { Container, Box, Flex, styled } from "@/lib/style/system/jsx";
import { Separator } from "@/components/ui/separator";
import { Frame } from "@/components/frame";
import { Form } from "./_components/Form";
import { SignOut } from "./_components/SignOut";
import { ChevronLeft } from "lucide-react";

export default async function Page() {
  const { id } = await authOrRedirect();
  const { user } = await getUser({ id });

  if (!user) {
    throw new Error("User not found");
  }

  return (
    <Frame
      title={<styled.img src="/images/logo_palt.png" w="auto" h="s.200" />}
      leading={
        <NextLink href="/user">
          <ChevronLeft size={24} />
        </NextLink>
      }
    >
      <Container py="m.50">
        <Form user={user} />

        <Separator mt="m.50" />

        <Flex
          direction="column"
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
          <NextLink href="/privacy-policy" target="_blank">
            個人情報保護方針
          </NextLink>
        </Flex>

        <Separator mt="m.50" />

        <Box mt="m.50">
          <SignOut />
        </Box>
      </Container>
    </Frame>
  );
}
