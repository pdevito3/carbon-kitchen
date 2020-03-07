<template>
  <!-- still needs @keydown.window.escape="sidebarOpen = false" -->
  <div class="h-screen flex overflow-hidden bg-gray-100">
    <!-- Off-canvas menu for mobile -->
    <div class="md:hidden">
      <div
        @click="closeSidebar()"
        class="fixed inset-0 z-30 bg-gray-600 opacity-0 pointer-events-none transition-opacity ease-linear duration-300"
        :class="{'opacity-75 pointer-events-auto': sidebarOpen, 'opacity-0 pointer-events-none': !sidebarOpen}"
      ></div>

      <!-- 
        this was on class, but I needed to take it off for it to work
      -translate-x-full-->
      <div
        class="fixed inset-y-0 left-0 flex flex-col z-40 max-w-xs w-full pt-5 pb-4 bg-red-800 transform ease-in-out duration-300"
        :class="{'translate-x-0': sidebarOpen, '-translate-x-full': !sidebarOpen}"
      >
        <div class="absolute top-0 right-0 -mr-14 p-1">
          <button
            v-show="sidebarOpen"
            @click="closeSidebar()"
            class="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600"
          >
            <svg class="h-6 w-6 text-white" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div class="flex-shrink-0 flex items-center px-4">
          <img class="h-8 w-auto" src="/img/logos/workflow-logo-on-brand.svg" alt="Workflow" />
        </div>
        <div class="mt-5 flex-1 h-0 overflow-y-auto">
          <nav class="px-2">
            <a
              href="#"
              class="group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-white bg-red-900 focus:outline-none focus:bg-red-700 transition ease-in-out duration-150"
            >
              <svg
                class="mr-4 h-6 w-6 text-red-400 group-hover:text-red-300 group-focus:text-red-300 transition ease-in-out duration-150"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10M9 21h6"
                />
              </svg>
              Dashboard
            </a>
            <a
              href="#"
              class="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-red-300 hover:text-white hover:bg-red-700 focus:outline-none focus:text-white focus:bg-red-700 transition ease-in-out duration-150"
            >
              <svg
                class="mr-4 h-6 w-6 text-red-400 group-hover:text-red-300 group-focus:text-red-300 transition ease-in-out duration-150"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Team
            </a>
          </nav>
        </div>
      </div>
    </div>
    <!-- Static sidebar for desktop -->
    <div class="hidden md:flex md:flex-shrink-0">
      <div class="flex flex-col w-64 bg-red-800 pt-5 pb-4">
        <div class="flex items-center flex-shrink-0 px-4">
          <img class="h-8 w-auto" src="/img/logos/workflow-logo-on-brand.svg" alt="Workflow" />
        </div>
        <div class="mt-5 h-0 flex-1 flex flex-col overflow-y-auto">
          <!-- Sidebar component, swap this element with another sidebar if you like -->
          <nav class="flex-1 px-2 bg-red-800">
            <a
              href="#"
              class="group flex items-center px-2 py-2 text-sm leading-5 font-medium text-white rounded-md bg-red-900 focus:outline-none focus:bg-red-700 transition ease-in-out duration-150"
            >
              <svg
                class="mr-3 h-6 w-6 text-red-400 group-focus:text-red-300 transition ease-in-out duration-150"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10M9 21h6"
                />
              </svg>
              Dashboard
            </a>

            <a
              href="#"
              class="mt-1 group flex items-center px-2 py-2 text-sm leading-5 font-medium text-red-300 rounded-md hover:text-white hover:bg-red-700 focus:outline-none focus:text-white focus:bg-red-700 transition ease-in-out duration-150"
            >
              <svg
                class="mr-3 h-6 w-6 text-red-400 group-hover:text-red-300 group-focus:text-red-300 transition ease-in-out duration-150"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Team
            </a>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["sidebarOpen"],
  data() {
    return {
      // sidebarOpen: false
    };
  },
  methods: {
    closeSidebar() {
      this.$emit("closeSidebar", false);
    }
  }
};
</script>

<style>
</style>