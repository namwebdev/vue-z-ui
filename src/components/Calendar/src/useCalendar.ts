import { ref } from "vue";
import { CalendarDate, DateState } from "./types";

const FIRST_MONTH_INDEX = 0;
const LAST_MONTH_INDEX = 11;

/** Ở tuần cuối cùng của tháng, ngày xa nhất của tháng sau chỉ có thể là ngày 6
 * Nếu lớn hơn 6 thì là ngày của tháng trước (vì tháng trước sẽ không hiển thị ngày nào nhỏ hơn 6 đước)
 * Ngược lại thì là tháng sau
 */
const LATEST_DAY_NEXT_MONTH = 6;

export function useCalendar() {
  const dateState = ref<Omit<DateState, "date">>({ month: 0, year: 0 });
  const dates = ref<CalendarDate[]>([]);

  function setDates() {
    dates.value = getCalendarDates(dateState.value.year, dateState.value.month);
  }
  function getCalendarDates(year: number, month: number) {
    if (month > 11) return [];

    const firstDate = new Date(year, month, 1);
    const lastDate = new Date(year, month + 1, 0);
    const paddingStart = firstDate.getDay(); // Number of days to add to beginning
    const paddingEnd = 6 - lastDate.getDay(); // Number of days to add to end
    const startDate = new Date(firstDate);
    startDate.setDate(1 - paddingStart); // Subtract padding days from start
    const endDate = new Date(lastDate);
    endDate.setDate(lastDate.getDate() + paddingEnd); // Add padding days to end
    const calendarDates: CalendarDate[] = [];

    const today = new Date();
    for (
      let date = startDate;
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      const isToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth();
      calendarDates.push({
        id: `${date.toString()}-${Math.random() * 100}`,
        date: new Date(date).getDate(),
        isCurrentMonth: date.getMonth() === month,
        ...(isToday && { isToday }),
      });
    }
    return calendarDates;
  }
  function nextMonthHandler() {
    if (dateState.value.month === LAST_MONTH_INDEX) {
      dateState.value.year++;
      dateState.value.month = FIRST_MONTH_INDEX;
    } else dateState.value.month++;
    setDates();
  }
  function previousMonthHandler() {
    if (dateState.value.month === FIRST_MONTH_INDEX) {
      dateState.value.year--;
      dateState.value.month = LAST_MONTH_INDEX;
    } else dateState.value.month--;
    setDates();
  }
  function chooseDate(
    selectDate: CalendarDate,
    callback: (month: number, year: number) => void
  ) {
    const { date: _date, isCurrentMonth } = selectDate;

    if (isCurrentMonth) {
      callback(dateState.value.month, dateState.value.year);
      return;
    }
    let selectMonth = dateState.value.month;
    let selectYear = dateState.value.year;
    // previous month
    if (_date > LATEST_DAY_NEXT_MONTH) {
      selectMonth = dateState.value.month - 1;
      if (selectMonth < FIRST_MONTH_INDEX) {
        selectMonth = LAST_MONTH_INDEX;
        selectYear = dateState.value.year - 1;
      }
    }
    // next month
    else {
      selectMonth = dateState.value.month + 1;
      if (selectMonth > LAST_MONTH_INDEX) {
        selectMonth = FIRST_MONTH_INDEX;
        selectYear = dateState.value.year + 1;
      }
    }
    callback(selectMonth, selectYear);
  }

  return {
    dateState,
    dates,
    setDates,
    nextMonthHandler,
    previousMonthHandler,
    chooseDate,
  };
}
