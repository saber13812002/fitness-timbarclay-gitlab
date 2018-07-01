<template>
  <div class="login-container">
    <div class="login-text-container">
      <div>
        <p>Superset makes the most of the Strength Training data collected by your Google WearOS device</p>
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
  color: $white;
  &> * {
    margin: 1em;
  }
}

@media only screen and (max-width: 990px) {
  .login-container {
    background-color: $primary-text;
    background: url("../assets/images/plate-step-1000.jpg") no-repeat top center;
    background-size: cover;
  }
}
</style>

