export interface CalendarDateButtonProps {
  date: Date;
  isCurrentMonth: boolean;
  isSelectedDate: boolean;
  isBlockedDate: boolean;
  onDateClick: (date: Date) => void;
}
