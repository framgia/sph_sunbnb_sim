"use client";
import {
  Modal,
  ModalContent,
  ModalFooter,
  Button,
  Image
} from "@nextui-org/react";
import React from "react";

const AdminCard: React.FC = () => {
  const dummydata = {
    title: "User 1",
    email: "user@email.com",
    role: "Host",
    image: "/images/ListingPic1.webp"
  };
  return (
    <>
      <Modal backdrop="transparent">
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
                    ></Image>
                  </div>
                  <div className="px-5">
                    <div className="m-0 flex flex-col text-3xl font-bold">
                      {dummydata.title}
                    </div>
                    <div>{dummydata.email}</div>
                    <div className="m-0 p-0">{dummydata.role}</div>
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
                  <Button color="primary">Ban User</Button>
                </ModalFooter>
              </div>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AdminCard;
