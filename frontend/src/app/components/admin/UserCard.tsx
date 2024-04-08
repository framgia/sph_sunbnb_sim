"use client";
import type { ModalProps } from "@/app/interfaces/ModalProps";
import {
  Modal,
  ModalContent,
  ModalFooter,
  Button,
  Image,
  useDisclosure,
  Chip
} from "@nextui-org/react";
import React from "react";
import BanConfirmModal from "./BanConfirmModal";

const UserCard: React.FC<ModalProps> = ({ isOpen, onClose, size }) => {
  const {
    isOpen: confirmOpen,
    onOpen: confirmonOpen,
    onClose: confirmonClose
  } = useDisclosure();
  const dummydata = {
    title: "User 1",
    email: "user@email.com",
    role: "Host",
    image: "/images/ListingPic1.webp"
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={size}
        className="shadow-md"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <div className="p-5">
                <div className="flex w-full justify-center py-5">
                  <div className="px-5">
                    <Image
                      className="max-h-60 max-w-60 rounded-full p-5"
                      src={dummydata.image}
                      width={238}
                      height={238}
                      alt="user"
                    ></Image>
                  </div>
                  <div className="px-5">
                    <div className="flex">
                      <div>
                        <div className="m-0 mt-3 flex flex-col text-4xl font-bold">
                          {dummydata.title}
                        </div>
                        <div>{dummydata.email}</div>
                        <div className="m-0 p-0">{dummydata.role}</div>
                      </div>
                      <div>
                        <Chip className="mt-4 bg-warning-300 text-warning-600">
                          Banned
                        </Chip>
                        <div className="text-xs">
                          <div className="mt-3 px-2">
                            Ban Reason: Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="font-bold">Listings hosted</div>

                    <div className="flex w-full justify-between gap-2">
                      <Image
                        src={dummydata.image}
                        alt="user"
                        className="h-32 w-32"
                      />
                      <Image
                        src={dummydata.image}
                        alt="user"
                        className="h-32 w-32"
                      />
                      <Image
                        src={dummydata.image}
                        alt="user"
                        className="h-32 w-32"
                      />
                    </div>
                  </div>
                </div>
                <ModalFooter>
                  <Button color="primary" onClick={confirmonOpen}>
                    Ban User
                  </Button>
                </ModalFooter>
              </div>
            </>
          )}
        </ModalContent>
      </Modal>
      <BanConfirmModal
        isOpen={confirmOpen}
        onClose={confirmonClose}
        size="3xl"
      />
    </>
  );
};

export default UserCard;
