import "@/lib/style/panda-css.css";
import "@/lib/style/font.css";
import type { Metadata } from "next";

import { Toaster } from "@/components/ui/toast";
import { Providers } from "./Providers";

export const metadata: Metadata = {
  title: "Palt",
  description: "Palt",
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
