import React from "react";
import ProfileComponent from "./ProfileComponent";
import { fetchUserData } from "@/app/utils/helpers/profileHelper";

const ProfilePage: React.FC = async () => {
    const userId = 1;

    const user = await fetchUserData(userId);

    return (
        <main>
            <ProfileComponent user={user} />
        </main>
    );
};

export default ProfilePage;
