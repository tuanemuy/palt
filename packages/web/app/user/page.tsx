import { authOrRedirect } from "@/lib/next-auth";
import { getUser } from "./_action";

import { View } from "./_components/View";

export default async function Page() {
  const { id } = await authOrRedirect();

  const { user } = await getUser({ id });

  if (user) {
    return <View user={user} />;
  } else {
    throw new Error("User not found");
  }
}
