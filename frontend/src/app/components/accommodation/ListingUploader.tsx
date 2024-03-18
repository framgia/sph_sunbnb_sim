import React, { useState } from "react";
import { UploadDropzone } from "@/app/utils/uploadthing/uploadthing";
import UploadIcon from "../svgs/UploadIcon";
import type { MediaUpdate } from "@/app/interfaces/AccomodationData";
import type { ClientUploadedFileData } from "uploadthing/types";
import "@uploadthing/react/styles.css";

interface UploadthingDropzoneProps {
  media: string[] | MediaUpdate;
  setMedia:
    | React.Dispatch<React.SetStateAction<string[]>>
    | React.Dispatch<React.SetStateAction<MediaUpdate>>;
}

const ListingUploader: React.FC<UploadthingDropzoneProps> = ({
  media,
  setMedia
}) => {
  const [error, setError] = useState("");
  type SetMediaUpdateState = React.Dispatch<React.SetStateAction<MediaUpdate>>;
  type SetStringArrayState = React.Dispatch<React.SetStateAction<string[]>>;
  function handleUploadError(error: Error): void {
    setError(error.message);
    setTimeout(() => {
      setError("");
    }, 3000);
  }

  let mediaCount: number;
  if (Array.isArray(media)) {
    mediaCount = media.length;
  } else {
    mediaCount = media.prev.length + media.new.length;
  }

  function handleBeforeUploadBegin(files: File[]): File[] {
    if (files.length > 5) {
      setError("File limit exceeded.");
      setTimeout(() => {
        setError("");
      }, 3000);
      return [];
    } else return files;
  }

  function handleUploadComplete(res: Array<ClientUploadedFileData<any>>): void {
    res.forEach((val, index) => {
      if (mediaCount + index < 5) {
        if (Array.isArray(media)) {
          (setMedia as SetStringArrayState)((prev: string[]) => [
            ...prev,
            val.url
          ]);
        } else {
          (setMedia as SetMediaUpdateState)((prev: MediaUpdate) => ({
            ...prev,
            new: [...prev.new, val.url]
          }));
        }
      }
    });
  }
  return (
    <>
      <UploadDropzone
        appearance={{
          container: `bg-primary-50 ${
            mediaCount >= 5 || error !== ""
              ? "opacity-50 pointer-events-none"
              : ""
          }`,
          label: "text-black hover:text-primary-600 ",
          allowedContent: "text-sm",
          button:
            "bg-primary-600 text-white after:hidden ut-uploading:opacity-50 text-sm px-3 font-semibold cursor-pointer"
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
        onBeforeUploadBegin={handleBeforeUploadBegin}
        onClientUploadComplete={handleUploadComplete}
        onUploadError={handleUploadError}
      />
      {error !== "" && <div className="mt-2 text-xs text-red-500">{error}</div>}
    </>
  );
};

export default ListingUploader;
