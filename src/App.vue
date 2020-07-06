<template>
  <div class="h-screen flex overflow-hidden bg-gray-100" @keydown.escape="toggleSidebar(false)">
    <button @click="toggleList(!open)"></button>
    <sidebar :sidebarOpen="sidebarOpen" @closeSidebar="toggleSidebar" />
    <div class="flex flex-col w-0 flex-1 overflow-hidden">
      <select-ingredients />
      <portal-target name="modals" multiple></portal-target>
      <searchbar @openSidebar="toggleSidebar" />
      <main
        class="flex-1 relative z-0 overflow-y-auto py-6 focus:outline-none"
        tabindex="0"
      >
        <div class="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import Searchbar from "@/components/Searchbar.vue";
import SelectIngredients from "@/components/recipe/SelectIngredients.vue";
import Login from "@/views/Login.vue";

export default {
  components: { 
    Sidebar, 
    Searchbar,
    SelectIngredients, 
    Login
  },
  data() {
    return {
      sidebarOpen: false
    };
  },
  computed : {
    isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
  },
  created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch(logout)
        }
        throw err;
      });
    });
  },
  methods: {
    toggleSidebar(toggleVal) {
      this.sidebarOpen = toggleVal;
    }
  }
};
</script>