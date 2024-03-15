import NextAuth from "next-auth";
import type { NextApiRequest, NextApiResponse } from "next/types";
import { nextAuthOptions } from "./nextAuthOptions";

function auth(
  req: NextApiRequest,
  res: NextApiResponse
): ReturnType<typeof NextAuth> {
  return NextAuth(req, res, nextAuthOptions(req, res));
}

export { auth as GET, auth as POST };
