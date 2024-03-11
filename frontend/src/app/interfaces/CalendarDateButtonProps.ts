export interface CalendarDateButtonProps {
  date: Date;
  isCurrentMonth: boolean;
  isSelectedDate: boolean;
  handleDateClick: (date: Date) => void;
}
