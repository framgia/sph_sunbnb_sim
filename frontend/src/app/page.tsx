import React from "react";
import { checkCookies } from "./utils/helpers/userHelper";
import HostDashboard from "./components/home/host/HostDashboard";

const Home: React.FC = () => {
  const user = checkCookies();


  return (
    <>
      {user !== null && user !== undefined? <HostDashboard/>:<h1>Home Page</h1>}
    </>
  );
};

export default Home;
