import { auth } from "@/lib/next-auth";
import { getUserByName } from "./_action";

import { View } from "./View";

type Props = {
  params: {
    userName: string;
  };
};

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
