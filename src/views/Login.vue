<template>
  <div class="login-container">
    <div class="login-text-container">
      <div>
        Superset makes the most of the Strength Training data collected by your Google WearOS device
      </div>

      <div>
        <login-container />
      </div>

      <div>
        Connect Superset to your Google account to start seeing better, more useful analyses of your workouts and start supercharging your progress
      </div>
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
  padding-top: 30vh;
}

.login-text-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
  font-size: 1.5em;
  color: $white;
  text-shadow: $primary-text 1px 1px 15px;
  &> * {
    margin: 1em;
  }
}
</style>

