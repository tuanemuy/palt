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
    return {
      title: `${user.profile?.displayName || user.customId} | Palt`,
      description:
        "Paltは、書くことに集中するための、非常にシンプルなメモアプリです。",
    };
  } else {
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
