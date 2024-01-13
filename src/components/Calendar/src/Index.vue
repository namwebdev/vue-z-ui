<template>
  <div v-click-outside="hide" class="min-w-[150px]">
    <div>
      <input
        ref="inputRef"
        class="input border border-light-gray py-2 px-3 h-8 w-full cursor-pointer rounded-sm shadow-sm font-thin duration-100 shadow-gray-100 hover:shadow-lg flex justify-center items-center"
        :class="{ 'border-blue-400': isShow }"
        @click="show"
        inputmode="none"
        value=""
      />
    </div>

    <transition>
      <div v-show="isShow">
        <!-- Header -->
        <div class="flex justify-around py-1 px-2">
          <div class="header-icon" @click="previousMonthHandler">
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                :d="`M15 19l-7-7 7-7`"
              ></path>
            </svg>
          </div>

          <div class="flex flex-1">
            <div class="flex-1 text-center">
              {{ listMonthName[date.month] }}
            </div>
            <div class="flex-1 text-center">{{ date.year }}</div>
          </div>

          <div class="header-icon" @click="nextMonthHandler">
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                :d="`M9 5l7 7-7 7`"
              ></path>
            </svg>
          </div>
        </div>
        <!-- Header -->
        <div class="calendar">
          <!-- Week -->
          <div v-for="w in week" :key="w" class="cell">
            {{ w }}
          </div>
          <!-- Week -->
          <!-- Calendar -->
          <div
            v-for="_date in dates"
            :key="_date.toString() + _date.isCurrentMonth + Math.random() * 10"
            class="cursor-pointer cell"
            :class="{
              'opacity-50': !_date.isCurrentMonth,
              'text-sky-500 font-bold': _date.isToday,
              'selected-date':
                selectedDate?.date &&
                _date.isCurrentMonth &&
                _date.date === selectedDate.date &&
                selectedDate.month === date.month &&
                selectedDate.year === date.year,
            }"
            @click="chooseDate(_date)"
          >
            {{ _date.date }}
          </div>
          <!-- Calendar -->
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { nextTick } from "vue";
import { onMounted } from "vue";
import { ref, computed } from "vue";

interface Dates {
  date: number;
  isCurrentMonth: boolean;
  isToday?: boolean;
}

const FIRST_MONTH_INDEX = 0;
const LAST_MONTH_INDEX = 11;

/** Ở tuần cuối cùng của tháng, ngày xa nhất của tháng sau chỉ có thể là ngày 6
 * Nếu lớn hơn 6 thì là ngày của tháng trước (vì tháng trước sẽ không hiển thị ngày nào nhỏ hơn 6 đước)
 * Ngược lại thì là tháng sau
 */
const LATEST_DAY_NEXT_MONTH = 6;

const [modelValue, modifiers] = defineModel<Date>("modelValue", {
  required: true,
  set(value) {
    if (!value) return "";
    // if (modifiers.date) {
    //   const { date, month, year } = getDateDetails(value as Date);
    //   if (modifiers["dd-mm"]) {
    //     return `${date}-${month + 1}-${year}`;
    //   }
    //   return `${date}-${listMonthName.value[month]}-${year}`;
    // }
    return value;
  },
});

const date = ref({ month: 0, year: 0 });
const dates = ref<Dates[]>([]);
const inputRef = ref<HTMLInputElement>();
const isShow = ref(false);

const week = computed(() => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
const listMonthName = computed(() =>
  Array.from({ length: 12 }, (_, monthIndex) => {
    const _date = new Date(date.value.year, monthIndex, 1);
    return _date.toLocaleString("en-US", { month: "short" });
  })
);
const selectedDate = computed(() => {
  if (!modelValue.value) return null;

  return getDateDetails(modelValue.value as Date);
});

init();
onMounted(updateInputValue);

function init() {
  date.value = getDateDetails();
  setDates();
}
function updateInputValue() {
  if (!inputRef.value || !modelValue.value) return;

  let res = "";
  try {
    const { date, month, year } = getDateDetails(modelValue.value as Date);
    res = `${date}-${listMonthName.value[month]}-${year}`;
  } catch (e) {
    console.error(e);
  }
  inputRef.value.value = res;
}
function show() {
  isShow.value = true;
}
function hide() {
  isShow.value = false;
}
function getDateDetails(_date = new Date()) {
  let date: Date;
  if (typeof _date === "string") date = new Date(_date);
  else date = _date;

  return {
    date: date.getDate() || 0,
    month: date.getMonth() || 0,
    year: date.getFullYear() || 0,
  };
}
function setDates() {
  dates.value = getCalendarDates(date.value.year, date.value.month);
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
  const calendarDates: Dates[] = [];

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
      date: new Date(date).getDate(),
      isCurrentMonth: date.getMonth() === month,
      ...(isToday && { isToday }),
    });
  }
  return calendarDates;
}
function nextMonthHandler() {
  if (date.value.month === LAST_MONTH_INDEX) {
    date.value.year++;
    date.value.month = FIRST_MONTH_INDEX;
  } else date.value.month++;
  setDates();
}
function previousMonthHandler() {
  if (date.value.month === FIRST_MONTH_INDEX) {
    date.value.year--;
    date.value.month = LAST_MONTH_INDEX;
  } else date.value.month--;
  setDates();
}
function chooseDate(selectDate: Dates) {
  const { date: _date, isCurrentMonth } = selectDate;
  const updateModel = (month: number, year: number) => {
    modelValue.value = new Date(`${month + 1}-${_date}-${year}`);
    nextTick(() => {
      updateInputValue();
    });
    hide();
  };

  if (isCurrentMonth) {
    updateModel(date.value.month, date.value.year);
    return;
  }
  let selectMonth = date.value.month;
  let selectYear = date.value.year;
  // previous month
  if (_date > LATEST_DAY_NEXT_MONTH) {
    selectMonth = date.value.month - 1;
    if (selectMonth < FIRST_MONTH_INDEX) {
      selectMonth = LAST_MONTH_INDEX;
      selectYear = date.value.year - 1;
    }
  }
  // next month
  else {
    selectMonth = date.value.month + 1;
    if (selectMonth > LAST_MONTH_INDEX) {
      selectMonth = FIRST_MONTH_INDEX;
      selectYear = date.value.year + 1;
    }
  }
  updateModel(selectMonth, selectYear);
}
</script>

<style scoped>
.calendar {
  @apply grid grid-flow-row;
  grid-template-columns: repeat(7, minmax(45px, 55px));
}
.header-icon {
  @apply flex-shrink-0 cursor-pointer p-1 hover:rounded-full hover:bg-slate-200;
}
.cell {
  @apply w-10 h-10 mx-2 my-1 text-center leading-10 rounded-md hover:bg-gray-100;
}
.selected-date {
  @apply text-black bg-blue-400 font-bold;
}
.selected-date:hover {
  background-color: inherit;
  @apply bg-blue-200;
}
</style>
