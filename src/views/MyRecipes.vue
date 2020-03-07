<template>
  <div>
    <div class="max-w-7xl mx-auto px-4 md:px-8">
      <h1 class="text-2xl font-semibold text-gray-900">My Recipes</h1>
    </div>

    <div class="mt-5 bg-white shadow overflow-hidden sm:rounded-md md:mx-8">
      <ul>
        <li>
          <a
            href="#"
            class="group block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
          >
            <div class="pr-4 md:pr-6 flex items-center">
              <div class="min-w-0 flex-1 flex items-center">
                <div class="flex-shrink-0">
                  <img
                    class="h-24 w-24 object-cover"
                    src="https://images-gmi-pmc.edge-generalmills.com/60c3ebda-50a7-415e-8c66-14f6c9b93034.jpg"
                    alt
                  />
                </div>
                <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                  <div>
                    <div
                      class="font-semibold text-gray-600 truncate group-hover:text-red-500"
                    >Instant Pot® Chicken and Wild Rice Soup</div>
                    <div class="mt-2 flex items-center sm:text-sm sm:leading-5 text-gray-500">
                      <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        class="w-4 h-4 text-gray-400 flex-shrink-0"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                        />
                      </svg>
                      <span
                        class="pl-1 truncate"
                      >https://www.bettycrocker.com/recipes/instant-pot-chicken-and-wild-rice-soup/8f631956-26b9-4353-8605-9f52cdde99db</span>
                    </div>
                  </div>
                  <div class="hidden md:block">
                    <!-- could add some stuff in here later. maybe macros? -->

                    <!-- <div>
                      <div class="text-sm leading-5 text-gray-900">
                        Applied on
                        <time datetime="2020-01-07">January 7, 2020</time>
                      </div>
                      <div class="mt-2 flex items-center text-sm leading-5 text-gray-500">
                        <svg
                          class="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        Completed phone screening
                      </div>
                    </div>-->
                  </div>
                </div>
              </div>
              <popper
                trigger="clickToToggle"
                :options="{
                  placement: 'right-start',
                  modifiers: { offset: { offset: '10px,10px' } }
                }"
              >
                <div class="py-1 rounded-md bg-white shadow">
                  <button
                    class="flex block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition ease-in-out duration-150"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      class="w-6 h-6 icon-folder-add"
                    >
                      <path
                        class="fill-current text-gray-300"
                        d="M4 4h7l2 2h7a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2z"
                      />
                      <rect
                        width="20"
                        height="12"
                        x="2"
                        y="8"
                        class="fill-current text-gray-800"
                        rx="2"
                      />
                      <path
                        class="fill-current text-gray-300"
                        d="M13 13h2a1 1 0 0 1 0 2h-2v2a1 1 0 0 1-2 0v-2H9a1 1 0 0 1 0-2h2v-2a1 1 0 0 1 2 0v2z"
                      />
                    </svg>
                    <span class="pl-2">Add to Meal Plan</span>
                  </button>
                  <button
                    class="flex block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition ease-in-out duration-150"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      class="w-6 h-6 icon-shopping-cart"
                    >
                      <path
                        class="fill-current text-gray-300"
                        d="M7 4h14a1 1 0 0 1 .9 1.45l-4 8a1 1 0 0 1-.9.55H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"
                      />
                      <path
                        class="fill-current text-gray-800"
                        d="M17.73 19a2 2 0 1 1-3.46 0H8.73a2 2 0 1 1-3.42-.08A3 3 0 0 1 5 13.17V4H3a1 1 0 1 1 0-2h3a1 1 0 0 1 1 1v10h11a1 1 0 0 1 0 2H6a1 1 0 0 0 0 2h12a1 1 0 0 1 0 2h-.27z"
                      />
                    </svg>
                    <span class="pl-2">Add to Shopping List</span>
                  </button>
                </div>

                <button slot="reference">
                  <svg class="w-6 h-6 text-gray-400" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      stroke-width="2"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </popper>
            </div>
          </a>
        </li>
      </ul>
    </div>

    <!-- this could be the grid version -->

    <!-- <div class="px-4 mt-5 grid sm:grid-cols-2 sm:gap-2">
      <div class="sm:mt-0 sm:w-72 sm:flex-shrink-0">
        <div>
          <div class="relative pb-5/6">
            <img
              src="https://images.unsplash.com/photo-1471231681582-352356ab45a0?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80"
              alt
              class="absolute inset-0 h-full w-full rounded-t-md shadow-md object-cover"
            />
          </div>
          <div class="relative">
            <div class="bg-white rounded-b-md px-4 py-4 shadow-lg"></div>
          </div>
        </div>
      </div>
    </div>-->
  </div>
</template>

<script>
import Popper from "vue-popperjs";
import "vue-popperjs/dist/vue-popper.css";
export default {
  components: {
    popper: Popper
  }
};
</script>

<style>
</style>