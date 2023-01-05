import { setActivePinia, createPinia } from "pinia";
import { useFavoriteStore } from "../favorites";

describe("Favorite store test", () => {
  let store = null;

  beforeEach(() => {
    setActivePinia(createPinia());

    store = useFavoriteStore();
  });

  afterEach(() => {
    store = null;
  });

  it("checks if favorite show returns true when the show is already in the list", () => {
    const sut = {
      id: 1,
    };
    store.favorites = [sut, { id: 2 }];
    expect(store.checkFavorite(sut)).toBe(true);
  });

  it("checks if favorite show returns false when the show is not in the list", () => {
    const sut = {
      id: 1,
    };
    store.favorites = [{ id: 2 }];
    expect(store.checkFavorite(sut)).toBe(false);
  });

  it("adds favorite show", () => {
    const sut = {
      id: 1,
    };
    store.favorites = [];

    store.toggleFavorite(sut);

    expect(store.favorites.length).toBe(1);
  });

  it("removes favorite show when the favorite list has the show item", () => {
    const sut = {
      id: 1,
    };
    store.favorites = [{ id: 0 }, sut, { id: 2 }, { id: 3 }];

    store.toggleFavorite(sut);

    expect(store.favorites).toStrictEqual([{ id: 0 }, { id: 2 }, { id: 3 }]);
  });
});
