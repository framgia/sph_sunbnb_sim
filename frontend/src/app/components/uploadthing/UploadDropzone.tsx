"use client";
import "@uploadthing/react/styles.css";
import React from "react";
import { UploadDropzone } from "@/app/utils/uploadthing/uploadthing";
import UploadIcon from "../svgs/UploadIcon";
import { Spinner } from "@nextui-org/react";

const UploadthingDropzone: React.FC = () => {
  return (
    <UploadDropzone
      appearance={{
        container: "bg-primary-50",
        label: "text-black hover:text-primary-600",
        allowedContent: "text-sm",
        button: "bg-primary-600 text-white after:hidden"
      }}
      content={{
        uploadIcon: <UploadIcon />,
        label: "Drag your photos here",
        allowedContent: "or",
        button({ ready, isUploading }) {
          if (ready) return "Upload File";
          if (isUploading) return <Spinner color="default" size="sm" />;
          return "Getting ready...";
        }
      }}
      endpoint="imageUploader"
      config={{ mode: "auto" }}
      onClientUploadComplete={(res) => {
        console.log("Files: ", res);
        alert("Upload Completed");
      }}
      onUploadError={(error: Error) => {
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
};

export default UploadthingDropzone;
