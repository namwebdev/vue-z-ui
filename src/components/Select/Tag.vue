<template>
  <span class="">
    {{ text }}
    <span @class="$emit('close')"> <i class="fas fa-times"></i></span>
  </span>
</template>

<script>
export default {
  name: "TagSelected",
  props: {
    text: {
      type: String,
      default: () => "",
    },
  },
};
</script>
