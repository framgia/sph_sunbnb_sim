import { Button } from "@nextui-org/react";
import React from "react";
import CloseIcon from "./svgs/CloseIcon";
import WatchIcon from "./svgs/WatchIcon";

const EditWarningModal: React.FC = () => {
    return (
        <section className="mx-auto my-8 flex max-w-screen-sm flex-col items-center justify-center rounded-3xl bg-white px-6 py-12 shadow-lg">
            <div className="relative -mr-1 -mt-6 ml-auto h-6 w-6 cursor-pointer">
                <CloseIcon />
            </div>
            <div className="mt-7 h-12 w-12">
                <WatchIcon />
            </div>
            <h1 className="mt-4 text-center text-xl font-bold">
                Waiting for Approval
            </h1>
            <p className="mt-8 text-center">
                Thank you for posting your listing! It is currently under review
                to ensure quality and compliance.
                <br />
                <br />
                Please check back later for updates on its status. We appreciate
                your patience!
            </p>
            <Button className="mt-10 rounded-lg bg-red-600 px-8 py-3 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-50">
                Preview
            </Button>
        </section>
    );
};

export default EditWarningModal;
