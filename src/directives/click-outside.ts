import { DirectiveBinding } from "vue";

export default {
  beforeMount(el: any, binding: DirectiveBinding) {
    el.clickOutsideEvent = (event: any) => {
      console.log(el, event);
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event, el);
      }
    };
    document.body.addEventListener("click", el.clickOutsideEvent);
  },
  unmounted(el: any) {
    document.body.removeEventListener("click", el.clickOutsideEvent);
  },
};
