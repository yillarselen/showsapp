import { shallowMount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import Cast from "../Cast.vue";

const mockData = {
  person: {
    name: "person 1",
    url: "url",
    image: {
      medium: "imageUrl",
    },
  },
  character: {
    name: "character name",
  },
};

const wrapper = shallowMount(Cast, {
  global: {
    plugins: [createTestingPinia()],
  },
  propsData: {
    data: mockData,
  },
});

describe("Cast component test", () => {
  it("should mount", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should have cast person when all data set", () => {
    const castPerson = wrapper.findAll('[data-testid="cast-person"]');
    const castPersonImg = wrapper.findAll('[data-testid="cast-person-img"]');
    const castPersonName = wrapper.findAll('[data-testid="cast-person-name"]');

    expect(castPerson.length).toEqual(1);
    expect(castPerson[0].attributes("href")).toEqual(mockData.person.url);

    expect(castPersonImg.length).toEqual(1);
    expect(castPersonImg[0].attributes("src")).toEqual(
      mockData.person.image.medium
    );

    expect(castPersonName.length).toEqual(1);
    expect(castPersonName[0].text()).toEqual(
      `${mockData.person.name} (${mockData.character.name})`
    );
  });
});
