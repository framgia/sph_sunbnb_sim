import type { ModalProps } from "@/app/interfaces/ModalProps";
import {
  Button,
  Modal,
  ModalContent,
  Radio,
  RadioGroup,
  Textarea
} from "@nextui-org/react";
import React, { useState } from "react";
import ChevronLeftIcon from "./svgs/Calendar/ChevronLeftIcon";
import type { ReportData } from "../interfaces/types";
import { Reason } from "../utils/enums";

const ReportModal: React.FC<ModalProps> = ({ isOpen, onClose, size }) => {
  const [data, setData] = useState<ReportData>({
    content: "",
    reason: Reason.INACCURATE
  });
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
            <div className="p-8">
              <div className="flex">
                <Button className="m-0 bg-white" isIconOnly onPress={onClose}>
                  <ChevronLeftIcon />
                </Button>
                <div className="pt-1">
                  <div className="text-2xl font-bold">
                    Why are you reporting this listing?
                  </div>
                  <div className="m-2 flex flex-col gap-3">
                    <RadioGroup
                      label="This won't be shared to the host."
                      value={data.reason}
                      onChange={(e) => {
                        setData({
                          ...data,
                          reason: e.target.value as Reason
                        });
                      }}
                    >
                      {Object.values(Reason).map((reason) => (
                        <Radio key={reason} value={reason}>
                          {reason}
                        </Radio>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <Textarea
                  aria-label="Content"
                  placeholder="Provide us with more details"
                  className="my-3"
                  maxRows={8}
                  minRows={8}
                  variant="bordered"
                  onChange={(e) => {
                    setData({ ...data, content: e.target.value });
                  }}
                />
                <div className="my-3 flex justify-end ">
                  <Button className=" bg-primary-600 text-white">Submit</Button>
                </div>
              </div>
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ReportModal;
