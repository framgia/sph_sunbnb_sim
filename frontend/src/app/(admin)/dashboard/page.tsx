import BookingsIcon from "@/app/components/svgs/Admin/BookingsIcon";
import UsersIcon from "@/app/components/svgs/Admin/UsersIcon";
import React from "react";

const DashboardPage: React.FC = () => {
  return (
    <>
      <div>
        <span className="text-xl font-bold">Analytics</span>
      </div>
      <div className="h-96">
        <div className="my-5 flex h-1/2 w-full flex-row">
          <div className="mr-2 flex w-1/4 flex-col items-center self-center bg-primary p-4 text-white">
            <div className="m-2">
              <UsersIcon />
            </div>
            <span className="text-2xl font-bold">420</span>
            <span className="text-2xl">Users</span>
          </div>
          <div className="mx-2 flex w-1/4 flex-col text-white">
            <div className="mb-2 h-1/3 items-center justify-center bg-primary-500 p-2">
              <div className="flex h-full items-center justify-between px-10">
                <span className="mr-2 text-2xl font-bold">105</span>
                <span className="text-2xl">guests</span>
              </div>
            </div>
            <div className="mb-2 h-1/3 bg-primary-400 p-2 ">
              <div className="flex h-full items-center justify-between px-10">
                <span className="mr-2 text-2xl font-bold">273</span>
                <span className="text-2xl">hosts</span>
              </div>
            </div>
            <div className="h-1/3 bg-primary-300 p-2">
              <div className="flex h-full items-center justify-between px-10">
                <span className="mr-2 text-2xl font-bold">42</span>
                <span className="text-2xl">admins</span>
              </div>
            </div>
          </div>
          <div className="mx-2 flex w-1/4 flex-row items-center justify-center bg-primary-700 p-5 text-white">
            <div className="px-2">
              <BookingsIcon />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">203</span>
              <span className="text-2xl">Bookings</span>
            </div>
          </div>
          <div className="ml-2 w-1/4 bg-primary-800 text-white">Listings</div>
        </div>
        <div className="my-5 flex h-1/2 w-full flex-row">
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
