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
import {
  Admin,
  Booking,
  Listing,
  UserAdminResponse,
  UserDetailsType
} from "@/app/interfaces/types";
import { getAdminById } from "@/app/utils/helpers/admin/request";
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
    params.delete("role");
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
      >
        <ModalContent>
          {(handleClose) => (
            <>
              {data !== undefined ? (
                <div className="p-5">
                  <div className="flex w-full justify-center py-5">
                    <div className="px-5">
                      <Avatar
                        name={getInitials(
                          data.first_name + " " + data.last_name
                        )}
                        className="h-60 w-60 bg-danger text-[100px] text-white"
                      ></Avatar>
                    </div>
                    <div className="px-5">
                      <div className="flex h-full items-center">
                        <div>
                          <div className="m-0 mt-3 flex text-4xl font-bold">
                            <div className="m-0 p-0">{data.first_name}</div>
                            <div className="m-0 ml-1 p-0">{data.last_name}</div>
                          </div>

                          <div className="m-0 p-0 italic">{data.email}</div>
                          <div className="m-0 p-0 capitalize">{data.role}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ModalFooter></ModalFooter>
                </div>
              ) : (
                <Spinner />
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserAdminCard;
