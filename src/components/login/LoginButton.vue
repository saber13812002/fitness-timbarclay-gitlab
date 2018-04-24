<template>
  <el-button type="primary" round v-on:click="handleClick" :disabled="!initialised" :title="title">Login</el-button>
</template>

<script>
import GoogleApi from "../../application/googleApi";
import mutations from "../../vuex/mutations";

export default {
  props: {
    initialised: {type: Boolean, default: false}
  },
  data() {
    return {
      googleApi: new GoogleApi()
    }
  },
  computed: {
    title() {
      return this.initialised ? "" : "Communicating with Google..."
    }
  },
  methods: {
    handleClick() {
      this.googleApi.signIn(
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
