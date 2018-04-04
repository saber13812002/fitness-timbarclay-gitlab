<template>
  <div class="home">
    <img src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    
    <login-container/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import LoginContainer from "../components/login/LoginContainer.vue";

export default {
  name: 'home',
  components: {
    HelloWorld,
    LoginContainer
  }
}
</script>
