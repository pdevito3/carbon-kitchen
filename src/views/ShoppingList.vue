<template>
  <div class="w-full">
    <div class="sm:flex sm:justify-between px-1 py-3 text-center sm:px-3">
      <h1 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate">Shopping List</h1>
      <button 
        @click="toggleModal()" 
        class="w-full sm:w-auto mt-3 sm:mt-0 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 shadow-sm hover:bg-red-500 focus:outline-none focus:shadow-outline-blue focus:bg-red-500 active:bg-red-600 transition duration-150 ease-in-out">
        Add Items To Shopping List
      </button>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 row-gap-8">
      <div v-for="(category, index) in groupedNonAcquiredIngredients" :key="index">
        <h2 class="p-2 bg-gray-300 opacity-75 text-gray-800 shadow rounded-md font-semibold">{{category[0].category}}</h2>
        <div class="px-2">
          <ul>
            <li class="pt-4" v-for="item in category" :key="item.shoppingListItemId">
              <label :for="'acquired' + item.shoppingListItemId" class="flex items-center rounded shadow px-4 py-2 cursor-pointer">
                <div class="absolute flex items-center h-5">
                  <input @change="toggleItemAcquisition(item)" :id="'acquired' + item.shoppingListItemId" type="checkbox" v-model="item.acquired" class="form-checkbox h-4 w-4 text-red-600 transition duration-150 ease-in-out" />
                </div>
                <div class="pl-7 text-md leading-7">
                  <p class="font-medium text-gray-700 select-none">{{item.amount}} {{item.unit}} {{item.name}}</p>
                </div>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="mt-8">
      <div>
        <!-- v-show to account for loading -->
        <div v-show="aquiredShoppingListItemsCount > 0" class="flex items-center justify-between">
          <h2 class="text-xl font-bold leading-5 text-gray-900 sm:text-2xl sm:leading-7 sm:truncate">Acquired Items</h2>
          <button @click="hideAcquired()" type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-50 focus:outline-none focus:border-red-300 focus:shadow-outline-red active:bg-red-200 transition ease-in-out duration-150">
            Hide Acquired
          </button>
        </div>
        <div class="grid grid-cols-3 gap-8 row-gap-8">
          <ul>
            <li class="pt-4" v-for="item in aquiredShoppingListItems" :key="item.id">
              <label :for="'acquired' + item.shoppingListItemId" class="flex items-center rounded shadow px-4 py-2 cursor-pointer">
                <div class="absolute flex items-center h-5">
                  <input @change="toggleItemAcquisition(item)" :id="'acquired' + item.shoppingListItemId" type="checkbox" v-model="item.acquired" class="form-checkbox h-4 w-4 text-red-600 transition duration-150 ease-in-out" />
                </div>
                <div class="pl-7 text-md leading-7">
                  <p class="font-medium text-gray-700 select-none">{{item.amount}} {{item.unit}} {{item.name}}</p>
                </div>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <AddShoppingListItems ref="shoppingListModal" />

  </div>
</template>

<script>
import { mapState } from "vuex";
import AddShoppingListItems from "@/components/shoppinglist/AddShoppingListItems.vue";
import groupBy from "lodash/groupBy"

export default {
  components: {
    AddShoppingListItems
  },
  data() {
    return {
      addIngredientModalIsOpen: false
    };
  },
  created() {
    this.getNonAcquiredShoppingListItems();
    this.getAcquiredShoppingListItems();
  },
  computed: {
    // use object spread operator for mapstate with vuex so we can use locally computed properties
    ...mapState({
      nonAquiredShoppingListItems: state => state.shoppinglist.nonAquiredShoppingListItems,
      aquiredShoppingListItems: state => state.shoppinglist.aquiredShoppingListItems,
      // aquiredShoppingListItemsCount: state => state.shoppinglist.aquiredShoppingListItemsCount,
    }),
    groupedNonAcquiredIngredients() {
      return groupBy(this.nonAquiredShoppingListItems,'category');
    },
    aquiredShoppingListItemsCount() {
      return this.aquiredShoppingListItems.length;
    }
  },
  methods: {
    getNonAcquiredShoppingListItems() {
      this.$store.dispatch("getNonAcquiredShoppingListItems");
    },
    getAcquiredShoppingListItems() {
      this.$store.dispatch("getAcquiredShoppingListItems");
    },
    toggleItemAcquisition(item) {
      this.$store.dispatch("toggleItemAcquisition", { itemId: item.shoppingListItemId, acquired: item.acquired });
    },
    toggleModal() {
      this.$store.dispatch("toggleShoppingListItemModal"); 

      // this is a code smell... shouldn't have this here. should be on the addshoppionglistitems.vue 
      // component, but when i tried doing it on `upddated` it debounces, even when using lodash.debouce... really annoying
      // doesn't even work from sidebar because i can't have the modal there
      this.$refs.shoppingListModal.$refs.ingredientList.selectIngredientRow(); 
    },
    hideAcquired() {
      this.$store.dispatch("hideAcquiredItems");
    }
  }
}
</script>