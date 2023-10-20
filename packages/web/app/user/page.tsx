import { authOrRedirect } from "@/lib/next-auth";
import { getUser, getTags } from "./_action";

import { View } from "./View";

export default async function Page() {
  const { id } = await authOrRedirect();

  const [{ tags }, { user }] = await Promise.all([
    getTags({ userId: id }),
    getUser({ id }),
  ]);

  if (user) {
    return <View user={user} tags={tags || []} />;
  } else {
    throw new Error("User not found");
  }
}
