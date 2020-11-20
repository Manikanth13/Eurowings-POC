import { mount } from "@vue/test-utils";
import ImageGrid from "@/components/image-grid.component.vue";
import { BCard, BCardText } from "bootstrap-vue";
import VueLazyload from "vue-lazyload";

import Vue from "vue";

Vue.use(VueLazyload);

describe("ImageGrid.Vue", () => {
  it("renders props when passed", () => {
    const wrapper = mount(ImageGrid, {
      propsData: {
        src: "title",
        description: "description",
        title: "Title"
      },
      components: {
        "b-card": BCard,
        "b-card-text": BCardText
      }
    });

    const cardTitle = wrapper.find("h4.card-title");
    const cardDescription = wrapper.find("p.card-text");
    expect(cardDescription.text()).toBe("description");
    expect(cardTitle.text()).toBe("Title");
  });
});
