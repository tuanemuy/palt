import { getPost } from "../../_action";

import { View } from "./_components/View";

type Props = {
  params: {
    postId: string;
  };
};

export default async function Page({ params: { postId } }: Props) {
  const { post } = await getPost({ id: postId });

  if (post) {
    return <View post={post} />;
  } else {
    throw new Error("Post not found");
  }
}
