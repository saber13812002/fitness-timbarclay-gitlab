<template>
  <el-button type="primary" v-on:click="handleClick">Login</el-button>
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

              gapi.client.init({
                apiKey: API_KEY,
                discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/fitness/v1/rest"]
              }).then(() => {

                gapi.client.fitness.users.dataSources.list({
                  userId: "me"
                }).then(res => {
                  const s = res.result.dataSource;
                })
              })
            })
        },
        err => this.$store.commit(mutations.LOGIN_FAILURE, err))
    }
  }
}
</script>

<style>

</style>
