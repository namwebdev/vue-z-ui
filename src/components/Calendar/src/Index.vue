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
              {{ listMonthName[dateState.month] }}
            </div>
            <div class="flex-1 text-center">{{ dateState.year }}</div>
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
          <Calendar
            :dates="dates"
            :date="dateState"
            :selected-date="selectedDate"
            @selected-date="selectDate"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { nextTick } from "vue";
import { onMounted } from "vue";
import { ref, computed } from "vue";
import { CalendarDate } from "./types";
import Calendar from "./Calendar.vue";
import { useCalendar } from "./useCalendar";
import { getDateDetails } from "./utils";

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

const {
  dateState,
  dates,
  setDates,
  nextMonthHandler,
  previousMonthHandler,
  chooseDate,
} = useCalendar();
const inputRef = ref<HTMLInputElement>();
const isShow = ref(false);

const week = computed(() => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
const listMonthName = computed(() =>
  Array.from({ length: 12 }, (_, monthIndex) => {
    const _date = new Date(dateState.value.year, monthIndex, 1);
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
  dateState.value = getDateDetails();
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
function selectDate(d: CalendarDate) {
  const updateModel = (month: number, year: number) => {
    modelValue.value = new Date(`${month + 1}-${d.date}-${year}`);
    nextTick(() => {
      updateInputValue();
    });
    hide();
  };
  chooseDate(d, updateModel);
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
</style>
