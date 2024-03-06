<<<<<<< HEAD
import React from "react";
import { Button } from "@nextui-org/react";
const ApprovalModal:React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center max-w-screen-sm px-6 py-12 mx-auto my-8 bg-white rounded-3xl shadow-lg">
    <HeaderImage
        src="/images/close.svg"
        alt="Notification Icon"
        additionalClasses="w-6 h-6 relative cursor-pointer ml-auto -mt-6 -mr-1"
    />
      <HeaderImage
        src="/images/watch.svg"
        alt="Approval Pending"
        additionalClasses="w-12 h-12 mt-7"
      />
      <h1 className="mt-4 text-xl font-bold text-center">Waiting for Approval</h1>
      <p className="mt-8 text-center">
        Thank you for posting your listing! It is currently under review to ensure quality and compliance.
        <br />
        <br />
        Please check back later for updates on its status. We appreciate your patience!
      </p>
      <Button
        className="px-8 py-3 mt-10 text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-50"
        type="button"
    >
        Preview
    </Button>
    </section>
  );
};

const HeaderImage = ({ src, alt, additionalClasses }: { src: string, alt: string, additionalClasses: string }) => (
    <img loading="lazy" src={src} alt={alt} className={`mx-auto ${additionalClasses}`} />
);

const PreviewButton = () => (
    
);

export default ApprovalModal;
=======
import { Button } from "@nextui-org/button";
import React from "react";
import WatchIcon from "./svgs/WatchIcon";

const ApprovalModal: React.FC = () => {
    return (
        <section className="mx-auto my-8 flex max-w-screen-sm flex-col items-center justify-center rounded-3xl bg-white px-6 py-12 shadow-lg">
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

export default ApprovalModal;
>>>>>>> bf00ef1656a2a736d9c3196b26e6aeed74dcb20a
