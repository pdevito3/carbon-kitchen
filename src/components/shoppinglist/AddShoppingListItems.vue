<template>
  <div> 
    <div v-show="addShoppingListItemsModalOpen" class="fixed bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center">
      <div v-show="addShoppingListItemsModalOpen" 
        x-transition:enter="ease-out duration-300" 
        x-transition:enter-start="opacity-0" 
        x-transition:enter-end="opacity-100" 
        x-transition:leave="ease-in duration-200" 
        x-transition:leave-start="opacity-100" 
        x-transition:leave-end="opacity-0" class="fixed inset-0 transition-opacity">
        <div @click="toggleModal()" class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <div v-show="addShoppingListItemsModalOpen" 
        class="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:p-3" 
        x-transition:enter="ease-out duration-300" 
        x-transition:enter-start="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" 
        x-transition:enter-end="opacity-100 translate-y-0 sm:scale-100" 
        x-transition:leave="ease-in duration-200" 
        x-transition:leave-start="opacity-100 translate-y-0 sm:scale-100" 
        x-transition:leave-end="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="modal-headline">
          <div>
            <div class="flex justify-end">
              <button class="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100">
                <svg @click="toggleModal()" class="h-5 w-5 text-gray-600" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
                </svg>
              </button>
            </div>
            <div class="px-0 sm:px-2 mt-4 sm:mt-5">  
              <IngredientList 
                ref="ingredientList"
                :ingredientList=ingredientList
                @updateIngredients="updateIngredients"
                @enterPressed="submitList" />
            </div>
          </div>
          <div class="mt-5 sm:mt-6">
          <span class="flex w-full rounded-md shadow-sm">
            <button @click="submitList()" type="button" class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5">
              Add To Shopping List
            </button>
          </span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import IngredientList from "@/components/global/IngredientList.vue";

export default {
  props: ["open"],
  components: {
    IngredientList
  },
  data() {
    return {
      ingredientList: [{}]
    };
  },
  computed: {
    // use object spread operator for mapstate with vuex so we can use locally computed properties
    ...mapState({
      addShoppingListItemsModalOpen: state => state.shoppinglist.addShoppingListItemsModalOpen,
    })
  },
  methods: {
    updateIngredients(newList) {
      this.ingredientList = newList;
    },
    toggleModal() {
      this.$store.dispatch("toggleShoppingListItemModal");     
    },
    submitList(){
      this.toggleModal();
      this.$store.dispatch("addIngredientsToList",this.ingredientList);
      this.updateIngredients([{}]);
    }
  }
}
</script>

<style>

</style>