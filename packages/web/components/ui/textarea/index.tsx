import { styled, HTMLStyledProps } from "@/lib/style/system/jsx";
import { textarea } from "@/lib/style/system/recipes";

export const Textarea = styled("textarea", textarea);
export type TextareaProps = HTMLStyledProps<typeof Textarea>;
