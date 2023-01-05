import { flushPromises, shallowMount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { useShowStore } from "@/stores/show";
import Show from "../Show.vue";
import { setActivePinia, createPinia } from "pinia";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

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

describe("Show component test", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  function factory(options) {
    const wrapper = shallowMount(Show, {
      global: {
        plugins: [createTestingPinia(options)],
        stubs: ["font-awesome-icon"],
      },
    });

    const show = useShowStore();

    return { wrapper, show };
  }

  beforeEach(() => {
    const id = 1;
    mock.onGet(`https://api.tvmaze.com/shows/${id}?embed=cast`).reply(200, {
      id: 1,
    });
  });

  it("should mount", async () => {
    const { wrapper } = factory();
    await flushPromises();
    expect(wrapper.exists()).toBe(true);
  });

  it("displays selected show", async () => {
    const { show } = factory();
    await flushPromises();
    expect(show.fetchShow).toHaveBeenCalledTimes(1);
  });

  it("should display loading spinner", () => {
    const { wrapper } = factory({
      initialState: {
        show: {
          loading: true,
        },
      },
    });
    const spinner = wrapper.find('[data-testid="spinner"]');
    expect(spinner.exists()).toBe(true);
  });

  it("should redirect to root when the previous page has /show and user clicks back button", async () => {
    const { wrapper } = factory();

    window.history.replaceState({ back: "/show" }, "MOCK");

    await wrapper.find("[data-testid='back-button']").trigger("click");
    expect(wrapper.vm.router.push).toHaveBeenCalledWith("/");
  });

  it("displays all elements", () => {
    const show = {
      loading: false,
      image: {
        original: "url",
      },
      name: "name",
      summary: "summary",
      rating: {
        average: 1,
      },
      premiered: "2022-02-02",
      genres: ["Comedy"],
      externals: {
        imdb: "imdb-id",
      },
      _embedded: {
        cast: [{ id: 1 }],
      },
    };

    const { wrapper } = factory({
      initialState: {
        show: { show },
      },
    });

    const image = wrapper.find("[data-testid='show-image']");
    const rating = wrapper.find("[data-testid='show-rating']");
    const title = wrapper.find("h1");
    const castTitle = wrapper.find("h4");
    const summary = wrapper.find("[data-testid='show-summary']");
    const imdbUrl = wrapper.find("[data-testid='imdb-url']");
    const favoriteButton = wrapper.find("[data-testid='favorite-button']");
    const castItem = wrapper.find("[data-testid='cast']");

    expect(image.exists()).toBe(true);
    expect(image.attributes("src")).toStrictEqual(show.image.original);
    expect(image.attributes("alt")).toStrictEqual(show.name);

    expect(rating.text()).toBe(
      `Rating: ${show.rating.average} | ${show.premiered} | ${show.genres.join(
        ", "
      )}`
    );

    expect(title.text()).toBe(show.name);
    expect(summary.text()).toBe(show.summary);
    expect(imdbUrl.attributes("href")).toBe(
      `https://www.imdb.com/title/${show.externals.imdb}/`
    );
    expect(favoriteButton.exists()).toBe(true);

    expect(castTitle.text()).toBe("Featured Cast");
    expect(castItem.exists()).toBe(true);
  });
});
