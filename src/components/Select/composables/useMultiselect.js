import { ref, toRefs, computed } from "vue";

export default function useMultiselect(props) {
  const { searchable } = toRefs(props);

  // ================ DATA ================

  const multiselect = ref(null);

  // ============== COMPUTED ==============

  const tabindex = computed(() => {
    return searchable.value ? -1 : 0;
  });

  // =============== METHODS ==============

  const focusInput = () => {
    multiselect.value.querySelector(".multiselect-input").focus();
  };

  const blurInput = () => {
    multiselect.value.querySelector(".multiselect-input").blur();
  };

  return {
    multiselect,
    tabindex,
    focusInput,
    blurInput,
  };
}
