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
import { getInitials } from "@/app/utils/helpers/getInitials";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { unbanUser } from "@/app/utils/helpers/admin/request";

interface UserGuestCardProps extends ModalProps {
  user: UserAdminResponse | undefined;
  setIsActionDone: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserGuestCard: React.FC<UserGuestCardProps> = ({
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
              {data !== undefined ? (
                <div className="p-5">
                  <div className="flex w-full flex-col items-center justify-center py-5 md:flex-row">
                    <div className="px-5">
                      <Avatar
                        name={getInitials(
                          data.first_name + " " + data.last_name
                        )}
                        className="flex h-32 w-32  bg-danger text-[50px] text-white md:h-60 md:w-60 md:text-[100px]"
                      ></Avatar>
                    </div>
                    <div className="w-full px-5">
                      <div className="flex h-full flex-col justify-center text-center md:flex-row md:justify-start md:text-left">
                        <div>
                          <div className="m-0 mt-3 flex justify-center  text-3xl font-bold">
                            <div className="m-0 p-0">
                              {data.first_name} {data.last_name}
                            </div>
                          </div>
                          <div className="m-0 p-0">{data.email}</div>
                          <div className="m-0 p-0 capitalize">{data.role}</div>
                        </div>
                        <div>
                          {data.status === "banned" && (
                            <>
                              <Chip className="mx-2 bg-warning-300 text-warning-600 md:mt-4">
                                Banned
                              </Chip>
                              <div className="text-xs">
                                <div className="px-2 md:mt-3">
                                  Ban Reason: {data.reason[0].reason}
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="my-3 font-bold">Recent Bookings</div>

                      <div className="flex w-full justify-between gap-2">
                        {Number(data?.bookings?.length) > 0 ? (
                          data?.bookings
                            ?.slice(0, 3)
                            .map((booking, index) => (
                              <Image
                                key={index}
                                src={booking.listing.media[0].media.replace(
                                  /['"]/g,
                                  ""
                                )}
                                alt={`booking ${index}`}
                                className="h-20 w-20 rounded-xl object-cover md:h-32 md:w-32"
                              />
                            ))
                        ) : (
                          <div className="w-full py-5 text-center text-foreground-500 md:text-left">
                            No bookings yet
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <ModalFooter>
                    {data.status === "active" && (
                      <Button color="primary" onClick={confirmonOpen}>
                        Ban User
                      </Button>
                    )}
                    {data.status === "banned" && (
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
          onClose={confirmonClose}
          setIsActionDone={setIsActionDone}
          size="3xl"
          user={user}
        />
      ) : (
        <> </>
      )}
    </>
  );
};

export default UserGuestCard;
