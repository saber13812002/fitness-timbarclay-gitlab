<template>
  <div class="login-container">
    <div>
      You have to log in and stuff
    </div>

    <div>
      <login-container />
    </div>
    
    <div>
      Other stuff about why it's a good idea to login because it's great etc
    </div>
  </div>
</template>

<script>
import LoginContainer from "../components/login/LoginContainer.vue";

export default {
  components: {
    LoginContainer
  }
}
</script>

<style lang="scss" scoped>
@import "../sass/_variables.scss";

.login-container {
  background-image: url("../assets/images/main-bg-1920-1281-orig.jpg");
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30vh;
  background-color: #409EFF;
  background-blend-mode: luminosity;
  font-size: 1.5em;

  &> * {
    margin: 1em;
  }
}
</style>

