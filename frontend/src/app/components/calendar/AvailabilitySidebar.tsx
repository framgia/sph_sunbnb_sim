import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Tab, Tabs } from "@nextui-org/react";
import { formatCurrency } from "@/app/utils/currency";
import { type AvailabilitySidebarProps } from "@/app/interfaces/CalendarProps";
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
  const [reservedBy, setReservedBy] = useState<string | null>(null);

  useEffect(() => {
    if (selectedDates.length > 0) {
      const booking = blockedDates.find((blockedDate) =>
        isSameDay(selectedDates[0], new Date(blockedDate.date))
      )?.booking;

      if (booking !== null && booking !== undefined) {
        setReservedBy(`${booking.user.first_name} ${booking.user.last_name}`);
      } else {
        setReservedBy(null);
        setSelectedKey(
          selectedDates.every((date) =>
            blockedDates.some((blockedDate) =>
              isSameDay(date, new Date(blockedDate.date))
            )
          )
            ? "block"
            : "open"
        );
      }
    }
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

  return (
    <div
      className={`
        ${selectedDates.length > 0 ? "flex" : "hidden"} 
        mx-[-24px] mt-[-20px] flex-col gap-3 justify-self-center bg-gray-100 px-8 py-8 md:h-full md:w-1/4 md:gap-4 md:px-8 md:py-12 2xl:px-20
      `}
    >
      {selectedDates.length > 0 && (
        <>
          {selectedDates.length > 1 ? (
            <div className="text-center text-lg font-medium md:text-start">
              {`
            ${format(selectedDates[0], "MMM dd")} - 
            ${format(selectedDates[selectedDates.length - 1], "MMM dd")}
          `}
            </div>
          ) : (
            <div className="text-center text-lg font-medium md:text-start">
              {format(selectedDates[0], "MMM dd")}
            </div>
          )}
          <div className="flex gap-2 md:flex-col md:gap-4">
            {reservedBy === null ? (
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
            ) : (
              <div className="flex-1 content-center rounded-full border-2 border-primary px-5 py-1 text-xs text-primary md:rounded-lg md:py-2.5 md:text-sm">
                Reserved by:
                <span className="capitalized font-bold">{` ${reservedBy}`}</span>
              </div>
            )}

            <div className="flex w-1/2 flex-col justify-center rounded-full border-2 border-black px-6 py-1 md:w-full md:gap-1 md:rounded-lg md:px-5 md:py-3">
              <div className="text-xs font-semibold md:text-sm">Per Night</div>
              <div className="truncate text-xs font-semibold text-gray-600 md:text-lg">
                {formatCurrency("PHP", 2, selectedListing.price)}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AvailabilitySidebar;
