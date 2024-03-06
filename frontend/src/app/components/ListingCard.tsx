import React from "react";
import {
    Card as NextUICard,
    CardHeader,
    CardBody,
    Image
} from "@nextui-org/react";

const ListingCard: React.FC = () => {
    return (
        <NextUICard className="py-4">
            <CardHeader className="flex-col items-start px-4 pb-0 pt-2">
                <h2 className="ml-3 mt-0 self-start text-center text-lg font-semibold leading-5 text-black">
                    Listing 4
                </h2>
                <div className="mt-0.5 justify-center rounded-2xl bg-emerald-300 px-1.5 py-1 text-xs leading-4 text-green-700">
                    Active
                </div>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <Image
                    alt="Card background"
                    className="rounded-xl object-cover"
                    src="/images/pic2.jpg"
                    width={270}
                />
            </CardBody>
        </NextUICard>
    );
};

export default ListingCard;
