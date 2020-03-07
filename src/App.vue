<template>
  <!-- @keydown.window.escape="sidebarOpen = false" -->
  <div class="h-screen flex overflow-hidden bg-gray-100" x-data="{ sidebarOpen: false }">
    <sidebar :sidebarOpen="sidebarOpen" @closeSidebar="toggleSidebar" />
    <div class="flex flex-col w-0 flex-1 overflow-hidden">
      <searchbar @openSidebar="toggleSidebar" />
      <main
        class="flex-1 relative z-0 overflow-y-auto py-6 focus:outline-none"
        tabindex="0"
        x-data
        x-init="$el.focus()"
      >
        <router-view />
        <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8"></div>
      </main>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import Searchbar from "@/components/Searchbar.vue";

export default {
  components: { Sidebar, Searchbar },
  data() {
    return {
      sidebarOpen: false,
      open: false
    };
  },
  methods: {
    toggleSidebar(toggleVal) {
      this.sidebarOpen = toggleVal;
    }
  }
};
</script>