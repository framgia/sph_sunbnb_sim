import NextAuth from "next-auth";
import type { NextApiRequest, NextApiResponse } from "next/types";
import { nextAuthOptions } from "./nextAuthOptions";
import type { NextRequest } from "next/server";

function auth(
  req: NextRequest,
  res: NextApiResponse
): ReturnType<typeof NextAuth> {
  return NextAuth(
    req as unknown as NextApiRequest,
    res,
    nextAuthOptions(req as unknown as NextApiRequest, res)
  );
}

export { auth as GET, auth as POST };
