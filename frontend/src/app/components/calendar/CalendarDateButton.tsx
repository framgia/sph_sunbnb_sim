import { type CalendarDateButtonProps } from "@/app/interfaces/CalendarDateButtonProps";
import { Button } from "@nextui-org/react";
import React, { useMemo } from "react";

const CalendarDateButton: React.FC<CalendarDateButtonProps> = ({
  date,
  isCurrentMonth,
  isSelectedDate,
  handleDateClick
}) => {
  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);
  const baseClasses = "text-lg font-medium w-full";
  const notCurrentMonthClasses = !isCurrentMonth
    ? "text-gray-400"
    : "text-black";
  const pastDateClasses =
    isCurrentMonth && date < today ? "disabled:bg-gray-200" : "";
  const selectedDateClasses = isSelectedDate
    ? "text-white"
    : "bg-white hover:bg-primary-50 hover:text-primary";

  return (
    <Button
      radius={date < today ? "none" : "full"}
      size="lg"
      color="primary"
      isIconOnly
      className={`${baseClasses} ${notCurrentMonthClasses} ${pastDateClasses} ${selectedDateClasses}`}
      onClick={() => {
        handleDateClick(date);
      }}
      isDisabled={date < today}
    >
      {date.getDate()}
    </Button>
  );
};

export default CalendarDateButton;
