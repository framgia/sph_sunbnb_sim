export function removeTime(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function isDateBlocked(date: Date, excluded: Date[]): boolean {
  return (
    excluded.find((eDate, _i) => {
      const noTimeEDate = removeTime(eDate);
      const noTimeDate = removeTime(date);
      return noTimeDate.valueOf() === noTimeEDate.valueOf();
    }) !== undefined
  );
}
