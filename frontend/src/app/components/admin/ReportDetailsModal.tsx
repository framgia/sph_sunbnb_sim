"use client";
import type { ModalProps } from "@/app/interfaces/ModalProps";
import {
  Avatar,
  Button,
  Checkbox,
  Chip,
  Modal,
  ModalContent,
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
          <div className="py-3  md:p-5">
            <div>
              <div className="flex items-center gap-3 px-5 ">
                <div className="text-xl font-bold md:text-3xl">{reason}</div>
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
              <div className="flex items-center md:px-5">
                <Avatar className="m-2 p-4 md:p-6" />
                <div>
                  <div className="text-sm font-bold md:text-base">
                    {`${user.first_name} ${user.last_name}`}{" "}
                    <span className="hidden font-normal md:inline-block">
                      on
                    </span>{" "}
                    <span className="hidden md:inline-block">
                      {listing.name}
                    </span>
                  </div>
                  <div className="text-xs md:text-sm">{user.email}</div>
                </div>
              </div>
              <div className="px-5 text-sm">
                <div className="block font-normal md:hidden">Report on</div>{" "}
                <div className="block truncate font-bold md:hidden">
                  {listing.name}
                </div>
              </div>
            </div>
            <div className="mx-5 flex items-center justify-end text-right md:hidden">
              <div>
                <div className="text-sm md:text-base">
                  Listing hosted by{" "}
                  <strong>{`${listing.user.first_name} ${listing.user.last_name}`}</strong>
                </div>
                <div className="text-xs md:text-sm"> {listing.user.email}</div>
              </div>
              <Avatar className="m-2 p-4 md:p-6" />
            </div>
            <Textarea
              isReadOnly
              autoFocus={false}
              value={content}
              fullWidth
              className=" px-5 md:my-5"
            />
            <div className="flex justify-between">
              <div className="mx-5 flex items-center">
                {status === ReportStatus.CLOSED && (
                  <>
                    <Avatar className="m-2 p-4 md:p-6" />
                    <div>
                      <div className="text-sm md:text-base">
                        Report closed by{" "}
                        <strong>{`${admin?.first_name} ${admin?.last_name}`}</strong>
                      </div>
                      <div className="text-xs md:text-sm"> {admin?.email} </div>
                    </div>
                  </>
                )}
              </div>
              <div className="mx-5 hidden items-center justify-end text-right md:flex">
                <div>
                  <div>
                    Listing hosted by{" "}
                    <strong>{`${listing.user.first_name} ${listing.user.last_name}`}</strong>
                  </div>
                  <div className="text-sm"> {listing.user.email}</div>
                </div>
                <Avatar className="m-2  flex justify-end px-6 py-6" />
              </div>
            </div>
          </div>
          {status === ReportStatus.OPEN && (
            <div className="mx-5 flex flex-col md:flex-row">
              <Checkbox
                defaultChecked={isCheckboxChecked}
                onChange={handleCheckboxChange}
                radius="none"
                color="default"
                size="sm"
              >
                I have resolved this report by contacting the conflicting
                parties and other appropriate actions upon receiving this issue.
              </Checkbox>
              <div className="flex justify-end">
                <Button
                  className=" bg-primary text-white"
                  isDisabled={!isCheckboxChecked || isLoading}
                  isLoading={isLoading}
                  onPress={isCheckboxChecked ? handleResolve : undefined}
                >
                  Resolve
                </Button>
              </div>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReportDetailsModal;
