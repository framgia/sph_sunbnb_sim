"use client";
import type { ModalProps } from "@/app/interfaces/ModalProps";
import {
  Modal,
  ModalContent,
  ModalFooter,
  Button,
  Image,
  useDisclosure,
  Chip,
  Avatar,
  Spinner
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import BanConfirmModal from "./BanConfirmModal";
import type { UserAdminResponse } from "@/app/interfaces/types";
import { unbanUser } from "@/app/utils/helpers/admin/request";
import { getInitials } from "@/app/utils/helpers/getInitials";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface UserHostCardProps extends ModalProps {
  user?: UserAdminResponse | undefined;
  setIsActionDone: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserHostCard: React.FC<UserHostCardProps> = ({
  isOpen,
  onClose,
  size,
  user,
  setIsActionDone
}) => {
  const {
    isOpen: confirmOpen,
    onOpen: confirmonOpen,
    onClose: confirmonClose
  } = useDisclosure();

  const [data, setData] = useState<UserAdminResponse>();
  useEffect(() => {
    setData(user);
  }, [user]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  function handleClose(): void {
    const params = new URLSearchParams(searchParams);
    params.delete("userid");
    params.delete("currentuserrole");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    onClose();
  }
  const [isLoading, setIsLoading] = React.useState(false);
  async function onUnbanUser(): Promise<void> {
    try {
      setIsLoading(true);

      await unbanUser(Number(data?.id));
      setIsLoading(false);
      setIsActionDone((prev) => !prev);
      onClose();
    } catch (error) {
      setIsLoading(false);
      console.error("Error unbanning user:", error);
    }
  }
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        size={size}
        className="shadow-md"
        placement="top-center"
      >
        <ModalContent>
          {(handleClose) => (
            <>
              {user !== undefined ? (
                <div className="p-5">
                  <div className="flex w-full justify-center py-5">
                    <div className="px-5">
                      <Avatar
                        name={getInitials(
                          user.first_name + " " + user.last_name
                        )}
                        className="h-60 w-60 bg-danger text-[100px] text-white"
                      ></Avatar>
                    </div>
                    <div className="px-5">
                      <div className="flex">
                        <div>
                          <div className="m-0 mt-3 flex  text-3xl font-bold">
                            <div className="m-0 p-0">{user.first_name}</div>
                            <div className="m-0 ml-1 p-0">{user.last_name}</div>
                          </div>
                          <div className="m-0 p-0 italic">{user.email}</div>
                          <div className="m-0 p-0 capitalize">{user.role}</div>
                        </div>
                        <div>
                          {data?.status === "banned" && (
                            <>
                              <Chip className="mt-4 bg-warning-300 text-warning-600">
                                Banned
                              </Chip>
                              <div className="text-xs">
                                <div className="mt-3 px-2">
                                  Ban Reason: {data.reason[0].reason}
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="font-bold">Listings hosted</div>

                      <div className="flex w-full justify-between gap-2">
                        {Number(data?.listings?.length) > 0 ? (
                          data?.listings
                            ?.slice(0, 3)
                            .map((listing, index) => (
                              <Image
                                key={index}
                                src={listing.media[0].media.replace(
                                  /['"]/g,
                                  ""
                                )}
                                alt={`Listing ${index}`}
                                className="h-32 w-32"
                              />
                            ))
                        ) : (
                          <div className="py-5 text-foreground-500">
                            No listings hosted
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <ModalFooter>
                    {data?.status === "active" && (
                      <Button color="primary" onClick={confirmonOpen}>
                        Ban User
                      </Button>
                    )}
                    {data?.status === "banned" && (
                      <Button
                        color="primary"
                        onClick={async () => {
                          await onUnbanUser();
                        }}
                        isLoading={isLoading}
                        isDisabled={isLoading}
                      >
                        Unban User
                      </Button>
                    )}
                  </ModalFooter>
                </div>
              ) : (
                <div className="flex h-72  w-full items-center justify-center">
                  <Spinner size="lg" />
                </div>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
      {user !== undefined ? (
        <BanConfirmModal
          isOpen={confirmOpen}
          setIsActionDone={setIsActionDone}
          onClose={confirmonClose}
          size="3xl"
          user={user}
        />
      ) : (
        <> </>
      )}
    </>
  );
};

export default UserHostCard;
