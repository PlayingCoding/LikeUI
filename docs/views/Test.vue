<template>
  <div class="testDiv">
    <Layout>
      <Sider
        collapsible
        :collapsed-width="78"
        :collapsed="isCollapsed"
        @on-collapse="onCollapse">
        <ul>
          <li><span>1</span></li>
          <li><span>2</span></li>
          <li><span>3</span></li>
          <li><span>4</span></li>
          <li><span>5</span></li>
          <li><span>6</span></li>
        </ul>
      </Sider>
      <Layout>
        <Header>header</Header>
        <Content>content</Content>
        <Footer>footer</Footer>
      </Layout>
    </Layout>
    <div class="affixDemo">
      <div class="firstChild"></div>
      <Affix :offsetTop="20" :target="getTarget">
      <!-- <Affix :offsetTop="20"> -->
        <Button type="success" long>SUBMIT</Button>
      </Affix>
      <div class="secondChild"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "test",
  data() {
    return {
      isCollapsed: false
    };
  },
  methods: {
    onCollapse(val) {
      this.isCollapsed = val;
    },
    getTarget() {
      return document.getElementsByClassName("affixDemo")[0];
    }
  }
};
</script>

<style>
.testDiv {
  height: 3000px;
}
.affixDemo {
  height: 500px;
  overflow: auto;
}
.firstChild {
  height: 100px;
}
.secondChild {
  height: 1000px;
}
</style>

