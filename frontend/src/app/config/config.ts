import dotenv from "dotenv";

dotenv.config();

interface Config {
  backendUrl: string;
}

const config: Config = {
  backendUrl:
    process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000/api/v1"
    backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000/api/v1"
};

export default config;
