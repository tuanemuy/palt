import { styled } from "@/lib/style/system/jsx";

import { Container, Box, Flex } from "@/lib/style/system/jsx";
import { Frame } from "@/components/frame";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function Home() {
  return (
    <Frame
      title="palt"
      drawer={
        <Flex direction="column" gap="s.200">
          <Flex align="center" gap="s.100">
            <Checkbox id="d" />
            <Label htmlFor="d">Daily</Label>
          </Flex>

          <Flex align="center" gap="s.100">
            <Checkbox id="a" />
            <Label htmlFor="a">旅行</Label>
          </Flex>

          <Flex align="center" gap="s.100">
            <Checkbox id="b" />
            <Label htmlFor="b">スイロ</Label>
          </Flex>
        </Flex>
      }
      footer={
        <Flex
          gap="s.100"
          wrap="nowrap"
          overflowX="scroll"
          css={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <styled.p fontSize=".8rem" whiteSpace="nowrap">
            #Daily
          </styled.p>
          <styled.p fontSize=".8rem" whiteSpace="nowrap">
            #スイロ
          </styled.p>
          <styled.p fontSize=".8rem" whiteSpace="nowrap">
            #旅行
          </styled.p>
          <styled.p fontSize=".8rem" whiteSpace="nowrap">
            #タグ
          </styled.p>
          <styled.p fontSize=".8rem" whiteSpace="nowrap">
            #タグ
          </styled.p>
          <styled.p fontSize=".8rem" whiteSpace="nowrap">
            #タグ
          </styled.p>
          <styled.p fontSize=".8rem" whiteSpace="nowrap">
            #タグ
          </styled.p>
          <styled.p fontSize=".8rem" whiteSpace="nowrap">
            #タグ
          </styled.p>
          <styled.p fontSize=".8rem" whiteSpace="nowrap">
            #タグ
          </styled.p>
          <styled.p fontSize=".8rem" whiteSpace="nowrap">
            #タグ
          </styled.p>
        </Flex>
      }
    >
      <Container>
        <Box mt="m.50">
          <styled.h1 fontSize="1.25rem" fontWeight="bold">
            タイトルです
          </styled.h1>
          <styled.p mt="s.100" fontSize=".9rem">
            文章です。文章です。文章です。文章です。文章です。文章です。文章です。文章です。文章です。文章です。
          </styled.p>
          <styled.p mt="s.100" fontSize=".9rem">
            文章です。
          </styled.p>
        </Box>

        <Box w="full" h="1px" mt="m.50" bg="border" />

        <Box mt="m.50">
          <styled.h1 fontSize="1.25rem" fontWeight="bold">
            タイトルです
          </styled.h1>
          <styled.p mt="s.100" fontSize=".9rem">
            文章です。文章です。文章です。文章です。文章です。文章です。文章です。文章です。文章です。文章です。
          </styled.p>
          <styled.p mt="s.100">文章です。</styled.p>
        </Box>

        <Box w="full" h="1px" mt="m.50" bg="border" />

        <Box mt="m.50">
          <styled.h1 fontSize="1.25rem" fontWeight="bold">
            タイトルです
          </styled.h1>
          <styled.p mt="s.100" fontSize=".9rem">
            文章です。文章です。文章です。文章です。文章です。文章です。文章です。文章です。文章です。文章です。
          </styled.p>
          <styled.p mt="s.100">文章です。</styled.p>
        </Box>

        <Box w="full" h="1px" mt="m.50" bg="border" />

        <Box mt="m.50">
          <styled.h1 fontSize="1.25rem" fontWeight="bold">
            タイトルです
          </styled.h1>
          <styled.p mt="s.100" fontSize=".9rem">
            文章です。文章です。文章です。文章です。文章です。文章です。文章です。文章です。文章です。文章です。
          </styled.p>
          <styled.p mt="s.100">文章です。</styled.p>
        </Box>

        <Box w="full" h="1px" mt="m.50" bg="border" />

        <Box mt="m.50">
          <styled.h1 fontSize="1.25rem" fontWeight="bold">
            タイトルです
          </styled.h1>
          <styled.p mt="s.100" fontSize=".9rem">
            文章です。文章です。文章です。文章です。文章です。文章です。文章です。文章です。文章です。文章です。
          </styled.p>
          <styled.p mt="s.100">文章です。</styled.p>
        </Box>
      </Container>
    </Frame>
  );
}
