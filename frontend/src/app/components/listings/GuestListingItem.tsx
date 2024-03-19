import React from "react";
import samplePhoto from "../../../../public/images/sample-photo.jpg";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { formatCurrency } from "@/app/utils/currency";

const GuestListingItem: React.FC = () => {
  return (
    <Card shadow="none" className="w-full" isPressable>
      <CardBody className="flex items-center justify-center rounded-xl bg-zinc-50 p-0">
        <Image
          alt="Sample Photo"
          className="h-56 overflow-hidden rounded-xl"
          src={samplePhoto.src}
        />
      </CardBody>
      <CardFooter className="flex flex-col items-start">
        <p className="truncate text-sm font-bold capitalize">
          Hut in Balian Beach, Indonesia
        </p>
        <p className="text-sm">
          <span className="font-bold">{formatCurrency("PHP", 2, 6574)}</span>
          {" per night"}
        </p>
      </CardFooter>
    </Card>
  );
};

export default GuestListingItem;
