<template>
  <button v-on:click="handleClick">Login</button>
</template>

<script>
import GoogleApi from "../../application/googleApi";
import config from "../../../config";

export default {
  data() {
    return {
      googleApi: new GoogleApi()
    }
  },
  methods: {
    handleClick() {
      this.googleApi.signIn(false,
        () => {},
        () => {
          this.googleApi.getUser()
            .then(user => {

              gapi.client.init({
                apiKey: config.google.API_KEY,
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
        err => {})
    }
  }
}
</script>

<style>

</style>
