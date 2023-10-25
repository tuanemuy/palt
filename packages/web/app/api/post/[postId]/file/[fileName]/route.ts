import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { prisma } from "db";
import { auth } from "@/lib/next-auth";

const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

type Props = {
  params: {
    postId: string;
    fileName: string;
  };
};

export async function GET(
  _request: Request,
  { params: { postId, fileName } }: Props
) {
  const session = await auth();

  const post = await prisma.post.findFirst({
    where: {
      AND: [
        { id: postId },
        {
          OR: [
            { userId: session?.user.id },
            {
              accessibleUsers: {
                some: {
                  userId: session?.user.id,
                },
              },
            },
            { isPublic: true },
          ],
        },
      ],
    },
  });

  if (!post) {
    return new Response(null, { status: 503 });
  }

  const command = new GetObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET,
    Key: `${postId}/${fileName}`,
  });

  try {
    const response = await s3.send(command);
    return new Response(response.Body?.transformToWebStream(), {
      headers:
        response.ContentType && response.ContentLength
          ? {
              "content-type": response.ContentType,
              "content-length": response.ContentLength.toString(),
            }
          : undefined,
    });
  } catch (err) {
    console.error(err);
    return new Response(null, { status: 404 });
  }
}
