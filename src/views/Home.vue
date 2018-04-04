<template>
  <div class="home">
    <img src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    
    <login-button></login-button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import LoginButton from "../components/login/LoginButton.vue";

export default {
  name: 'home',
  components: {
    HelloWorld,
    LoginButton
  }
}
</script>
