import { shallowMount } from "@vue/test-utils";
import Dropdown from "@/components/dropdown-component.vue";
import { BDropdown, BDropdownItem } from "bootstrap-vue";

describe("Dropdown.Vue", () => {
  it("renders props.menu when passed", () => {
    const wrapper = shallowMount(Dropdown, {
      propsData: {
        text: "Dropdown",
        menu: ["Menu 1"],
        onClick: (value: string) => console.log(value)
      },
      components: {
        "b-dropdown": BDropdown,
        "b-dropdown-item": BDropdownItem
      }
    });

    expect(wrapper.text()).toMatch("Menu 1");
  });
});
