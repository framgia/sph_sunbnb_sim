"use client";
import type { ModalProps } from "@/app/interfaces/ModalProps";
import {
  Avatar,
  Button,
  Checkbox,
  Chip,
  Modal,
  ModalContent,
  ModalFooter,
  Textarea
} from "@nextui-org/react";
import React, { useState } from "react";
import type { Report } from "@/app/interfaces/types";
import { ReportStatus } from "@/app/utils/enums";
import { closeReport } from "@/app/utils/helpers/report/request";

interface ReportDetailsModalProps extends ModalProps {
  report: Report;
  setActionDone: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReportDetailsModal: React.FC<ReportDetailsModalProps> = ({
  isOpen,
  onClose,
  size,
  report,
  setActionDone
}) => {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { id, reason, status, content, user, listing, admin } = report;

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setIsCheckboxChecked(event.target.checked);
  };

  async function handleResolve(): Promise<void> {
    setIsLoading(true);
    const { hasError } = await closeReport(id);
    setActionDone((prev) => !prev);
    if (hasError !== true) {
      onClose();
    }
    setIsLoading(false);
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={size}
        placement="top-center"
        className="rounded-3xl p-5"
      >
        <ModalContent>
          <div className="px-5 py-5">
            <div>
              <div className="flex items-center gap-3 px-5 ">
                <div className="text-3xl font-bold">{reason}</div>
                {status === ReportStatus.OPEN ? (
                  <Chip className="bg-success-300 text-success-600" size="sm">
                    Open
                  </Chip>
                ) : (
                  <Chip className="bg-danger-300 text-danger-600" size="sm">
                    Closed
                  </Chip>
                )}
              </div>
              <div className="flex items-center px-5">
                <Avatar className="m-2 px-6 py-6" />
                <div>
                  <div className="font-bold">
                    {`${user.first_name} ${user.last_name}`}{" "}
                    <span className="font-base">on</span> {listing.name}
                  </div>
                  <div>{user.email}</div>
                </div>
              </div>
            </div>
            <Textarea
              isReadOnly
              autoFocus={false}
              value={content}
              fullWidth
              className=" my-5 px-5"
            />
            <div className="flex justify-between">
              {status === ReportStatus.CLOSED && (
                <div className="flex">
                  <Avatar />
                  <div>
                    <div>{`${admin?.first_name} ${admin?.last_name}`} </div>
                    <div> {admin?.email} </div>
                  </div>
                </div>
              )}
              <div className="mx-5 flex items-center justify-end text-right">
                <div>
                  <div className="font-bold">
                    Listing hosted by{" "}
                    {`${listing.user.first_name} ${listing.user.last_name}`}
                  </div>
                  <div className="text-sm"> {listing.user.email}</div>
                </div>
                <Avatar className="m-2  flex justify-end px-6 py-6" />
              </div>
            </div>
          </div>
          <ModalFooter className=" mx-5">
            <Checkbox
              defaultChecked={isCheckboxChecked}
              onChange={handleCheckboxChange}
              radius="none"
              color="default"
              size="sm"
            >
              I have resolved this report by contacting the conflicting parties
              and other appropriate actions upon receiving this issue.
            </Checkbox>
            <Button
              className="bg-primary text-white"
              isDisabled={!isCheckboxChecked || isLoading}
              isLoading={isLoading}
              onPress={isCheckboxChecked ? handleResolve : undefined}
            >
              Resolve
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReportDetailsModal;
