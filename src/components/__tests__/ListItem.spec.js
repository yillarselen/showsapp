import { shallowMount, config } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import ListItem from "../ListItem.vue";

describe("ListItem component test", () => {
  const mockData = {
    data: {
      id: 1,
      name: "item name",
      image: {
        medium:
          "https://static.tvmaze.com/uploads/images/medium_portrait/1/4600.jpg",
      },
    },
    gridLayout: "layout-class",
  };

  beforeAll(() => {
    config.global.renderStubDefaultSlot = true;
  });

  afterAll(() => {
    config.global.renderStubDefaultSlot = false;
  });
  function factory() {
    const wrapper = shallowMount(ListItem, {
      global: {
        stubs: ["router-link"],
        plugins: [createTestingPinia()],
      },
      propsData: mockData,
    });

    return { wrapper };
  }

  it("should mount", () => {
    const { wrapper } = factory();
    expect(wrapper.exists()).toBe(true);
  });

  it("should have item image", () => {
    const { wrapper } = factory();

    const img = wrapper.find("img");
    expect(img.exists()).toBe(true);
  });

  it("should have item name", () => {
    const { wrapper } = factory();

    const name = wrapper.find("p");
    expect(name.text()).toEqual(mockData.data.name);
  });
});
