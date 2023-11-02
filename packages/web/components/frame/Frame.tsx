"use client";

import { styled } from "@/lib/style/system/jsx";

import { Container, Flex } from "@/lib/style/system/jsx";

type Props = {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  absolute?: { top: string; bottom: string };
  children: React.ReactNode;
};

export function Frame({ header, footer, absolute, children }: Props) {
  return (
    <>
      {header && (
        <styled.header
          position={absolute ? "absolute" : "fixed"}
          zIndex="1"
          left="0"
          w="100vw"
          h="50px"
          bg="background"
          style={{
            top: absolute ? absolute.top : "0",
          }}
        >
          {header}
        </styled.header>
      )}

      <styled.main
        id="main"
        position="relative"
        zIndex="0"
        w="100%"
        pt={header ? "50px" : "0"}
        pb={footer ? "64px" : "0"}
      >
        {children}
      </styled.main>

      {footer && (
        <styled.footer
          position={absolute ? "absolute" : "fixed"}
          zIndex="1"
          left="0"
          h="64px"
          w="100vw"
          pb="s.100"
          bg="background"
          overflow="hidden"
          style={{
            top: absolute
              ? `calc(${absolute.bottom} - 64px)`
              : "calc(100dvh - 64px)",
          }}
        >
          <Container h="100%">
            <Flex align="center" w="100%" h="100%">
              {footer}
            </Flex>
          </Container>
        </styled.footer>
      )}
    </>
  );
}
