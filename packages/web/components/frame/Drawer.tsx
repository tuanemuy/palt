"use client";

import { Box } from "@/lib/style/system/jsx";

type Props = {
  isOpen: boolean;
  onChangeOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
};

export function Drawer({ isOpen, onChangeOpen, children }: Props) {
  return (
    <>
      <Box
        position="fixed"
        top="0"
        left="0"
        zIndex="3"
        flexShrink="0"
        h="100dvh"
        px={{
          base: "s.200",
          md: "s.300",
        }}
        py={{
          base: "s.300",
          md: "s.300",
        }}
        overflowY="scroll"
        bg="background"
        transitionDuration="0.3s"
        css={{
          boxShadow: "0px 0px 8px rgba(0, 0, 0, .05)",
          transform: isOpen ? "translateX(0)" : "translateX(-110%)",
        }}
      >
        {children}
      </Box>

      <Box
        position="fixed"
        top="0"
        left="0"
        zIndex="2"
        w="100vw"
        h="100dvh"
        css={{
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        }}
        onClick={() => {
          onChangeOpen && onChangeOpen(false);
        }}
      />
    </>
  );
}
