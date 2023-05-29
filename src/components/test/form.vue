<template>
  <form @submit.prevent="submit">
    <Input v-model="title" type="text" :error-message="errors.title" />
    <RadioGroup
      v-model="agree"
      :options="radioData"
      :vertical="false"
      :error-message="errors.agree"
    />

    <button type="submit">Submit</button>
  </form>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useField, useForm } from "vee-validate";
import { object, string, number, boolean } from "yup";
import Input from "../Input/src/Index.vue";
import RadioGroup from "../Radio/src/Index.vue";

const radioData = ref([
  { value: 1, label: "Yes" },
  { value: 0, label: "No" },
]);

const validationSchema = object({
  title: string()
    .required("Title is required")
    .min(2, "Title must be at least 2 characters"),
  agree: number().oneOf([0, 1], "Please select an answer"),
});

const { handleSubmit, errors } = useForm({
  validationSchema,
  initialValues: {
    title: "",
    agree: -1,
  },
});

const { value: title } = useField<string>("title");
const { value: agree } = useField<number>("agree");

const submit = handleSubmit((values) => {
  console.log(values);
});
</script>

<style scoped></style>
