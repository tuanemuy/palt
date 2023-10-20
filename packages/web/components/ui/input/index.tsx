import { styled, type HTMLStyledProps } from "@/lib/style/system/jsx";
import { input } from "@/lib/style/system/recipes";

export const Input = styled("input", input);
export type InputProps = HTMLStyledProps<typeof Input>;
