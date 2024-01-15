<template>
  <div
    v-for="d in dates"
    :key="d.id"
    class="cursor-pointer cell"
    :class="{
      'opacity-50': !d.isCurrentMonth,
      'text-sky-500 font-bold': d.isToday,
      'selected-date':
        selectedDate?.date &&
        d.isCurrentMonth &&
        d.date === selectedDate.date &&
        selectedDate.month === date.month &&
        selectedDate.year === date.year,
    }"
    @click="$emit('selected-date', d)"
  >
    {{ d.date }}
  </div>
</template>

<script setup lang="ts">
import { CalendarDate, DateState } from "./types";

const {
  date,
  dates = [],
  selectedDate,
} = defineProps<{
  date: Omit<DateState, "date">;
  dates: CalendarDate[];
  selectedDate: DateState | null;
}>();

const emit = defineEmits<{
  (e: "selected-date", date: CalendarDate): void;
}>();
</script>

<style scoped>
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
