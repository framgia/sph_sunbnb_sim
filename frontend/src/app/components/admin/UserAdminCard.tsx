"use client";
import type { ModalProps } from "@/app/interfaces/ModalProps";
import {
  Modal,
  ModalContent,
  ModalFooter,
  Avatar,
  Spinner
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import type { UserAdminResponse } from "@/app/interfaces/types";
import { getInitials } from "@/app/utils/helpers/getInitials";
import {
  usePathname,
  useRouter,
  useSearchParams
} from "next/dist/client/components/navigation";

interface UserAdminCardProps extends ModalProps {
  user: UserAdminResponse | undefined;
}

const UserAdminCard: React.FC<UserAdminCardProps> = ({
  isOpen,
  onClose,
  size,
  user
}) => {
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
                    <div className="px-5">
                      <div className="flex h-full items-center text-center md:text-left">
                        <div>
                          <div className="m-0 mt-3 flex text-4xl font-bold">
                            <div className="m-0 p-0">{data.first_name}</div>
                            <div className="m-0 ml-1 p-0">{data.last_name}</div>
                          </div>

                          <div className="m-0 p-0 italic">{data.email}</div>
                          <div className="m-0 p-0 capitalize">Admin</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ModalFooter></ModalFooter>
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
    </>
  );
};

export default UserAdminCard;
