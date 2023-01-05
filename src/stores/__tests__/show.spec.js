import { flushPromises } from "@vue/test-utils";
import { setActivePinia, createPinia } from "pinia";
import { useShowStore } from "@/stores/show";
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

describe("Show store test", () => {
  let mock = null;
  let store = null;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useShowStore();
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    store = null;
    mock = null;
  });

  it("should display the show details", async () => {
    const id = 123;
    const obj = {
      image: {
        medium:
          "https://static.tvmaze.com/uploads/images/medium_portrait/1/4600.jpg",
      },
      genres: ["Comedy"],
    };

    mock.onGet(`https://api.tvmaze.com/shows/${id}?embed=cast`).reply(200, obj);

    store.fetchShow(id);
    await flushPromises();
    expect(store.show).toStrictEqual(obj);
    expect(store.loading).toBe(false);
  });

  it("should not set the show when api returns an error", async () => {
    const id = 123;
    const obj = {
      image: {
        medium:
          "https://static.tvmaze.com/uploads/images/medium_portrait/1/4600.jpg",
      },
      genres: ["Comedy"],
    };

    mock.onGet(`https://api.tvmaze.com/shows/${id}?embed=cast`).reply(404, obj);

    store.fetchShow(id);
    await flushPromises();
    expect(store.show).toStrictEqual({});
  });
});
