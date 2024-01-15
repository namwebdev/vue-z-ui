export interface CalendarDate {
  id: string;
  date: number;
  isCurrentMonth: boolean;
  isToday?: boolean;
}
export interface DateState {
  date: number;
  month: number;
  year: number;
}
