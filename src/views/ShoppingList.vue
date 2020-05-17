<template>
  <div class="w-full">
      <div class="flex justify-between px-4 py-3 text-right sm:px-3">
        <h1 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate">Shopping List</h1>
        <button class="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 shadow-sm hover:bg-red-500 focus:outline-none focus:shadow-outline-blue focus:bg-red-500 active:bg-red-600 transition duration-150 ease-in-out">
          Add Item To Shopping List
        </button>
      </div>
      
      <div class="grid grid-cols-2 gap-4">
        <div>
          <div class="p-2 bg-gray-300 text-gray-800 shadow rounded-md font-semibold">Produce</div>
          <div class="px-2">
            <ul>
              <li v-for="item in shoppingListItems" :key="item.shoppingListItemId" class="pt-4">
                <div class="flex items-center rounded shadow-md px-4 py-2">
                  <div class="absolute flex items-center h-5">
                    <input id="acquired" type="checkbox" v-model="item.acquired" class="form-checkbox h-4 w-4 text-red-600 transition duration-150 ease-in-out" />
                  </div>
                  <div class="pl-7 text-md leading-7">
                    <p class="font-medium text-gray-700">{{item.amount}} {{item.name}}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
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
    groupedShoppingListItems(){      
      function groupBy(list, keyGetter) {
          const map = new Map();
          list.forEach((item) => {
              const key = keyGetter(item);
              const collection = map.get(key);
              if (!collection) {
                  map.set(key, [item]);
              } else {
                  collection.push(item);
              }
          });
          return map;
      }

      const grouped = groupBy(this.shoppingListItems, item => item.shoppingListId);
      return grouped;
    }
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