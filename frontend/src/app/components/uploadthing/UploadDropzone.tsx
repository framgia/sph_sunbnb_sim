"use client";
import "@uploadthing/react/styles.css";
import React from "react";
import { UploadDropzone } from "@/app/utils/uploadthing/uploadthing";
import UploadIcon from "../svgs/UploadIcon";

interface UploadthingDropzoneProps {
  media: string[];
  setMedia: React.Dispatch<React.SetStateAction<string[]>>;
}

const UploadthingDropzone: React.FC<UploadthingDropzoneProps> = ({
  media,
  setMedia
}) => {
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
          if (isUploading) return "Uploading...";
          if (ready) return "Upload File";
          return "Getting ready...";
        }
      }}
      endpoint="imageUploader"
      config={{ mode: "auto" }}
      onClientUploadComplete={(res) => {
        console.log("Files: ", res);
        res.forEach((val) => {
          setMedia((prev) => [...prev, val.url]);
        });
      }}
      onUploadError={(error: Error) => {
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
};

export default UploadthingDropzone;
