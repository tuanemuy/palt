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
    <Flex
      position="absolute"
      top="0"
      left="0"
      w="100vw"
      h="var(--visual-viewport-height)"
    >
      {drawer && (
        <Drawer isOpen={isOpen} onChangeOpen={setIsOpen}>
          {drawer}
        </Drawer>
      )}

      <Flex direction="column" h="100%" w="100%">
        <Container>
          <styled.header position="relative" h="50px">
            <Flex
              position="absolute"
              zIndex="2"
              top="50%"
              left="0"
              gap="s.100"
              transform="translateY(-50%)"
            >
              {drawer && (
                <Button
                  display={{ base: "block", md: "none" }}
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
          </styled.header>
        </Container>

        <styled.main
          id="main"
          w="100%"
          h="100%"
          flexShrink="1"
          overflowY="scroll"
          css={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {children}
        </styled.main>

        {footer && (
          <styled.footer py="s.150" bg="background">
            <Container>{footer}</Container>
          </styled.footer>
        )}
      </Flex>
    </Flex>
  );
}
