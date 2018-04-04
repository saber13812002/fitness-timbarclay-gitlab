<template>
  <div>
    <el-dropdown v-if="isLoggedIn" @command="handleDropdown">
      <img :src="user.imageUrl" class="el-dropdown-link"></img>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="logout">Log out</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <div v-else-if="isLoggingIn">Loading...</div>
    
    <div v-else><login-button /></div>
  </div>
</template>

<script>
import LoginButton from "./LoginButton.vue";
import mutations from "../../vuex/mutations";
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
img {
  border-radius: 50%;
  cursor: pointer;
}
</style>
