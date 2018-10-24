<template>
  <div>
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
    }
  }
};
</script>
