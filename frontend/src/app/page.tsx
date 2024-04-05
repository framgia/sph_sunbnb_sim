import React from "react";
import { checkCookies } from "./utils/helpers/userHelper";
import HostDashboard from "./components/home/host/HostDashboard";
import { redirect } from "next/navigation";
import { Spinner } from "@nextui-org/react";

const Home: React.FC = async () => {
  const user = await checkCookies();

  if (user?.role === "guest" || user === null || user === undefined) {
    redirect("/accommodations");
  } else if (user?.role === "admin") {
    redirect("/dashboard");
  }

  return (
    <>
      {user.role === "host" ? (
        <HostDashboard userName={user.first_name + " " + user.last_name} />
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Home;
