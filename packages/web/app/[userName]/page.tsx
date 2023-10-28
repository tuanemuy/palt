import { auth } from "@/lib/next-auth";
import { getUserByName } from "./_action";

import { View } from "./_components/View";

type Props = {
  params: {
    userName: string;
  };
};

export async function generateMetadata({ params: { userName } }: Props) {
  const { user } = await getUserByName({ name: userName });

  if (user) {
    return {
      title: `${user.profile?.displayName || user.name} | Palt`,
      description: "Paltは、書くことに集中するための、非常にシンプルなメモアプリです。",
    };
  } else {
  }
}

export default async function Page({ params: { userName } }: Props) {
  const session = await auth();
  const { user } = await getUserByName({ name: userName });

  if (user) {
    return (
      <View user={user} isSignedIn={typeof session?.user !== "undefined"} />
    );
  } else {
    throw new Error("Page not found");
  }
}
