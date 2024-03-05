import React from "react";
import { Card as NextUICard, CardHeader, CardBody, Image } from "@nextui-org/react";

const Card: React.FC = () => {
    return (
        <NextUICard className="py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h2 className="self-start ml-3 mt-0 text-lg font-semibold leading-5 text-center text-black">
                    Listing 4
                </h2>
                <div className="justify-center px-1.5 py-1 mt-0.5 text-xs leading-4 text-green-700 bg-emerald-300 rounded-2xl">
                    Active
                </div>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src="/images/pic2.jpg"
                    width={270}
                />
            </CardBody>
        </NextUICard>
    );
};

export default Card;
