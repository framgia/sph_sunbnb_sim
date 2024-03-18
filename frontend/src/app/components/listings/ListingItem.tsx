import React from "react";
import { Card, CardHeader, CardBody, Image, Chip } from "@nextui-org/react";
import samplePhoto from "../../../../public/images/sample-photo.jpg";

const ListingItem: React.FC = () => {
  return (
    <Card className="px-3 py-2">
      <CardHeader className="flex-col items-start gap-1">
        <p className="text-sm font-bold uppercase">Listing 1</p>
        <Chip color="success" size="sm">
          Active
        </Chip>
      </CardHeader>
      <CardBody className="overflow-visible">
        <Image
          alt="Card background"
          className="rounded-xl object-cover"
          src={samplePhoto.src}
          width={270}
        />
      </CardBody>
    </Card>
  );
};

export default ListingItem;
