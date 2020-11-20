import { mount } from "@vue/test-utils";
import Image from "@/components/image.component.vue";
import VueLazyload from "vue-lazyload";

import Vue from "vue";

Vue.use(VueLazyload);

describe("Image.Vue", () => {
  it("renders props when passed", () => {
    const wrapper = mount(Image, {
      propsData: {
        "lazy-src": "https://i.imgur.com/YHp2Jxu.jpg"
      }
    });

    const image = wrapper.find("img");
    expect(image.attributes()["data-src"]).toBe(
      "https://i.imgur.com/YHp2Jxu.jpg"
    );
  });
});
