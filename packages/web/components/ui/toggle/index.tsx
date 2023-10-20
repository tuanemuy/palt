"use client";

import * as TogglePrimitive from "@radix-ui/react-toggle";
import { styled } from "@/lib/style/system/jsx";
import { toggle } from "@/lib/style/system/recipes";

export const Toggle = styled(TogglePrimitive.Root, toggle);
