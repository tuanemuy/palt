import { styled, type HTMLStyledProps } from "@/lib/style/system/jsx";
import { label } from "@/lib/style/system/recipes";

export const Label = styled("label", label);
export type LabelProps = HTMLStyledProps<typeof Label>;
