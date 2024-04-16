"use client";
import { Avatar, Button, Chip, useDisclosure } from "@nextui-org/react";
import React from "react";
import ReportDetailsModal from "./ReportDetailsModal";
import TrashIcon from "../svgs/TrashIcon";
import ActionConfirmModal from "./ActionConfirmModal";
import { ReportStatus } from "@/app/utils/enums";
import type { Report } from "@/app/interfaces/types";

interface ReportCardProps {
  report: Report;
  setActionDone: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReportCard: React.FC<ReportCardProps> = ({ report, setActionDone }) => {
  const { id, status, reason, content, user, listing } = report;
  const { onClose, isOpen, onOpen } = useDisclosure();
  const {
    onClose: onDeleteClose,
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen
  } = useDisclosure();
  return (
    <>
      <div
        className="flex cursor-pointer justify-between rounded-3xl border p-5 shadow-md"
        onClick={onOpen}
      >
        <div className="flex w-full justify-between">
          <div className="flex">
            <Avatar className="m-2 p-4 md:p-8" />
            <div className="ml-4 text-left">
              <div className="my-1  text-base font-bold md:text-xl">
                <p className="line-clamp-1">
                  {`${user.first_name} ${user.last_name}`}{" "}
                  <span className="font-normal">on</span> {listing.name}
                </p>
              </div>
              <div className="my-1 flex items-center gap-2">
                {status === ReportStatus.OPEN ? (
                  <Chip className="bg-success-300 text-success-600" size="sm">
                    Open
                  </Chip>
                ) : (
                  <Chip className="bg-danger-300 text-danger-600" size="sm">
                    Closed
                  </Chip>
                )}
                <div className="text-xs font-bold md:text-sm">{reason}</div>
              </div>

              <div className="my-1 line-clamp-2 text-xs font-light md:text-sm">
                {content}
              </div>
            </div>
          </div>
          {status === ReportStatus.OPEN ? null : (
            <Button
              className="bg-white text-danger-500"
              isIconOnly
              onClick={onDeleteOpen}
            >
              <TrashIcon />
            </Button>
          )}
        </div>
      </div>
      <ReportDetailsModal
        isOpen={isOpen}
        onClose={onClose}
        size="3xl"
        setActionDone={setActionDone}
        report={report}
      />
      <ActionConfirmModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        size="xl"
        id={id}
        setActionDone={setActionDone}
      />
    </>
  );
};

export default ReportCard;
