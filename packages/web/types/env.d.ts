namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    SMTP_USER: string;
    SMTP_PASSWORD: string;
    SMTP_HOST: string;
    SMTP_PORT: number;
    EMAIL_FROM: string;
    NEXT_PUBLIC_AWS_REGION: string;
    NEXT_PUBLIC_AWS_S3_BUCKET: string;
    AWS_ACCESS_KEY: string;
    AWS_SECRET_KEY: string;
  }
}
