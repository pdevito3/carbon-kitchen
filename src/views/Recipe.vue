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
    let id = this.$route.params.id;

    fetch(`/api/recipes/${id}`)
      .then(res => res.json())
      .then(json => {
        this.recipe = json.recipe;
      });
  }
};
</script>

<style>
</style>