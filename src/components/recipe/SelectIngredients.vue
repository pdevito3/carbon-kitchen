<template>
  <portal to="modals">
    <transition 
    enter-active-class="transform transition ease-in-out duration-500 sm:duration-700" 
    enter-class="transform transition translate-x-full" 
    enter-to-class="transform transition translate-x-0" 
    leave-active-class="transform transition ease-in-out duration-500 sm:duration-700" 
    leave-class="transform transition translate-x-0" 
    leave-to-class="transform transition translate-x-full"
    >
      <div 
      v-if="open"
      @keydown.escape="close()" 
      class="z-20 fixed inset-0 overflow-hidden">
        <!-- <transition 
        enter-active-class="ease-in-out duration-500" 
        enter-class="opacity-0" 
        enter-to-class="opacity-100" 
        leave-active-class="ease-in-out duration-500" 
        leave-class="opacity-100" 
        leave-to-class="opacity-0" 
        >
        </transition> -->
          <div @click="close()" class="bg-gray-500 opacity-75 absolute inset-0 overflow-hidden">
          </div>
        <section class="absolute inset-y-0 pl-16 max-w-full right-0 flex">
            <div class="w-screen max-w-md" 
            v-show="open" >
              <div class="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl">
                <div class="flex-1 h-0 overflow-y-auto">
                  <header class="space-y-1 py-6 px-4 bg-red-700 sm:px-6">
                    <div class="flex items-center justify-between space-x-3">
                      <h2 class="text-lg leading-7 font-medium text-white">
                        Add Shopping List Items
                      </h2>
                      <div class="h-7 flex items-center">
                        <button @click="close()" aria-label="Close panel" class="text-red-200 hover:text-white transition ease-in-out duration-150">
                          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div>
                      <p class="text-sm leading-5 text-red-300">
                        What Do You Want to Add to Your Shopping List?
                      </p>
                    </div>
                  </header>

                  <div class="px-4 py-3 overflow-y-auto">
                    <div class="mt-4 sm:mt-0 sm:col-span-2">
                      <div class="max-w-lg space-y-3">

                        <div 
                        v-for="ingredient in this.ingredients" 
                        :key="ingredient.ingredientId" 
                        :id="`ingredient${ingredient.ingredientId}`"
                        ref="ingredients"
                        class="relative flex items-start">
                          <div class="absolute flex items-center h-5">
                            <input ref="isChecked" :id="`checked${ingredient.ingredientId}`" checked="true" type="checkbox" class="form-checkbox h-4 w-4 text-red-600 transition duration-150 ease-in-out" />
                          </div>
                          <div class="pl-7 text-sm leading-5">
                            <label :for="`ingredient${ingredient.ingredientId}`" class="font-medium text-gray-700">{{ingredient.name}}</label>
                            <!-- <p class="text-gray-500">Get notified when someones posts a comment on a posting.</p> -->
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>

                <!-- TODO abstract these alerts out -->
                <div v-show="addedStatus == 'success'" class="rounded-md bg-green-50 p-4">
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                    <div class="ml-3">
                      <p class="text-sm leading-5 font-medium text-green-800">
                        Successfully uploaded
                      </p>
                    </div>
                    <div class="ml-auto pl-3">
                      <div class="-mx-1.5 -my-1.5">
                        <button @click="addedStatus=''" class="inline-flex rounded-md p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:bg-green-100 transition ease-in-out duration-150">
                          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-show="addedStatus == 'error'" class="rounded-md bg-red-50 p-4">
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                    <div class="ml-3">
                      <p class="text-sm leading-5 font-medium text-red-800">
                        There was an issue adding your ingredients
                      </p>
                    </div>
                    <div class="ml-auto pl-3">
                      <div class="-mx-1.5 -my-1.5">
                        <button @click="addedStatus=''" class="inline-flex rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:bg-red-100 transition ease-in-out duration-150">
                          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="flex-shrink-0 px-4 py-4 space-x-4 flex justify-end">
                  <span class="inline-flex rounded-md shadow-sm">
                    <button @click="close()" type="button" class="py-2 px-4 border border-gray-300 rounded-md text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">
                      Cancel
                    </button>
                  </span>
                  <span class="inline-flex rounded-md shadow-sm">
                    <button @click="submitIngredients()" type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition duration-150 ease-in-out">
                      Save
                    </button>
                  </span>
                </div>
              </div>
            </div>
        </section>
      </div>
    </transition>
  </portal>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ['ingredients'],
  components: { },
  data() {
    return {
      addedStatus: ""
    };
  },
  computed: {
    // use object spread operator for mapstate with vuex so we can use locally computed properties
    ...mapState({
      open: state => state.recipe.ingredientListOpen,
    }),
  },
  methods: {
    close() {
      this.$store.dispatch("setIngredientListOpen", false);
    },
    submitIngredients(){
      let ingredientsToAdd = [];
      this.$refs.isChecked.forEach((e) => {
        let isChecked = e.checked;
        
        if(isChecked){
          let id = e.id.replace('checked','');
          ingredientsToAdd.push(this.ingredients.filter((i) => {
            return i.ingredientId == id;
          })[0])
        }
      });
      
      this.$store.dispatch("addIngredientsToList",ingredientsToAdd).then( (e) => {
        let amountFulfilled = e.length;
        if(amountFulfilled != ingredientsToAdd.length){
          this.addedStatus = "error";
        }
        else{
          this.addedStatus = "success"
        }
      });
    }
  }
}
</script>

<style>

</style>