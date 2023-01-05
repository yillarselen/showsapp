import { flushPromises } from "@vue/test-utils";
import { setActivePinia, createPinia } from "pinia";
import { useShowsStore } from "@/stores/shows";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

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

describe("Shows store test", () => {
  let mock = null;
  let store = null;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useShowsStore();
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    store = null;
    mock = null;
  });

  it("should add the show to showByGenres", async () => {
    const obj = {
      image: {
        medium:
          "https://static.tvmaze.com/uploads/images/medium_portrait/1/4600.jpg",
        original:
          "https://static.tvmaze.com/uploads/images/original_untouched/1/4600.jpg",
      },
      genres: ["Comedy"],
    };

    mock.onGet("https://api.tvmaze.com/shows?page=1").reply(200, [obj]);

    store.fetchShows();
    await flushPromises();
    expect(store.loading).toBe(false);
    expect(store.showsByGenres).toStrictEqual({ Comedy: [obj] });
  });

  it("should not add the show to showByGenres when it doesn't have an original image", async () => {
    let obj = {
      image: {
        medium:
          "https://static.tvmaze.com/uploads/images/medium_portrait/1/4600.jpg",
      },
      genres: ["Comedy"],
    };

    mock.onGet("https://api.tvmaze.com/shows?page=1").reply(200, [obj]);

    store.fetchShows();
    await flushPromises();
    expect(store.showsByGenres).toStrictEqual({});
  });

  it("should not add the show to showByGenres when it doesn't have a medium image", async () => {
    let obj = {
      image: {
        original:
          "https://static.tvmaze.com/uploads/images/medium_portrait/1/4600.jpg",
      },
      genres: ["Comedy"],
    };

    mock.onGet("https://api.tvmaze.com/shows?page=1").reply(200, [obj]);

    store.fetchShows();
    await flushPromises();
    expect(store.showsByGenres).toStrictEqual({});
  });

  it("should not add the show to showByGenres when it doesn't have the image", async () => {
    let obj = {
      genres: ["Comedy"],
    };

    mock.onGet("https://api.tvmaze.com/shows?page=1").reply(200, [obj]);

    store.fetchShows();
    await flushPromises();
    expect(store.showsByGenres).toStrictEqual({});
  });

  it("should set the loading false when the call is ended", async () => {
    let obj = {
      genres: ["Comedy"],
    };

    mock.onGet("https://api.tvmaze.com/shows?page=1").reply(200, [obj]);

    store.fetchShows();
    await flushPromises();
    expect(store.loading).toBe(false);
  });

  it("should not create showByGenres when the api returns error", async () => {
    const obj = {
      image: {
        medium:
          "https://static.tvmaze.com/uploads/images/medium_portrait/1/4600.jpg",
        original:
          "https://static.tvmaze.com/uploads/images/original_untouched/1/4600.jpg",
      },
      genres: ["Comedy"],
    };

    mock.onGet("https://api.tvmaze.com/shows?page=1").reply(404, [obj]);

    store.fetchShows();
    await flushPromises();
    expect(store.showsByGenres).toStrictEqual({});
  });

  it("should set the query to searchQuery", () => {
    const mockQuery = "searchQuery";
    store.setQuery(mockQuery);
    expect(store.searchQuery).toBe(mockQuery);
  });

  it("should set loading state to true", () => {
    store.loading = false;
    store.setLoading(true);
    expect(store.loading).toBe(true);
  });

  it("should search show", async () => {
    const obj = {
      show: {
        image: {
          medium:
            "https://static.tvmaze.com/uploads/images/medium_portrait/1/4600.jpg",
          original:
            "https://static.tvmaze.com/uploads/images/original_untouched/1/4600.jpg",
        },
      },
    };
    const query = "query";

    mock
      .onGet(`https://api.tvmaze.com/search/shows?q=${query}`)
      .reply(200, [obj]);

    store.searchShow(query);
    await flushPromises();
    expect(store.searchResult).toStrictEqual([obj.show]);
  });

  it("should not add the show when it doesn't have an original image", async () => {
    const obj = {
      show: {
        image: {
          medium:
            "https://static.tvmaze.com/uploads/images/medium_portrait/1/4600.jpg",
        },
      },
    };
    const query = "query";

    mock
      .onGet(`https://api.tvmaze.com/search/shows?q=${query}`)
      .reply(200, [obj]);

    store.searchShow(query);
    await flushPromises();
    expect(store.searchResult).toStrictEqual([]);
  });

  it("should not add the show when it doesn't have a medium image", async () => {
    const obj = {
      show: {
        image: {
          original:
            "https://static.tvmaze.com/uploads/images/medium_portrait/1/4600.jpg",
        },
      },
    };
    const query = "query";

    mock
      .onGet(`https://api.tvmaze.com/search/shows?q=${query}`)
      .reply(200, [obj]);

    store.searchShow(query);
    await flushPromises();
    expect(store.searchResult).toStrictEqual([]);
  });

  it("should not add the show when it doesn't have any image", async () => {
    const obj = {
      show: {},
    };
    const query = "query";

    mock
      .onGet(`https://api.tvmaze.com/search/shows?q=${query}`)
      .reply(200, [obj]);

    store.searchShow(query);
    await flushPromises();
    expect(store.searchResult).toStrictEqual([]);
  });

  it("should not add the show when the api returns error", async () => {
    const obj = {
      show: {
        image: {
          medium:
            "https://static.tvmaze.com/uploads/images/medium_portrait/1/4600.jpg",
          original:
            "https://static.tvmaze.com/uploads/images/original_untouched/1/4600.jpg",
        },
      },
    };
    const query = "query";

    mock
      .onGet(`https://api.tvmaze.com/search/shows?q=${query}`)
      .reply(404, [obj]);

    store.searchShow(query);
    await flushPromises();
    expect(store.searchResult).toStrictEqual([]);
  });

  it("should set the loading false when the call is ended", async () => {
    const obj = {
      show: {
        image: {
          medium:
            "https://static.tvmaze.com/uploads/images/medium_portrait/1/4600.jpg",
          original:
            "https://static.tvmaze.com/uploads/images/original_untouched/1/4600.jpg",
        },
      },
    };
    const query = "query";

    mock
      .onGet(`https://api.tvmaze.com/search/shows?q=${query}`)
      .reply(200, [obj]);

    store.searchShow(query);
    await flushPromises();
    expect(store.loading).toBe(false);
  });
});
