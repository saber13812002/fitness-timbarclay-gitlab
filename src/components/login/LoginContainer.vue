<template>
  <span>
    <el-dropdown v-if="isLoggedIn" @command="handleDropdown">
      <img :src="user.imageUrl" class="el-dropdown-link"/>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="logout">Log out</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <span v-else-if="isLoggingIn">Loading...</span>
    
    <login-button :size="buttonSize" :initialised="initialised" v-else />
  </span>
</template>

<script>
import LoginButton from "./LoginButton.vue";
import actions from "../../vuex/actions";
import {mapState, mapMutations, mapGetters} from "vuex";

export default {
  props: {
    buttonSize: {type: String, required: false}
  },
  components: {
    LoginButton
  },
  computed: {
    ...mapState({
      user: state => state.login.user,
      isLoggingIn: state => state.login.isLoggingIn,
      initialised: state => state.initialised
    }),
    ...mapGetters([
      "isLoggedIn"
    ])
  },
  methods: {
    handleDropdown(command) {
      switch(command){
        case "logout":
          return this.$store.dispatch(actions.SIGN_OUT);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../sass/_variables.scss";

img {
  border-radius: 50%;
  cursor: pointer;
  height: 40px;
}
</style>
