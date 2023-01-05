import { shallowMount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia, createPinia } from "pinia";
import SearchBar from "../SearchBar.vue";
import { useShowsStore } from "@/stores/shows";

jest.mock("@fortawesome/vue-fontawesome", () => "");

jest.mock("vue-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useRoute: () => ({
    push: jest.fn(),
  }),
}));

describe("SearchBar component test", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  function factory(options) {
    const wrapper = shallowMount(SearchBar, {
      global: {
        plugins: [createTestingPinia(options)],
        stubs: ["font-awesome-icon"],
      },
    });

    const shows = useShowsStore();

    return { wrapper, shows };
  }

  it("should mount", () => {
    const { wrapper } = factory();
    expect(wrapper.exists()).toBe(true);
  });

  it("should have form", () => {
    const { wrapper } = factory();

    const form = wrapper.find("form");
    const input = wrapper.find("input[name='search']");
    expect(form.exists()).toBe(true);
    expect(input.exists()).toBe(true);
  });

  it("should submit search form", async () => {
    jest.useFakeTimers();

    const { wrapper, shows } = factory();

    wrapper.vm.query = "search term";
    wrapper.find("form").trigger("submit.prevent");

    await wrapper.vm.onInput();
    jest.runOnlyPendingTimers();

    expect(shows.searchShow).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.router.push).toHaveBeenCalledWith({
      path: "/shows",
      query: { search: "search term" },
    });
  });

  it("should not submit search form when the search query length is lower than 3", async () => {
    jest.useFakeTimers();
    const { wrapper, shows } = factory();

    wrapper.vm.query = "se";
    wrapper.find("form").trigger("submit.prevent");

    await wrapper.vm.onInput();
    jest.runOnlyPendingTimers();

    expect(shows.searchShow).toHaveBeenCalledTimes(0);
  });

  it("should redirect to root page when the search term has 0 character", async () => {
    jest.useFakeTimers();
    const { wrapper, shows } = factory();

    wrapper.vm.query = "";
    wrapper.find("form").trigger("submit.prevent");

    await wrapper.vm.onInput();
    jest.runOnlyPendingTimers();

    expect(shows.searchShow).toHaveBeenCalledTimes(0);
    expect(wrapper.vm.router.push).toHaveBeenCalledWith({
      path: "/",
    });
  });

  it("should call setQuery when there is a search query", async () => {
    jest.useFakeTimers();
    const { wrapper, shows } = factory();

    wrapper.vm.query = "query";

    await wrapper.vm.onInput();
    jest.runOnlyPendingTimers();

    expect(shows.setQuery).toHaveBeenCalledTimes(1);
  });
});
