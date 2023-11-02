"use client";

import { useState } from "react";

import { Container, Box, Flex } from "@/lib/style/system/jsx";
import { Button } from "@/components/ui/button";
import { Drawer } from "./Drawer";
import { Menu } from "lucide-react";

type Props = {
  title: React.ReactNode;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  drawer?: React.ReactNode;
};

export function Header({ title, leading, trailing, drawer }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {drawer && (
        <Drawer isOpen={isOpen} onChangeOpen={setIsOpen}>
          {drawer}
        </Drawer>
      )}

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
    </>
  );
}
