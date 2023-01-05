import { shallowMount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import List from "../List.vue";
import { useShowsStore } from "@/stores/shows";
import { setActivePinia, createPinia } from "pinia";

jest.mock("@fortawesome/vue-fontawesome", () => "");

jest.mock("vue-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useRoute: () => ({
    push: jest.fn(),
    params: {
      id: 1,
    },
  }),
}));

describe("List component test", () => {
  const mockData = Array.from(
    {
      length: 16,
    },
    () => ({
      id: Math.floor(Math.random() * (100 - 1)) + 1,
      name: "Show name",
      image: {
        medium: "imageUrl",
      },
    })
  );
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  function factory(options) {
    const wrapper = shallowMount(List, {
      global: {
        plugins: [createTestingPinia(options)],
        stubs: ["font-awesome-icon", "router-link"],
      },
    });

    const shows = useShowsStore();

    return { wrapper, shows };
  }

  it("should mount", () => {
    const { wrapper } = factory();

    expect(wrapper.exists()).toBe(true);
  });

  it("should display loading spinner", () => {
    const { wrapper, shows } = factory({
      initialState: {
        shows: {
          loading: true,
        },
      },
    });

    expect(shows.loading).toBe(true);

    const spinner = wrapper.find('[data-testid="spinner"]');
    expect(spinner.exists()).toBe(true);
  });

  it("should not display loading spinner", () => {
    const { wrapper } = factory({
      initialState: {
        shows: {
          loading: false,
        },
      },
    });

    const spinner = wrapper.find('[data-testid="spinner"]');
    expect(spinner.exists()).toBe(false);
  });

  it("should display category name", () => {
    const { wrapper, shows } = factory({
      initialState: {
        shows: {
          loading: false,
          showsByGenres: { Comedy: mockData },
        },
      },
    });

    expect(shows.loading).toBe(false);

    const categoryName = wrapper.find("h2");
    expect(categoryName.exists()).toBe(true);
  });

  it("should display 16 list items", () => {
    const { wrapper } = factory({
      initialState: {
        shows: {
          loading: false,
          showsByGenres: { Comedy: mockData },
        },
      },
    });
    const listItem = wrapper.findAll('[data-testid="list-item"]');
    expect(listItem.length).toBe(16);
  });

  it("should not display list items", () => {
    const { wrapper } = factory({
      initialState: {
        shows: {
          loading: false,
          showsByGenres: {},
        },
      },
    });
    const listItem = wrapper.findAll('[data-testid="list-item"]');
    expect(listItem.length).toBe(0);
  });
});
