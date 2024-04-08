import React from "react";

const DashboardPage: React.FC = () => {
  return (
    <>
      <div>
        <span className="text-xl font-bold">Analytics</span>
      </div>
      <div className="h-80">
        <div className="my-5 flex h-3/5 w-full flex-row">
          <div className="mr-2 w-1/4 bg-primary text-white">Users</div>
          <div className="mx-2 w-1/4 bg-primary-500 text-white">User types</div>
          <div className="mx-2 w-1/4 bg-primary-700 text-white">Bookings</div>
          <div className="ml-2 w-1/4 bg-primary-800 text-white">Listings</div>
        </div>
        <div className="my-5 flex h-2/5 w-full flex-row">
          <div className="mr-2 w-1/2 bg-primary text-white">
            Accumulated value
          </div>
          <div className="ml-2 w-1/2 bg-primary-800 text-white">
            Approved Listings
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
