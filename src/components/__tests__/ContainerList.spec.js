import { shallowMount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import ContainerList from "../ContainerList.vue";

describe("ContainerList component test", () => {
  function factory(mockData) {
    const wrapper = shallowMount(ContainerList, {
      global: {
        plugins: [createTestingPinia()],
      },
      propsData: mockData,
    });

    return { wrapper };
  }

  it("should mount", () => {
    const mockData = {
      title: "title",
      list: [{ id: 1 }, { id: 2 }],
      loading: false,
      searchTerm: "term",
    };
    const { wrapper } = factory(mockData);
    expect(wrapper.exists()).toBe(true);
  });

  it("should display loading spinner", () => {
    const mockData = {
      loading: true,
    };
    const { wrapper } = factory(mockData);
    const spinner = wrapper.find('[data-testid="spinner"]');
    expect(spinner.exists()).toBe(true);
  });

  it("should have title and list items when the list is not empty", () => {
    const mockData = {
      title: "title",
      list: [{ id: 1 }, { id: 2 }],
      loading: false,
      searchTerm: "term",
    };
    const { wrapper } = factory(mockData);

    const title = wrapper.find("h1");
    const listItem = wrapper.findAll('[data-testid="list-item"]');

    expect(title.text()).toEqual(mockData.title);
    expect(listItem.length).toEqual(2);
  });

  it("should display no result text when there's no show to display", () => {
    const mockData = {
      title: "title",
      list: [],
      loading: false,
      searchTerm: "term",
    };
    const { wrapper } = factory(mockData);

    const noResultsText = wrapper.find("p");

    expect(noResultsText.text()).toBe(
      `Your search for "${mockData.searchTerm}" did not return any results.`
    );
  });

  it("should display favorite list is empty text if the title is 'Favorites'", () => {
    const mockData = {
      title: "Favorites",
      list: [],
      loading: false,
      searchTerm: null,
    };
    const { wrapper } = factory(mockData);

    const favoriteListIsEmptyText = wrapper.find("p");

    expect(favoriteListIsEmptyText.text()).toBe(
      "Your favorite list is empty :("
    );
  });
});
