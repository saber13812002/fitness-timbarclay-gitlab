<template>
  <span>
    <el-dropdown v-if="isLoggedIn" @command="handleDropdown">
      <img :src="user.imageUrl" class="el-dropdown-link"></img>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="logout">Log out</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <span v-else-if="isLoggingIn">Loading...</span>
    
    <login-button :size="buttonSize" v-else />
  </span>
</template>

<script>
import LoginButton from "./LoginButton.vue";
import mutations from "../../vuex/mutations";
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
      isLoggingIn: state => state.login.isLoggingIn
    }),
    ...mapGetters([
      "isLoggedIn"
    ])
  },
  methods: {
    handleDropdown(command) {
      switch(command){
        case "logout":
          return this.$store.commit(mutations.LOGOUT);
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
  height: $nav-height;
}
</style>
