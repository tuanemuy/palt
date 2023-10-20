import { styled, type HTMLStyledProps } from "@/lib/style/system/jsx";
import { badge } from "@/lib/style/system/recipes";

export const Badge = styled("div", badge);

export type BadgeProps = HTMLStyledProps<typeof Badge>;
