import { shallowMount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia, createPinia } from "pinia";
import FavoriteButton from "../FavoriteButton.vue";
import { useFavoriteStore } from "@/stores/favorites";

jest.mock("@fortawesome/vue-fontawesome", () => "");

describe("FavoriteButton component test", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  function factory(options) {
    const wrapper = shallowMount(FavoriteButton, {
      global: {
        plugins: [createTestingPinia(options)],
        stubs: ["font-awesome-icon"],
      },
      propsData: {
        show: { id: 1 },
      },
    });

    const favorites = useFavoriteStore();

    return { wrapper, favorites };
  }

  it("should mount", () => {
    const { wrapper } = factory();
    expect(wrapper.exists()).toBe(true);
  });

  it("should have button", () => {
    const { wrapper } = factory();

    const button = wrapper.find("button");
    const favoriteIcon = wrapper.find('[data-testid="favorite-icon"]');
    expect(button.exists()).toBe(true);
    expect(favoriteIcon.exists()).toBe(true);
  });

  it("calls click event when the user clicks button", async () => {
    const { wrapper, favorites } = factory();

    const button = wrapper.find("button");
    await button.trigger("click");
    expect(favorites.toggleFavorite).toHaveBeenCalledTimes(1);
  });
});
