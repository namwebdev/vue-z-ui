import { shallowMount } from "@vue/test-utils";
import { nextTick } from "vue";
import Modal from "@/components/Modal/Index.vue";

describe("Modal.vue", () => {
  test("Render layout", async () => {
    const wrapper = shallowMount(Modal, {
      props: {
        visible: true,
      },
    });

    await nextTick();

    expect(wrapper.exists()).toBe(true);
  });
});
