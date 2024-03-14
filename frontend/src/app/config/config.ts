import dotenv from "dotenv";

dotenv.config();

interface Config {
  backendUrl: string;
  uploadthingSecret: string;
  uploadthingId: string;
}

const config: Config = {
  backendUrl:
    process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000/api/v1",
  uploadthingSecret: process.env.NEXT_PUBLIC_UPLOADTHING_SECRET ?? "",
  uploadthingId: process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID ?? ""
};

export default config;
