<template>
  <div @click="nextMonthHandler">Next month</div>
  <div class="calendar">
    <div v-for="w in weak" :key="w" class="cell">
      {{ w }}
    </div>
    <div
      v-for="{ date, isCurrentMonth, isToday } in dates"
      :key="date.toString() + isCurrentMonth"
      class="cursor-pointer cell"
      :class="{ 'opacity-50': !isCurrentMonth, 'bg-sky-600': isToday }"
    >
      {{ date }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref } from "vue";

interface CustomDate {
  day: number;
  month: number;
  year: number;
}
interface Dates {
  date: number;
  isCurrentMonth: boolean;
  isToday?: boolean;
}

const date = ref<CustomDate>({ day: 0, month: 0, year: 0 });
const dates = ref<Dates[]>([]);
const weak = ref(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);

const props = defineProps({
  date: {
    type: String as PropType<string>,
    default: "button",
    validator: (prop: string) => {
      return ["button", "submit", "reset"].includes(prop);
    },
  },
});
date.value = {
  day: new Date().getDay(),
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
};
setDates();

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
  const calendarDates = [];

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
  date.value.month += 1;
  setDates();
}
</script>

<style scoped>
.calendar {
  @apply grid grid-flow-row;
  grid-template-columns: repeat(7, minmax(0, 40px));
}
.cell {
  @apply w-10 h-10 text-center leading-10 rounded-md hover:bg-cyan-100;
}
</style>
