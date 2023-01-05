import { shallowMount, config } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import Header from "../Header.vue";

jest.mock("@fortawesome/vue-fontawesome", () => "");

describe("Header component test", () => {
  beforeAll(() => {
    config.global.renderStubDefaultSlot = true;
  });

  afterAll(() => {
    config.global.renderStubDefaultSlot = false;
  });

  it("should verify all elements when it is mounted", () => {
    const wrapper = shallowMount(Header, {
      global: {
        plugins: [createTestingPinia()],
        stubs: ["font-awesome-icon", "router-link"],
      },
      propsData: {
        show: { id: 1 },
      },
    });

    const h1 = wrapper.find("h1");
    expect(h1.text()).toBe("SHOWS");
    const searchBar = wrapper.find("[data-testid='search-bar']");
    expect(searchBar.exists()).toBe(true);
  });
});
