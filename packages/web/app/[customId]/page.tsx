import { auth } from "@/lib/next-auth";
import { getUserByCustomId } from "./_action";

import { View } from "./_components/View";

type Props = {
  params: {
    customId: string;
  };
};

export async function generateMetadata({ params: { customId } }: Props) {
  const { user } = await getUserByCustomId({ customId });

  if (user) {
    const title = user.profile?.blogName
      ? `${user.profile.blogName} | ${
          user.profile?.displayName || user.customId
        }`
      : `${user.profile?.displayName || user.customId}のノート | Palt`;
    const description =
      user.profile?.introduction ||
      "Paltは、書くことに集中するための、非常にシンプルなメモアプリです。";

    return {
      title,
      description,
      twitter: {
        title,
        description,
        card: "summary_large_image",
      },
    };
  } else {
    return {
      title: "Palt | 些細なことも、すべて書き留めよう。",
      description:
        "Paltは、書くことに集中するための、非常にシンプルなメモアプリです。",
    };
  }
}

export default async function Page({ params: { customId } }: Props) {
  const session = await auth();
  const { user } = await getUserByCustomId({ customId });

  if (user) {
    return (
      <View user={user} isSignedIn={typeof session?.user !== "undefined"} />
    );
  } else {
    throw new Error("Page not found");
  }
}
