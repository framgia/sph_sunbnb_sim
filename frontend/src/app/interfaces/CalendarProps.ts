export interface CalendarProps {
  selectedDates: Date[];
  onSelect: (dates: Date[]) => void;
}
