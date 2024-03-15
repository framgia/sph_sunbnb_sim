import React from "react";
import ProfileComponent from "./ProfileComponent";
import { checkCookies, getUser } from "@/app/utils/helpers/userHelper";
import { cookies } from "next/headers";
import type { UserDetailsType } from "@/app/interfaces/types";

const ProfilePage: React.FC = async () => {
  let user: UserDetailsType | null = null;
  const userSession = await checkCookies();
  if (userSession?.id !== undefined) {
    user = await getUser(userSession.id, cookies().get("jwt")?.value ?? "");
  }

  return (
    <main>
      <ProfileComponent user={user} />
    </main>
  );
};

export default ProfilePage;
