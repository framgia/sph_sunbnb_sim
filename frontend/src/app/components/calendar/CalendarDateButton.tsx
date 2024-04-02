import { type CalendarDateButtonProps } from "@/app/interfaces/CalendarProps";
import { Button } from "@nextui-org/react";
import React, { useMemo } from "react";

const CalendarDateButton: React.FC<CalendarDateButtonProps> = ({
  date,
  isCurrentMonth,
  isSelectedDate,
  isBlockedDate,
  onDateClick
}) => {
  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  const base = "text-lg font-medium w-full";
  const notCurrentMonth = !isCurrentMonth ? "text-gray-400" : "text-black";
  const pastDate = isCurrentMonth && date < today ? "disabled:bg-gray-200" : "";
  const selectedDate = isSelectedDate
    ? "text-white"
    : "bg-white hover:bg-primary-50 hover:text-primary";
  const blockedDate = isBlockedDate ? "line-through" : "";

  return (
    <Button
      radius={date < today ? "none" : "full"}
      size="md"
      color="primary"
      isIconOnly
      className={`${base} ${notCurrentMonth} ${pastDate} ${selectedDate} ${blockedDate}`}
      onClick={() => {
        onDateClick(date);
      }}
      isDisabled={date < today}
    >
      {date.getDate()}
    </Button>
  );
};

export default CalendarDateButton;
