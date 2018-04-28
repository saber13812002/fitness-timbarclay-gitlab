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

// TODO might be cool to do this https://codepen.io/jmperez/pen/wrVxga
.login-container {
  background: url("../assets/images/main-bg-1920-1281-orig.jpg") no-repeat center center;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30vh;
  font-size: 1.5em;
  color: $white;
  text-shadow: $primary-text 1px 1px 15px;

  &> * {
    margin: 1em;
  }
}
</style>

