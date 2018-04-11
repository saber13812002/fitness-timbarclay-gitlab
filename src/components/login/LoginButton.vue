<template>
  <el-button type="primary" round v-on:click="handleClick">Login</el-button>
</template>

<script>
import GoogleApi from "../../application/googleApi";
import mutations from "../../vuex/mutations";

export default {
  data() {
    return {
      googleApi: new GoogleApi()
    }
  },
  methods: {
    handleClick() {
      this.googleApi.signIn(false,
        () => this.$store.commit(mutations.LOGIN_BEGIN),
        () => {
          this.googleApi.getUser()
            .then(authResponse => {
              this.$store.commit(mutations.LOGIN_SUCCESS, {
                user: authResponse.user
              });
            })
        },
        err => this.$store.commit(mutations.LOGIN_FAILURE, err))
    }
  }
}
</script>
