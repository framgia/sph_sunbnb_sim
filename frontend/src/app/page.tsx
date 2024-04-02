import React from "react";
import { checkCookies } from "./utils/helpers/userHelper";
import HostDashboard from "./components/home/host/HostDashboard";
import { redirect } from "next/navigation";

const Home: React.FC = async () => {
  const user = await checkCookies();

  if (user?.role === "guest" || user === null || user === undefined) {
    redirect("/accommodations");
  }

  return (
    <>
      {user !== null && user !== undefined ? (
        user.role === "host" ? (
          <HostDashboard userName={user.first_name + " " + user.last_name} />
        ) : (
          <h1>Home Page</h1>
        )
      ) : (
        <h1>Home Page</h1>
      )}
    </>
  );
};

export default Home;
