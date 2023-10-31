"use client";

import { useState, useEffect } from "react";
import { styled } from "@/lib/style/system/jsx";

import { Container, Box, Flex } from "@/lib/style/system/jsx";
import { Button } from "@/components/ui/button";
import { Drawer } from "./Drawer";
import { Menu } from "lucide-react";

type Props = {
  drawer?: React.ReactNode;
  title?: React.ReactNode;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
};

export function Frame({
  drawer,
  title,
  leading,
  trailing,
  footer,
  children,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) {
      document.documentElement.style.removeProperty("--visual-viewport-height");
      return;
    }

    const f = () =>
      document.documentElement.style.setProperty(
        "--visual-viewport-height",
        `${vv.height}px`
      );

    vv.addEventListener("resize", f);
    f();
    return () => vv.removeEventListener("resize", f);
  }, []);

  return (
    <>
      {drawer && (
        <Drawer isOpen={isOpen} onChangeOpen={setIsOpen}>
          {drawer}
        </Drawer>
      )}

      <styled.header
        position="fixed"
        zIndex="1"
        top="0"
        left="0"
        w="100vw"
        h="50px"
        bg="background"
      >
        <Container h="100%">
          <Box position="relative" w="100%" h="100%">
            <Flex
              position="absolute"
              zIndex="2"
              top="50%"
              left="0"
              gap="s.100"
              align="center"
              h="100%"
              transform="translateY(-50%)"
            >
              {drawer && (
                <Button
                  p="0"
                  h="auto"
                  variant="ghost"
                  onClick={() => setIsOpen((v) => !v)}
                >
                  <Menu size="24" />
                </Button>
              )}
              {leading && (
                <Button
                  p="0"
                  h="auto"
                  variant="ghost"
                  onClick={() => setIsOpen((v) => !v)}
                >
                  {leading}
                </Button>
              )}
            </Flex>

            <Flex justify="center" align="center" w="100%" h="100%">
              {title}
            </Flex>

            {trailing && (
              <Box
                position="absolute"
                zIndex="2"
                top="50%"
                right="0"
                transform="translateY(-50%)"
              >
                {trailing}
              </Box>
            )}
          </Box>
        </Container>
      </styled.header>

      <styled.main
        id="main"
        position="relative"
        zIndex="0"
        w="100%"
        pt="50px"
        pb={footer ? "50px" : "0"}
      >
        {children}
      </styled.main>

      {footer && (
        <styled.footer
          position="fixed"
          zIndex="1"
          bottom="calc(100dvh - var(--visual-viewport-height))"
          h="50px"
          w="100vw"
          bg="background"
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
