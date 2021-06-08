import { ref } from "vue";

export default function usePointer() {
  // ================ DATA ================

  const pointer = ref(null);

  return {
    pointer,
  };
}
