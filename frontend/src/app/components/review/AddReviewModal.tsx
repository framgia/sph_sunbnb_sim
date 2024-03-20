import { ModalProps } from "@/app/interfaces/ModalProps";
import { Button, Modal, ModalContent, Textarea } from "@nextui-org/react";
import React from "react";
import CleanlinessSmallIcon from "../svgs/Review/CleanlinessSmallIcon";
import StarComponent from "./StarsComponent";
import ValueSmallIcon from "../svgs/Review/ValueSmallIcon";
import LocationSmallIcon from "../svgs/Review/LocationSmallIcon";
import ChevronLeftIcon from "../svgs/Calendar/ChevronLeftIcon";

const ReviewModal: React.FC<ModalProps> = ({ isOpen, onClose, size }) => {
  return (
    <div>
      <Modal
        size={size}
        isOpen={isOpen}
        onClose={onClose}
        isDismissable={false}
        closeButton={<></>}
      >
        <ModalContent>
          {(onClose) => (
            <div className="p-5">
              <div className="mb-2 flex flex-col">
                <div className="flex flex-row">
                  <div
                    className="my-1 cursor-pointer self-start"
                    onClick={onClose}
                  >
                    <ChevronLeftIcon />
                  </div>
                  <div className="flex flex-col">
                    <span className="mb-1 items-center text-2xl font-bold">
                      Rate your stay!
                    </span>
                    <span className="text-md ">
                      Please, help us improve our service!
                    </span>
                    <span className="text-md mb-1 ">
                      We&apos;ll be happy to know your opinion!
                    </span>
                  </div>
                </div>
              </div>
              <div className="mb-2 flex w-full flex-row justify-center">
                <div className="m-5 flex flex-col justify-center">
                  <div className="flex w-full justify-center">
                    <CleanlinessSmallIcon />
                  </div>
                  <span className="w-full text-center text-sm">
                    Cleanliness
                  </span>
                  <StarComponent score={0} />
                </div>
                <div className="m-5 flex flex-col justify-center">
                  <div className="flex w-full justify-center">
                    <ValueSmallIcon />
                  </div>
                  <span className="w-full text-center text-sm ">Value</span>
                  <StarComponent score={0} />
                </div>
                <div className="m-5 flex flex-col justify-center">
                  <div className="flex w-full justify-center">
                    <LocationSmallIcon />
                  </div>
                  <span className="w-full text-center text-sm ">Location</span>
                  <StarComponent score={0} />
                </div>
              </div>
              <div className="px-5">
                <Textarea
                  aria-label="Review Comment"
                  className="mt-2"
                  maxRows={10}
                  minRows={10}
                  variant="bordered"
                  placeholder="Leave a comment..."
                />
              </div>
              <div className="flex w-full justify-end px-5 py-2">
                <Button color="primary" variant="solid">
                  Submit
                </Button>
              </div>
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ReviewModal;
