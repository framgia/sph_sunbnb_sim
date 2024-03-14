"use client";
import "@uploadthing/react/styles.css";
import React, { useState } from "react";
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
  const [error, setError] = useState("");

  function handleUploadError(error: Error): void {
    setError(error.message);
    setTimeout(() => {
      setError("");
    }, 3000);
  }

  return (
    <>
      <UploadDropzone
        appearance={{
          container: `bg-primary-50 ${media.length >= 5 ? "opacity-50 pointer-events-none" : ""}`,
          label: "text-black hover:text-primary-600 ",
          allowedContent: "text-sm",
          button:
            "bg-primary-600 text-white after:hidden ut-uploading:opacity-50"
        }}
        content={{
          uploadIcon: <UploadIcon />,
          label: "Drag your photos here",
          allowedContent: "or",
          button({ ready, isUploading }) {
            if (isUploading) return "Uploading...";
            if (ready) return "Upload Image/s";
            return "Getting ready...";
          }
        }}
        endpoint="imageUploader"
        config={{ mode: "auto" }}
        onClientUploadComplete={(res) => {
          res.forEach((val, index) => {
            if (media.length + index < 5) {
              setMedia((prev) => [...prev, val.url]);
            }
          });
        }}
        onUploadError={handleUploadError}
      />
      {error !== "" && <div className="red text-xs">{error}</div>}
    </>
  );
};

export default UploadthingDropzone;
