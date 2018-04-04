<template>
  <div>
    <div v-if="isLoggedIn">
      <img :src="user.user.imageUrl"></img>
      <pre>{{user}}</pre>
    </div>
    <div v-else-if="isLoggingIn">Loading...</div>
    <div v-else><login-button /></div>
  </div>
</template>

<script>
import LoginButton from "./LoginButton.vue";
import {mapState, mapMutations, mapGetters} from "vuex";

export default {
  components: {
    LoginButton
  },
  computed: {
    ...mapState({
      user: state => state.login.user,
      isLoggingIn: state => state.login.isLoggingIn
    }),
    ...mapGetters([
      "isLoggedIn"
    ])
  }
}
</script>

<style>

</style>
