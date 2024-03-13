import React from "react";
import ProfileComponent from "./ProfileComponent";
import { checkCookies } from "@/app/utils/helpers/userHelper";

const ProfilePage: React.FC = async () => {
  const user = await checkCookies();

  return (
    <main>
      <ProfileComponent user={user} />
    </main>
  );
};

export default ProfilePage;
