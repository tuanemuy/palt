"use client";

import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { Post, Tag } from "db";
import { SinglePost } from "../_action";

import { Flex, styled } from "@/lib/style/system/jsx";
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
  Indent,
  Outdent,
} from "lucide-react";

type Props = {
  post: SinglePost;
  onChange: (body: string, tags: Tag[]) => void;
  isEditable?: boolean;
};

function extractTag(body: string) {
  const result = body.match(/(?<=\s|^)#(\w+)/);
}

export function Editor({ post, onChange, isEditable = true }: Props) {
  const iconSize = 18;

  const [body, setBody] = useState(post.body);
  const [tags, setTags] = useState(post.postTags.map((pt) => pt.tag));

  const editor = useEditor({
    extensions: [StarterKit, Link],
    content: post.body,
    autofocus: true,
    editable: isEditable,
    injectCSS: false,
    onUpdate: ({ editor }) => {
      setBody(editor.getHTML());
    },
  });

  useEffect(() => {
    const id = setTimeout(() => {
      onChange(body, tags);
    }, 1000);

    return () => {
      clearTimeout(id);
    };
  }, [body]);

  return (
    <Flex
      direction="column"
      h="100%"
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
        "& h1, & h2, & h3, & h4, & h5, & h6": {
          mt: "2rem",
          fontWeight: "bold",
          lineHeight: "1.5",
        },
        "& ul, & ol, & table, & img, & code, & blockquote, & dl, & iframe, & pre":
          {
            mt: "2rem",
          },
        "& p": {
          mt: "1rem",
        },
        "& h1": {
          fontSize: "1.75rem",
        },
        "& h2": {
          paddingBottom: "0.25rem",
          borderBottom: "2px solid token(colors.border)",
          fontSize: "1.5rem",
        },
        "& h3": {
          fontSize: "1.5rem",
        },
        "& h4": {
          fontSize: "1.25rem",
        },
        "& h5": {
          fontSize: "1.1rem",
        },
        "& a": {
          textDecoration: "underline",
        },
        "& em": {
          fontStyle: "italic",
        },
        "& strong, & b": {
          fontWeight: "bold",
        },
        "& hr": {
          margin: "4rem 0",
        },
        "& div:has(table)": {
          overflowX: "scroll",
        },
        "& table": {
          minW: "100%",
        },
        "& th": {
          textAlign: "center",
        },
        "& td:first-child": {
          verticalAlign: "middle",
        },
        "& th, & td": {
          whiteSpace: "nowrap",
        },
        "& ul": {
          pl: "1.5rem",
          listStyle: "disc",
        },
        "& ol": {
          pl: "1.5rem",
          listStyle: "decimal",
        },
        "& td ul, & li ul, & td ol, & li ol": {
          mt: "0",
        },
        "& li": {
          padding: "0.15rem 0",
        },
        "& pre": {
          p: "s.100",
          color: "secondary.foreground",
          bg: "secondary",
          borderRadius: "md",
        },
        "& code": {
          fontFamily: "mono",
        },
        "& img": {
          maxW: "100%",
        },
        "& *:first-child": {
          mt: "0",
        },
        "& *:last-child": {
          mb: "0",
        },
      }}
    >
      {editor && post && <EditorContent editor={editor} />}
      {(!editor || !post) && (
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
