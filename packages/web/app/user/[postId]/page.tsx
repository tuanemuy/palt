import { View } from "./View";

type Props = {
  params: {
    postId: string;
  };
};

export default async function Page({ params: { postId } }: Props) {
  return <View postId={postId} />;
}
