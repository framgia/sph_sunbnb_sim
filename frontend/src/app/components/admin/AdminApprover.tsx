"use client";
import { ListingStatus } from "@/app/utils/enums";
import { Button, useDisclosure } from "@nextui-org/react";
import React, { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import { reviewAction } from "@/app/utils/helpers/approval/request";
import { useRouter } from "next/navigation";

interface ReviewActionsProps {
  status: string;
  id: number;
}

const AdminApprover: React.FC<ReviewActionsProps> = ({ status, id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleApprove(): Promise<void> {
    setIsLoading(true);
    const result = await reviewAction(id, "approve");
    setIsLoading(false);
    if (result.hasError === true) {
      console.error(result.message);
    } else {
      router.refresh();
    }
  }

  async function handleReject(): Promise<void> {
    setIsLoading(true);
    const result = await reviewAction(id, "reject");
    setIsLoading(false);
    if (result.hasError === true) {
      console.error(result.message);
    } else {
      router.refresh();
    }
  }

  async function handlePending(): Promise<void> {
    setIsLoading(true);
    const result = await reviewAction(id, "update");
    setIsLoading(false);
    if (result.hasError === true) {
      console.error(result.message);
    } else {
      router.refresh();
    }
  }

  async function handleDelete(): Promise<void> {
    setIsLoading(true);
    const result = await reviewAction(id, "delete");
    setIsLoading(false);
    if (result.hasError === true) {
      console.error(result.message);
    } else {
      onClose();
      router.push("/approvals");
    }
  }

  return (
    <>
      <div className="fixed bottom-0 z-50 mx-[-1999px] flex h-28 w-[9999px] items-center justify-center self-center bg-white drop-shadow-2xl" />
      <div className="fixed bottom-0 left-0 z-50 flex w-full justify-start">
        <div className="flex w-full justify-center">
          <div className="flex  items-center justify-between p-2 px-5 text-sm md:w-1/2 md:py-10 md:text-base">
            {status === ListingStatus.PENDING ? (
              <>
                <div className="flex flex-col gap-2 md:flex-row md:items-center">
                  <span className="">
                    This is the
                    <span className="font-bold"> preview page </span>
                    of the listing when it gets
                    <span className="font-bold"> published. </span>
                    Approve listing?
                  </span>
                  <div className="flex flex-row gap-2">
                    <Button
                      variant="bordered"
                      color="primary"
                      className="rounded-full"
                      onPress={handleReject}
                      isDisabled={isLoading}
                    >
                      Reject
                    </Button>
                    <Button
                      color="primary"
                      className="rounded-full"
                      onPress={handleApprove}
                      isDisabled={isLoading}
                    >
                      Approve
                    </Button>
                  </div>
                </div>
              </>
            ) : status === ListingStatus.REFUSED ? (
              <>
                <span>
                  The listing has been
                  <span className="font-bold"> rejected. </span>
                  You can set it to
                  <span className="font-bold"> pending </span>
                  for review or permanently
                  <span className="font-bold"> delete </span>
                  it.
                </span>
                <div className=" flex flex-row">
                  <Button
                    variant="bordered"
                    color="primary"
                    className="mx-2 rounded-full"
                    onPress={onOpen}
                  >
                    Delete
                  </Button>
                  <Button
                    color="primary"
                    className="rounded-full"
                    onPress={handlePending}
                    isDisabled={isLoading}
                  >
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
                <div className=" flex flex-row">
                  <Button
                    className="rounded-full"
                    color="primary"
                    onPress={handlePending}
                  >
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
      </div>
      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        size="lg"
        handleDelete={handleDelete}
      />{" "}
    </>
  );
};

export default AdminApprover;
