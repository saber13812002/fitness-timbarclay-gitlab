<template>
  <div class="login-container">
    <div class="login-text-container">
      <div>
        <p>Connect Superset to your Google account to start seeing better, more useful analyses of your workouts and start supercharging your progress</p>
      </div>

      <div>
        <login-container />
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

.login-container {
  min-height: 100vh;
  padding-top: 30vh;
}

.login-text-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 900px;
  margin: 0 auto;
  font-size: 1.1em;
  color: $white;
  text-shadow: 1px 1px 1px black;
  &> * {
    margin: 1em;
  }
}
@media only screen and (min-width: 1367px) {
  .login-container {
    background: url("../assets/images/pullup-dark-1920.jpg") no-repeat top center;
    background-size: cover;
  }
}
@media only screen and (max-width: 1366px) {
  .login-container {
    background: url("../assets/images/pullup-dark-1366.jpg") no-repeat top center;
    background-size: cover;
  }
}
@media only screen and (max-width: 990px) {
  .login-container {
    background-color: $primary-text;
    background: url("../assets/images/plate-step-1000.jpg") no-repeat top center;
    background-size: cover;
  }
}
@media only screen and (max-width: 500px) {
  .login-container {
    background: url("../assets/images/plate-step-600.jpg") no-repeat top center;
    background-size: cover;
  }
}
</style>

