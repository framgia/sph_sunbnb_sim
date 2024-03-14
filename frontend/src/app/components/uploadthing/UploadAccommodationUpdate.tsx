"use client";
import "@uploadthing/react/styles.css";
import React, { useState } from "react";
import { UploadDropzone } from "@/app/utils/uploadthing/uploadthing";
import UploadIcon from "../svgs/UploadIcon";
import type { MediaUpdate } from "@/app/interfaces/AccomodationData";

interface UploadthingDropzoneProps {
  media: MediaUpdate;
  setMedia: React.Dispatch<React.SetStateAction<MediaUpdate>>;
}

const UploadthingDropzoneUpdate: React.FC<UploadthingDropzoneProps> = ({
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
  const mediaCount = media.prev.length + media.new.length;

  return (
    <>
      <UploadDropzone
        appearance={{
          container: `bg-primary-50 ${
            mediaCount >= 5 ? "opacity-50 pointer-events-none" : ""
          }`,
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
            if (mediaCount + index < 5) {
              setMedia((prev) => ({
                ...prev,
                new: [...prev.new, val.url]
              }));
            }
          });
        }}
        onUploadError={handleUploadError}
      />
      {error !== "" && <div className="red text-xs">{error}</div>}
    </>
  );
};

export default UploadthingDropzoneUpdate;
