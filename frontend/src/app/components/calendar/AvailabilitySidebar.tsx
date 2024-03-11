import React from "react";
import { format } from "date-fns";
import { Tab, Tabs } from "@nextui-org/react";
import { formatCurrency } from "@/app/utils/helpers/currency";
import { type AvailabilitySidebarProps } from "@/app/interfaces/AvailabilitySidebarProps";

const AvailabilitySidebar: React.FC<AvailabilitySidebarProps> = ({
  selectedDates
}) => {
  if (selectedDates.length === 0) {
    return null;
  }

  return (
    <div className="flex w-full flex-col gap-4 bg-gray-100 px-8 py-5 sm:h-full sm:w-2/5 sm:py-12 lg:w-1/4">
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
        >
          <Tab key="open" title="Open" />
          <Tab key="block " title="Block" />
        </Tabs>
        <div className="flex flex-1 flex-col justify-center rounded rounded-full border-2 border-black px-6 sm:gap-1 sm:rounded-lg sm:px-5 sm:py-3">
          <div className="text-xs font-semibold sm:text-sm">Per Night</div>
          <div className="text-xs font-semibold text-gray-600 sm:text-lg">
            {formatCurrency("PHP", 2, 100000)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilitySidebar;
