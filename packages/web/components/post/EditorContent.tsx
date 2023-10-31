"use client";

import { Editor, EditorContent as EC } from "@tiptap/react";
import { Box } from "@/lib/style/system/jsx";
import { article } from "@/components/article";

type Props = {
  editor: Editor;
};

export function EditorContent({ editor }: Props) {
  return (
    <Box
      className={article}
      p="s.50"
      css={{
        fontSize: "16px",
        "& > div:first-child": {
          flexGrow: "1",
          flexShrink: "1",
          h: "100%",
          overflow: "scroll",
        },
        "& *:focus-visible": {
          outline: "none",
        },
        "& p.is-editor-empty:first-child::before": {
          content: "attr(data-placeholder)",
          color: "muted.foreground",
        },
      }}
    >
      <EC editor={editor} />
    </Box>
  );
}
