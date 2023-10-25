import { redirect } from "next/navigation";
import { authOrRedirect } from "@/lib/next-auth";
import { getPost } from "../_action";

import { View } from "./_components/View";

type Props = {
  params: {
    postId: string;
  };
};

export default async function Page({ params: { postId } }: Props) {
  const user = await authOrRedirect();
  const { post } = await getPost({ id: postId });

  if (!post) {
    throw new Error("Not found");
  }

  if (post.userId === user.id) {
    redirect(`/user/${postId}`);
  }

  const isAccessible =
    post.accessibleUsers.filter((au) => au.userId === user.id).length > 0;

  if (isAccessible) {
    return <View userId={user.id} postId={postId} />;
  } else {
    throw new Error("Access denied");
  }
}
