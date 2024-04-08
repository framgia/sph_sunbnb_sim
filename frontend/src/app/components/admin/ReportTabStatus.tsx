import { ReportStatus } from "@/app/utils/enums";
import React from "react";

const ReportTabStatus: React.FC = () => {
  const [selectedTab, setSelectedTab] = React.useState(ReportStatus.OPEN);

  return (
    <>
      <div className="m-8 flex w-32 flex-col">
        <div
          className={`my-1 cursor-pointer px-3 ${
            selectedTab === ReportStatus.OPEN
              ? "border-r-5 border-primary text-primary"
              : "text-gray-500"
          }`}
          onClick={() => setSelectedTab(ReportStatus.OPEN)}
        >
          Open
        </div>
        <div
          className={`my-1 cursor-pointer px-3  ${
            selectedTab === ReportStatus.CLOSED
              ? "border-r-5 border-primary text-primary"
              : "text-gray-500"
          }`}
          onClick={() => setSelectedTab(ReportStatus.CLOSED)}
        >
          Closed
        </div>
      </div>
    </>
  );
};

export default ReportTabStatus;
