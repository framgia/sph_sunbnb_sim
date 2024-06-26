import { Image } from "@nextui-org/react";
import React from "react";
import CloseIcon from "../../../../components/svgs/CloseIcon";

interface AccommodationImageProps {
  media: string[];
  setMedia: React.Dispatch<React.SetStateAction<string[]>>;
}

const AccommodationImage: React.FC<AccommodationImageProps> = ({
  media,
  setMedia
}) => {
  function handleDelete(index: number): void {
    const newMedia = [...media];
    newMedia.splice(index, 1);
    setMedia(newMedia);
  }

  return (
    <div className="grid grid-cols-2 p-5 md:grid-cols-3">
      {media.map((url, index) => (
        <div key={index} className="flex items-center justify-center">
          <div key={index} className="relative inline-block p-2">
            <span
              className="absolute right-0 top-0 z-50 scale-50 cursor-pointer rounded-full bg-white p-1"
              onClick={() => {
                handleDelete(index);
              }}
            >
              <CloseIcon />
            </span>
            <Image
              className="h-24 w-24"
              width={200}
              height={200}
              alt={url}
              src={url}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccommodationImage;
