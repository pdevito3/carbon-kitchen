<template>
  <div :is="layout">
    <router-view />
  </div>
</template>

<script>

export default {
  computed : {
    isLoggedIn : function(){ return this.$store.getters.isLoggedIn},
    layout() {
      return this.$route.meta.layout ?? "app-layout";
    }
  },
  created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch('logout')
        }
        throw err;
      });
    });
  },
};
</script>