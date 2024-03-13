export interface CalendarProps {
  selectedDates: Date[];
  blockedDates: Date[];
  onSelect: (dates: Date[]) => void;
}
