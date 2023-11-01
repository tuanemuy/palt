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
      css={{
        fontSize: "16px",
        "& .tiptap": {
          p: "s.100",
          pb: "m.100",
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
