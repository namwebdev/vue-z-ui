<template>
  <table class="border">
    <thead>
      <tr>
        <th
          v-for="{ label, prop, sortable } in columns"
          :key="prop"
          colspan="1"
          rowspan="1"
          @click="handleSort(prop)"
        >
          {{ label }}
          <div v-if="sortable" class="text-gray-400">
            <span
              :class="{
                'text-blue-600': prop === sort.columnProp && sort.isAccessing,
              }"
              >u</span
            >
            <br />
            <span
              :class="{
                'text-blue-600': prop === sort.columnProp && sort.isDescending,
              }"
              >d</span
            >
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(dataRow, index) in listDataRow"
        :key="dataRow.id"
        :class="{ 'odd-row': index % 2 === 1 }"
      >
        <td v-for="{ prop } in columns" :key="prop" colspan="1" rowspan="1">
          {{ dataRow[prop] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

defineOptions({
  name: "Table",
});

export interface Column {
  prop: string;
  label: string;
  sortable?: boolean;
}
export type DataRow = {
  [K in Column["prop"]]: string | number;
};

const { columns, data } = defineProps<{
  columns: Column[];
  data: DataRow[];
}>();

const sort = reactive({
  columnProp: "",
  isAccessing: false,
  isDescending: false,
});

const listDataRow = ref<DataRow[]>([]);
const originalDataRows = ref<DataRow[]>([]);

init();

function init() {
  originalDataRows.value = data.map((item) => {
    const dataRow = {} as DataRow;
    columns.forEach((column) => {
      dataRow[column.prop] = item[column.prop];
    });
    return {
      ...dataRow,
      ...(!item.id && { id: Math.random() }),
    };
  });
  listDataRow.value = originalDataRows.value;
}
function handleSort(columnProp: string) {
  if (!sort.columnProp || sort.columnProp !== columnProp) {
    sort.isDescending = true;
    sort.isAccessing = false;
    sortData(columnProp);
    sort.columnProp = columnProp;
    return;
  }
  if (sort.isDescending) {
    sort.isAccessing = true;
    sort.isDescending = false;
    sortData(columnProp);
    sort.columnProp = columnProp;
    return;
  }
  if (sort.isAccessing) {
    sortData();
    sort.columnProp = "";
    sort.isAccessing = false;
    sort.isDescending = false;
  }
}
function sortData(columnProp = "") {
  if (!columnProp) {
    listDataRow.value = originalDataRows.value;
    return;
  }
  if (sort.isAccessing) {
    if (typeof columnProp === "string") {
      listDataRow.value = originalDataRows.value
        .slice()
        .sort((a, b) =>
          (a[columnProp] as string).localeCompare(b[columnProp] as string)
        );
      return;
    }
    if (typeof columnProp === "number") {
      listDataRow.value = originalDataRows.value
        .slice()
        .sort((a, b) => (a[columnProp] as number) - (b[columnProp] as number));
      return;
    }
  }
  if (sort.isDescending) {
    if (typeof columnProp === "string") {
      listDataRow.value = originalDataRows.value
        .slice()
        .sort((a, b) =>
          (b[columnProp] as string).localeCompare(a[columnProp] as string)
        );
      return;
    }
    if (typeof columnProp === "number") {
      listDataRow.value = originalDataRows.value
        .slice()
        .sort((a, b) => (b[columnProp] as number) - (a[columnProp] as number));
    }
  }
}
function sortBaseOnPropType() {}
</script>

<style scoped>
table {
  width: 100%;
  text-align: left;
}
.border > th,
.border > td {
  border: 1px solid black;
  border-radius: 10px;
}
th {
  color: #000000d9;
}
tr {
  border-bottom: 1px solid #ebeef5;
}
tbody > tr.odd-row {
  background-color: #fafafa;
}
tbody > tr {
  transition: background-color 0.3s ease;
}
tbody > tr:hover {
  background-color: #f5f7fa;
}
td,
th {
  padding: 15px;
}
td {
  word-break: break-all;
}
</style>
