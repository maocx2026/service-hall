import addMonths from 'date-fns/addMonths';

export function getYear(date: Date): string {
  return String(date.getFullYear());
}

export function getMonth(date: Date): string {
  return String(date.getMonth() + 1).padStart(2, '0');
}

export function getFilterInitStartDate(): string[] {
  const now = new Date();
  const date = addMonths(now, -1);
  return [
    getYear(date),
    getMonth(date),
  ];
}

export function getFilterInitEndDate(): string[] {
  const date = new Date();
  return [
    getYear(date),
    getMonth(date),
  ];
}
