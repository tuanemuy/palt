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
      position="relative"
      css={{
        fontSize: "16px",
        "& .tiptap": {
          px: "s.50",
          py: "s.200",
          pb: "m.50",
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
