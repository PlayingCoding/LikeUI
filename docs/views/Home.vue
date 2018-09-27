<template>
  <div class="home">
    <Icon type='check-circle' size='30' color='#1296db'></Icon>
    <Icon type='CI' size='30'></Icon>
    <Icon type="Dollar" size='30' color="#f4ea2a" />
    <Icon type="compass" size='30' />
    <hr/>
    <Button type="primary">哈哈哈哈</Button>
    <Button size="large" icon="Dollar" type="primary" shape="circle"></Button>
    <Button type="success" long>SUBMIT</Button>
    <br><br>
    <Button type="error" long>DELETE</Button>
    <ButtonGroup>
        <Button type="primary">L</Button>
        <Button type="success">M</Button>
        <Button>M</Button>
        <Button type="dashed">R</Button>
    </ButtonGroup>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "../components/HelloWorld.vue";
export default {
  name: "home",
  components: {
    HelloWorld
  }
};
</script>
