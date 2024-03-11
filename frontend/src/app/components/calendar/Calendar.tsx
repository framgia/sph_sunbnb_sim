import React, { useCallback, useMemo, useState } from "react";
import { format, addMonths, subMonths } from "date-fns";
import { Button, Divider } from "@nextui-org/react";
import ChevronRightIcon from "../svgs/Calendar/ChevronRightIcon";
import ChevronLeftIcon from "../svgs/Calendar/ChevronLeftIcon";
import CalendarDateButton from "./CalendarDateButton";
import {
  getDate,
  getDateRange,
  getFirstDayOfMonth,
  isSameDay
} from "@/app/utils/helpers/calendar";
import { DAYS_IN_CALENDAR_VIEW, DAYS_OF_WEEK } from "@/app/utils/constants";
import { type CalendarProps } from "@/app/interfaces/CalendarProps";

const Calendar: React.FC<CalendarProps> = ({ selectedDates, onSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const startDate = useMemo(() => selectedDates[0], [selectedDates]);
  const firstDayOfMonth = useMemo(
    () => getFirstDayOfMonth(currentDate),
    [currentDate]
  );

  const handleNextMonth = useCallback((): void => {
    setCurrentDate(addMonths(currentDate, 1));
  }, [currentDate]);

  const handlePrevMonth = useCallback((): void => {
    setCurrentDate(subMonths(currentDate, 1));
  }, [currentDate]);

  const handleDateClick = useCallback(
    (date: Date): void => {
      if (
        (!(date.getMonth() === 11 && currentDate.getMonth() === 0) &&
          date.getMonth() > currentDate.getMonth()) ||
        date.getFullYear() > currentDate.getFullYear()
      ) {
        handleNextMonth();
      } else if (
        date.getMonth() < currentDate.getMonth() ||
        date.getFullYear() < currentDate.getFullYear()
      ) {
        handlePrevMonth();
      }
      if (
        selectedDates.length > 1 ||
        startDate === undefined ||
        date < startDate ||
        isSameDay(date, startDate)
      ) {
        onSelect([date]);
      } else {
        onSelect(getDateRange(startDate, date));
      }
    },
    [
      currentDate,
      selectedDates.length,
      startDate,
      handleNextMonth,
      handlePrevMonth,
      onSelect
    ]
  );

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <Button variant="light" isIconOnly onClick={handlePrevMonth}>
          <ChevronLeftIcon />
        </Button>
        <div className="text-xl font-semibold uppercase text-primary">
          {format(currentDate, "MMMM yyyy")}
        </div>
        <Button variant="light" isIconOnly onClick={handleNextMonth}>
          <ChevronRightIcon />
        </Button>
      </div>
      <Divider className="m-auto mb-4 w-1/2" />
      <div className="grid grid-cols-7 gap-2">
        {DAYS_OF_WEEK.map((day) => (
          <div
            key={day}
            className="mb-1 py-2 text-center text-sm font-medium uppercase"
          >
            {day}
          </div>
        ))}
        {[...Array(DAYS_IN_CALENDAR_VIEW)].map((_, index) => {
          const date = getDate(firstDayOfMonth, index);
          const isCurrentMonth = date.getMonth() === currentDate.getMonth();
          const isSelectedDate = selectedDates.some((selectedDate) =>
            isSameDay(selectedDate, date)
          );

          return (
            <CalendarDateButton
              key={index}
              date={date}
              isCurrentMonth={isCurrentMonth}
              isSelectedDate={isSelectedDate}
              handleDateClick={handleDateClick}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
