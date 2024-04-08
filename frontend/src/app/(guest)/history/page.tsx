"use server";
import BookingHistoryComponent from "@/app/(guest)/history/BookingHistoryComponent";
import { checkCookies } from "@/app/utils/helpers/userHelper";
import { redirect } from "next/navigation";
import React from "react";

const HistoryPage: React.FC = async () => {
  const user = await checkCookies();
  if (user === null || user === undefined) {
    redirect("/not-found");
  }

  return (
    <div className="w-full">
      <BookingHistoryComponent
        id={user.id}
      />
    </div>
  );
};

export default HistoryPage;
