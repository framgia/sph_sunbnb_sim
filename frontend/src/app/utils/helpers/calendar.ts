export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}

export function getDateRange(startDate: Date, endDate: Date): Date[] {
  const dateRange: Date[] = [];
  for (
    let d = new Date(startDate);
    d.getTime() <= endDate.getTime();
    d.setDate(d.getDate() + 1)
  ) {
    dateRange.push(new Date(d));
  }
  return dateRange;
}

export function getFirstDayOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function getDate(firstDayOfMonth: Date, index: number): Date {
  const firstDayOfWeek = firstDayOfMonth.getDay();
  return new Date(
    firstDayOfMonth.getTime() -
      firstDayOfWeek * 24 * 60 * 60 * 1000 +
      index * 24 * 60 * 60 * 1000
  );
}
