import { Image } from "@nextui-org/react";
import React from "react";
import CloseIcon from "../../../../../components/svgs/CloseIcon";
import type { MediaUpdate } from "@/app/interfaces/AccomodationData";

interface AccommodationImageProps {
  media: MediaUpdate;
  setMedia: React.Dispatch<React.SetStateAction<MediaUpdate>>;
}

const AccommodationImageUpdate: React.FC<AccommodationImageProps> = ({
  media,
  setMedia
}) => {
  function handleDeletePrev(id: number): void {
    setMedia((prevMedia) => ({
      ...prevMedia,
      prev: prevMedia.prev.filter((item) => item.id !== id),
      delete: [...prevMedia.delete, id]
    }));
  }

  function handleDeleteNew(index: number): void {
    setMedia((prevMedia) => ({
      ...prevMedia,
      new: prevMedia.new.filter((_, i) => i !== index)
    }));
  }

  return (
    <div className="grid grid-cols-3 p-5">
      {media.prev.map(({ id, url }) => (
        <div key={id} className="flex items-center justify-center">
          <div className="relative inline-block p-2">
            <span
              className="absolute right-0 top-0 z-50 scale-50 cursor-pointer rounded-full bg-white p-1"
              onClick={() => {
                handleDeletePrev(id);
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
      {media.new.map((url, index) => (
        <div key={index} className="flex items-center justify-center">
          <div className="relative inline-block p-2">
            <span
              className="absolute right-0 top-0 z-50 scale-50 cursor-pointer rounded-full bg-white p-1"
              onClick={() => {
                handleDeleteNew(index);
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

export default AccommodationImageUpdate;
