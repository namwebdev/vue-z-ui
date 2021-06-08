import { mount, shallowMount } from "@vue/test-utils";
import { nextTick } from "vue";
import Pagination from "@/components/Pagination/Index.vue";

describe("Pagination.vue", () => {
  it("render layout", () => {
    const wrapper = shallowMount(Pagination, {
      props: {
        totalPages: 5,
      },
    });
    const pageNodes = wrapper.findAll('li[data-test="page"]');

    expect(wrapper.find('ul[data-test="pager"]').exists()).toBe(true);
    expect(wrapper.find('li[data-test="prev"]').exists()).toBe(true);
    expect(pageNodes[0].exists()).toBe(true);
    expect(pageNodes[pageNodes.length - 1].exists()).toBe(true);
    expect(wrapper.find('li[data-test="next"]').exists()).toBe(true);
  });

  it("Check render total page", () => {
    const total_page = 7;
    const wrapper = shallowMount(Pagination, {
      props: {
        totalPages: total_page,
      },
    });

    expect(wrapper.findAll('li[data-test="page"]').length).toBe(total_page);
  });

  test("Click page", async () => {
    const wrapper = mount({
      components: {
        pagination: Pagination,
      },
      template: `
        <pagination 
            :current-page="page" 
            :total-pages="5" 
            @change="onChangePage" 
        />
        `,
      data() {
        return {
          page: 1,
        };
      },
      methods: {
        onChangePage(page) {
          this.page = page;
        },
      },
    });
    const pagination = wrapper.findComponent(Pagination);

    wrapper.findAll('li[data-test="page"]')[3].trigger("click");
    await nextTick();

    expect(wrapper.vm.page).toEqual(4);
    expect(pagination.props().currentPage).toEqual(4);
    expect(pagination.find("li.pagination-btn.active").text()).toEqual("4");
  });
});
