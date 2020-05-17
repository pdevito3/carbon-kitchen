<template>
  <div class="w-full">
      <div class="flex justify-between px-4 py-3 text-right sm:px-3">
        <h1 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate">Shopping List</h1>
        <button class="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-500 focus:outline-none focus:shadow-outline-blue focus:bg-indigo-500 active:bg-indigo-600 transition duration-150 ease-in-out">
          Add Item To Shopping List
        </button>
      </div>
      
      <div>
        {{shoppingListItems}}
      </div>

  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  components: {},
  data() {
    return {};
  },
  created() {
    this.getShoppingListItems()
  },
  computed: {
    // use object spread operator for mapstate with vuex so we can use locally computed properties
    ...mapState({
      shoppingListItems: state => state.shoppinglist.shoppingListItems,
      shoppingListItemCount: state => state.shoppinglist.shoppingListItemCount,
    }),
  },
  methods: {
    getShoppingListItems() {
      this.$store.dispatch("getShoppingListItems");
    },
    createNewShoppingListItem() {
      this.$store.dispatch("createNewBlankShoppingListItem");
    },
  }
}
</script>