<template>
  <div>{{this.recipe}}</div>
</template>


<script>
export default {
  components: {},
  data() {
    return {
      recipe: []
    };
  },

  created() {
    fetch("/api/recipes/1")
      .then(res => res.json())
      .then(json => {
        this.recipe = json.recipe;
      });
  }
};
</script>

<style>
</style>