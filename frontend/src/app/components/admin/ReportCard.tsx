"use client";
import { Avatar, Button, Chip, useDisclosure } from "@nextui-org/react";
import React from "react";

import ReportModal from "./ReportModal";
import TrashIcon from "../svgs/TrashIcon";
import ActionConfirmModal from "./ActionConfirmModal";

const ReportCard: React.FC = () => {
  const { onClose, isOpen, onOpen } = useDisclosure();
  const {
    onClose: onDeleteClose,
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen
  } = useDisclosure();
  return (
    <>
      <div
        className="flex justify-between rounded-3xl border p-5 shadow-md"
        onClick={onOpen}
      >
        <div className="flex ">
          <Avatar className="m-2 px-8 py-8" />
          <div className="ml-4 text-left">
            <div className="my-1  text-xl font-bold">
              <p className="line-clamp-1">
                John Wick on Horizon 101 @ location
              </p>
            </div>
            <div className="my-1 flex items-center gap-2">
              <Chip className="bg-success-300 text-success-600" size="sm">
                Open
              </Chip>
              <div className="text-sm font-bold">It's offensive</div>
            </div>

            <div className="my-1 line-clamp-2 text-sm  font-light">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit eaque, ratione omnis quis cumque provident dolorum,
              autem, sapiente sint velit blanditiis voluptates dolor incidunt
              sunt hic esse officia odio tenetur alias voluptatum nobis ducimus.
              Architecto perspiciatis quam possimus maiores? Natus dolores esse
              laudantium facilis consequuntur quas quos voluptatibus, distinctio
              harum recusandae, accusamus laboriosam provident nostrum quo vero
              totam soluta quod saepe enim nam animi illo modi odio quis!
              Reprehenderit, quae!
            </div>
          </div>
          <Button
            className="bg-white text-danger-500"
            isIconOnly
            onClick={onDeleteOpen}
          >
            <TrashIcon />
          </Button>
        </div>
      </div>
      <ReportModal isOpen={isOpen} onClose={onClose} size="3xl" />
      <ActionConfirmModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        size="xl"
      />
    </>
  );
};

export default ReportCard;
