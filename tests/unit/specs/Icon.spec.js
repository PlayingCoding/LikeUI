import { shallowMount } from "@vue/test-utils";
import Icon from "../../../src/components/icon/icon";

describe("icon.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(Icon, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
