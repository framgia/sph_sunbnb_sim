import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Tab, Tabs } from "@nextui-org/react";
import { formatCurrency } from "@/app/utils/currency";
import { type AvailabilitySidebarProps } from "@/app/interfaces/AvailabilitySidebarProps";
import { isSameDay } from "@/app/utils/helpers/availability/calendar";
import { updateListingAvailability } from "@/app/utils/helpers/availability/requests";
import { type CalendarDate } from "@/app/interfaces/types";

const AvailabilitySidebar: React.FC<AvailabilitySidebarProps> = ({
  selectedDates,
  blockedDates,
  selectedListing,
  onTabChange
}) => {
  const [selectedKey, setSelectedKey] = useState("open");

  useEffect(() => {
    setSelectedKey(
      selectedDates.every((date) =>
        blockedDates.some((blockedDate) => isSameDay(date, blockedDate))
      )
        ? "block"
        : "open"
    );
  }, [selectedDates, blockedDates]);

  async function handleTabChange(key: React.Key): Promise<void> {
    setSelectedKey(String(key));
    const calendarDates = selectedDates.map((date) => ({
      date: format(date, "yyyy-MM-dd"),
      available: key === "open"
    })) as CalendarDate[];
    await updateListingAvailability(selectedListing.id, calendarDates);
    onTabChange(true);
  }

  if (selectedDates.length === 0) {
    return null;
  }

  return (
    <div className="flex w-full flex-col gap-2 bg-gray-100 px-16 px-5 py-5 md:h-full md:w-1/4 md:gap-4 md:px-8 md:py-12 2xl:px-20">
      {selectedDates.length > 1 ? (
        <div className="text-lg font-medium">
          {`
            ${format(selectedDates[0], "MMM dd")} - 
            ${format(selectedDates[selectedDates.length - 1], "MMM dd")}
          `}
        </div>
      ) : (
        <div className="text-lg font-medium">
          {format(selectedDates[0], "MMM dd")}
        </div>
      )}
      <div className="flex gap-2 sm:flex-col sm:gap-4">
        <Tabs
          fullWidth
          aria-label="Availability Switch"
          radius="full"
          className="flex-1"
          variant="bordered"
          color="primary"
          onSelectionChange={handleTabChange}
          selectedKey={selectedKey}
        >
          <Tab key="open" title="Open" />
          <Tab key="block" title="Block" />
        </Tabs>
        <div className="flex w-1/2 flex-col justify-center rounded rounded-full border-2 border-black px-6 sm:w-full sm:gap-1 sm:rounded-lg sm:px-5 sm:py-3">
          <div className="text-xs font-semibold sm:text-sm">Per Night</div>
          <div className="truncate text-xs font-semibold text-gray-600 sm:text-lg">
            {formatCurrency("PHP", 2, selectedListing.price)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilitySidebar;
