<template>
  <div :is="layout">
    <router-view />
  </div>
</template>

<script>
import Axios from 'axios'

export default {
  computed : {
    isLoggedIn : function(){ return this.$store.getters.isLoggedIn},
    layout() {
      return this.$route.meta.layout ?? "app-layout";
    }
  },
  created: function () {
    // this.$http.interceptors.response.use(undefined, function (err) {
    //   return new Promise(function (resolve, reject) {
    //     console.log(err.config)
    //     if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
    //       this.$store.dispatch('logout')
    //     }
    //     throw err;
    //   });
    // });

    Axios.interceptors.response.use(response => {
      return response;
    }, error => {
      if (error.response.status === 401) {
        this.$store.dispatch('logout')
      }
      return error;
    });
  },
};
</script>