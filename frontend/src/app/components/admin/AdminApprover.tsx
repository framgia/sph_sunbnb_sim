"use client";
import { ListingStatus } from "@/app/utils/enums";
import { Button, useDisclosure } from "@nextui-org/react";
import React from "react";
import ConfirmModal from "./ConfirmModal";

const AdminApprover: React.FC<{
  status: ListingStatus;
}> = ({ status }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <div className="fixed bottom-0 z-50 mx-[-1999px] flex h-28 w-[9999px] items-center justify-center self-center bg-white drop-shadow-2xl" />
      <div className="fixed bottom-0 z-50 flex w-full justify-start">
        <div className="w-90 flex items-center justify-between py-10">
          {status === ListingStatus.PENDING ? (
            <>
              <span>
                This is the
                <span className="font-bold"> preview page </span>
                of the listing when it gets
                <span className="font-bold"> published. </span>
                Approve listing?
              </span>
              <div className="ml-52 flex flex-row">
                <Button
                  variant="bordered"
                  color="primary"
                  className="mx-2 rounded-full"
                >
                  Reject
                </Button>
                <Button color="primary" className="rounded-full">
                  Approve
                </Button>
              </div>
            </>
          ) : status === ListingStatus.REFUSED ? (
            <>
              <span>
                The listing has been
                <span className="font-bold"> rejected. </span>
                You can set it to
                <span className="font-bold"> pending </span>
                for review or permenantly
                <span className="font-bold"> delete </span>
                it.
              </span>
              <div className="ml-20 flex flex-row">
                <Button
                  variant="bordered"
                  color="primary"
                  className="mx-2 rounded-full"
                  onPress={onOpen}
                >
                  Delete
                </Button>
                <Button color="primary" className="rounded-full">
                  Set to Pending
                </Button>
              </div>
            </>
          ) : status === ListingStatus.ACTIVE ? (
            <>
              <span>
                The listing is currently
                <span className="font-bold"> active. </span>
                You can set it to
                <span className="font-bold"> pending </span>
                for review.
              </span>
              <div className="ml-80 flex flex-row">
                <Button className="rounded-full" color="primary">
                  Set to Pending
                </Button>
              </div>
            </>
          ) : (
            <>
              <span>No status found</span>
            </>
          )}
        </div>
      </div>
      <ConfirmModal isOpen={isOpen} onClose={onClose} size="lg" />
    </>
  );
};

export default AdminApprover;
