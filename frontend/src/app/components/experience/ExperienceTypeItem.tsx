"use client";
import { Button } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";

interface ExperienceTypeItemProp {
  type: string;
}

const ExperienceTypeItem: React.FC<ExperienceTypeItemProp> = ({ type }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSelectType = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    if (type === "All") params.delete("type");
    else params.set("type", type);
    router.replace(`${pathname}?${params.toString()}`);
  }, [type, pathname, router, searchParams]);

  return (
    <Button
      radius="full"
      size="sm"
      variant="bordered"
      onClick={handleSelectType}
      className={
        searchParams.get("type") === type ||
        (searchParams.get("type") === null && type === "All")
          ? "border-foreground-500"
          : ""
      }
    >
      {type}
    </Button>
  );
};

export default ExperienceTypeItem;
