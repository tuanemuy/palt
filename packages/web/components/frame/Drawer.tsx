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
        position={{ base: "absolute", md: "relative" }}
        zIndex="3"
        flexShrink="0"
        h="full"
        px={{
          base: "s.200",
          md: "s.300",
        }}
        py={{
          base: "s.300",
          md: "s.300",
        }}
        bg="background"
        transitionDuration="0.3s"
        css={{
          boxShadow: "0px 0px 8px rgba(0, 0, 0, .05)",
          transform: {
            base: isOpen ? "translateX(0)" : "translateX(-110%)",
            md: "translateX(0)",
          },
        }}
      >
        {children}
      </Box>

      <Box
        position="absolute"
        zIndex="2"
        w="full"
        h="full"
        css={{
          transform: {
            base: isOpen ? "translateX(0)" : "translateX(-100%)",
            md: "translateX(-100%)",
          },
        }}
        onClick={() => {
          onChangeOpen && onChangeOpen(false);
        }}
      />
    </>
  );
}
