"use client";

import { useState, useEffect, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import twitter from "twitter-text";
import { createId } from "@paralleldrive/cuid2";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import TipTapImage from "@tiptap/extension-image";
import { getUrl } from "core/file";
import { useToast } from "@/components/ui/toast";
import { uploadFileOnPost } from "../../_action";

import { Flex, styled } from "@/lib/style/system/jsx";
import { article } from "@/components/article";
import { Toggle } from "@/components/ui/toggle";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Pilcrow,
  Heading,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  List,
  ListOrdered,
  Quote,
  Code2,
  Bold,
  Italic,
  LinkIcon,
  Image,
  Indent,
  Outdent,
  Redo2,
  Undo2,
} from "lucide-react";

type Props = {
  postId: string;
  initialContent: string;
  onChangeBody: (body: string) => void;
  onChangeTags: (tags: string[]) => void;
  onDestroy: () => void;
  isEditable?: boolean;
};

function extractTags(body: string): string[] {
  return twitter.extractHashtags(body);
}

export function Editor({
  postId,
  initialContent,
  onChangeBody,
  onChangeTags,
  onDestroy,
  isEditable = true,
}: Props) {
  const iconSize = 18;
  const { toast } = useToast();
  const imageRef = useRef<HTMLInputElement>(null);

  const [body, setBody] = useState(initialContent);

  const editor = useEditor({
    extensions: [StarterKit, Link, TipTapImage],
    content: initialContent,
    autofocus: true,
    editable: isEditable,
    injectCSS: false,
    onUpdate: ({ editor }) => {
      setBody(editor.getHTML());
    },
    onDestroy,
  });

  useEffect(() => {
    const id = setTimeout(() => {
      onChangeBody(body);
      onChangeTags(extractTags(body));
    }, 1000);

    return () => {
      clearTimeout(id);
    };
  }, [body]);

  useEffect(() => {
    editor?.setEditable(isEditable);
  }, [isEditable]);

  return (
    <Flex
      direction="column"
      h="100%"
      className={article}
      css={{
        "& > div:first-child": {
          flexGrow: "1",
          flexShrink: "1",
          h: "100%",
          overflow: "scroll",
        },
        "& .tiptap": {
          h: "100%",
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
      {editor && <EditorContent editor={editor} />}
      {!editor && (
        <styled.div h="100%">
          <p>Loading...</p>
        </styled.div>
      )}

      <Flex
        flexGrow="0"
        flexShrink="0"
        gap="s.100"
        py="s.100"
        overflow="scroll"
      >
        {editor?.can().chain().focus().undo().run() && (
          <StyleButton
            icon={<Undo2 size={iconSize} />}
            onClick={() => editor?.chain().focus().undo().run()}
          />
        )}

        {editor?.can().chain().focus().redo().run() && (
          <StyleButton
            icon={<Redo2 size={iconSize} />}
            onClick={() => editor?.chain().focus().redo().run()}
          />
        )}

        <StyleButton
          icon={<Pilcrow size={iconSize} />}
          onClick={() => editor?.chain().focus().setNode("paragraph").run()}
        />

        <Popover>
          <PopoverTrigger asChild>
            <Toggle
              variant="outline"
              h="auto"
              p="s.50"
              pressed={editor?.isActive("heading")}
            >
              <Heading size={iconSize} />
            </Toggle>
          </PopoverTrigger>
          <PopoverContent>
            <Flex gap="s.100">
              <StyleButton
                icon={<Heading1 size={iconSize} />}
                onClick={() =>
                  editor?.chain().focus().toggleHeading({ level: 1 }).run()
                }
              />

              <StyleButton
                icon={<Heading2 size={iconSize} />}
                onClick={() =>
                  editor?.chain().focus().toggleHeading({ level: 2 }).run()
                }
              />

              <StyleButton
                icon={<Heading3 size={iconSize} />}
                onClick={() =>
                  editor?.chain().focus().toggleHeading({ level: 3 }).run()
                }
              />

              <StyleButton
                icon={<Heading4 size={iconSize} />}
                onClick={() =>
                  editor?.chain().focus().toggleHeading({ level: 4 }).run()
                }
              />

              <StyleButton
                icon={<Heading5 size={iconSize} />}
                onClick={() =>
                  editor?.chain().focus().toggleHeading({ level: 5 }).run()
                }
              />
            </Flex>
          </PopoverContent>
        </Popover>

        <StyleButton
          icon={<List size={iconSize} />}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          isPressed={editor?.isActive("bulletList")}
        />

        <StyleButton
          icon={<ListOrdered size={iconSize} />}
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          isPressed={editor?.isActive("orderedList")}
        />

        {editor?.can().sinkListItem("listItem") && (
          <StyleButton
            icon={<Indent size={iconSize} />}
            onClick={() =>
              editor?.chain().focus().sinkListItem("listItem").run()
            }
          />
        )}

        {editor?.can().liftListItem("listItem") && (
          <StyleButton
            icon={<Outdent size={iconSize} />}
            onClick={() =>
              editor?.chain().focus().liftListItem("listItem").run()
            }
          />
        )}

        <StyleButton
          icon={<LinkIcon size={iconSize} />}
          onClick={() => {
            const url = window.prompt("URL");
            url && editor?.chain().focus().setLink({ href: url }).run();
          }}
          isPressed={editor?.isActive("link")}
        />

        <StyleButton
          icon={<Image size={iconSize} />}
          onClick={async () => {
            if (imageRef.current) {
              imageRef.current.click();
            }
          }}
          isPressed={editor?.isActive("image")}
        />

        <styled.input
          type="file"
          ref={imageRef}
          onChange={async () => {
            const file = imageRef.current?.files?.item(0);
            if (!file) {
              return;
            }

            let mimeType = file.type;
            let converted: Blob = file;
            if (
              typeof window !== "undefined" &&
              (file.type === "image/heic" || file.type === "image/heif")
            ) {
              try {
                const heic2any = require("heic2any");
                const jpeg = await heic2any({
                  blob: file,
                  toType: "image/jpeg",
                  quality: 1,
                });

                if (!Array.isArray(jpeg)) {
                  converted = jpeg;
                  mimeType = "image/jpeg";
                }
              } catch (e) {
                console.error(e);
              }
            }

            const name = createId();
            try {
              const body = new Uint8Array(await converted.arrayBuffer());
              const result = await uploadFileOnPost(
                postId,
                name,
                body,
                mimeType,
                1400
              );

              if (result.fileOnPost) {
                editor
                  ?.chain()
                  .focus()
                  .setImage({
                    src: getUrl(result.fileOnPost.file, "webp@1400"),
                    alt: result.fileOnPost.fileId,
                  })
                  .run();
              } else {
                toast({
                  title: "Error",
                  description: "画像をアップロードできませんでした。",
                });
              }

              if (imageRef.current) {
                imageRef.current.value = "";
              }
            } catch (_e) {
              toast({
                title: "Error",
                description: "画像をアップロードできませんでした。",
              });
            }
          }}
          display="none"
        />

        <StyleButton
          icon={<Bold size={iconSize} />}
          onClick={() => editor?.chain().focus().toggleBold().run()}
          isPressed={editor?.isActive("bold")}
        />

        <StyleButton
          icon={<Italic size={iconSize} />}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          isPressed={editor?.isActive("italic")}
        />

        <StyleButton
          icon={<Quote size={iconSize} />}
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          isPressed={editor?.isActive("blockquote")}
        />

        <StyleButton
          icon={<Code2 size={iconSize} />}
          onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
          isPressed={editor?.isActive("codeBlock")}
        />
      </Flex>
    </Flex>
  );
}

type StyleButtonProps = {
  icon: React.ReactNode;
  onClick?: () => void;
  isPressed?: boolean;
};

function StyleButton({ icon, onClick, isPressed }: StyleButtonProps) {
  return (
    <Toggle
      variant="outline"
      h="auto"
      p="s.50"
      onClick={onClick}
      pressed={isPressed}
    >
      {icon}
    </Toggle>
  );
}
