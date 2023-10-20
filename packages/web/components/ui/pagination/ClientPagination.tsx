"use client";

import { Flex } from "@/lib/style/system/jsx";
import { Button } from "@/components/ui/button";

type Props = {
  count: number;
  perPage: number;
  page: number;
  onClick: (page: number) => void;
};

export function ClientPagination({ count, perPage, page, onClick }: Props) {
  return (
    <Flex gap="s.100">
      {[...Array(Math.ceil(count / perPage))].map((_, i) => {
        return (
          <Button
            key={i + 1}
            onClick={() => onClick(i + 1)}
            h="auto"
            px="s.100"
            py="s.50"
            borderRadius="sm"
            variant={page === i + 1 ? "default" : "outline"}
          >
            {i + 1}
          </Button>
        );
      })}
    </Flex>
  );
}
