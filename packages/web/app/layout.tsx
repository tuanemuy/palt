import "@/lib/style/panda-css.css";
import "@/lib/style/font.css";
import type { Metadata } from "next";

import { Toaster } from "@/components/ui/toast";
import { Providers } from "./_components/Providers";

export const metadata: Metadata = {
  title: "Palt",
  description:
    "Paltは、書くことに集中するための、非常にシンプルなメモアプリです。",
  twitter: {
    title: "Palt",
    description:
      "Paltは、書くことに集中するための、非常にシンプルなメモアプリです。",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
