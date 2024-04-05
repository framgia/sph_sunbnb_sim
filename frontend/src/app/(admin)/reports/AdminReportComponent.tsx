"use client";
import { Avatar, Card, CardFooter, Chip, Input } from "@nextui-org/react";
import React from "react";

const AdminReportComponent: React.FC = () => {
  const reports = [
    {
      id: 1,
      user: "John Wick",
      listing: "Rosecan’s place 3 @ Horizon 101",
      status: "Open",
      reason: "It's offensive",
      desc: "lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsum"
    },
    {
      id: 2,
      user: "John Wick",
      listing: "Rosecan’s place 3 @ Horizon 101",
      status: "Open",
      reason: "It's inaccurate",
      desc: "lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsum"
    },
    {
      id: 1,
      user: "John Wick",
      listing: "Rosecan’s place 3 @ Horizon 101",
      status: "Open",
      reason: "It's offensive",
      desc: "lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsum"
    }
  ];

  return (
    <>
      <div className="flex w-full flex-wrap gap-4 md:flex-nowrap">
        <Input type="Search" label="Search" radius="full" />
      </div>
      <div className="mt-5 text-3xl font-bold">Reports</div>

      <div className="flex flex-col">
        {reports.map((report) => (
          <Card
            key={report.id}
            shadow="md"
            isPressable
            radius="lg"
            className="flex h-48 w-60 justify-center rounded-3xl"
          >
            <CardFooter className="mt-5 justify-center">
              <Avatar />
            </CardFooter>
            <CardFooter className="m-0 justify-center p-0 text-xl font-bold">
              <span className="m-0 p-0">{report.user}</span>
            </CardFooter>
            <CardFooter className="m-0 justify-center p-0 text-small font-light">
              <span className="m-0 p-0">{report.listing}</span>
            </CardFooter>
            <CardFooter className="m-0 justify-center p-0 font-light">
              <span className="m-0 p-0">{report.reason}</span>
            </CardFooter>
            {report.status === "Banned" && (
              <CardFooter className="m-0 justify-center p-0">
                <Chip className="bg-warning-300 text-warning-600">Banned</Chip>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>
    </>
  );
};

export default AdminReportComponent;
