// src/server.js
import { Server, Model, belongsTo, hasMany } from "miragejs"

export function makeServer({ environment = "development" } = {}) {
  let server = new Server({
    environment,

    models: {
      recipe: Model.extend({
        // recipeIngredientList: belongsTo()
      }),
      // recipeIngredientList: Model.extend({
      //   recipe: belongsTo(),
      //   // recipeIngredient: hasMany(),
      // }),
      recipeIngredient: Model.extend({
        // recipeIngredientList: belongsTo(),
      })
    },

    seeds(server) {
      // server.create("recipeIngredientList", {
      //   recipeIngredientListId: 1
      // })

      server.create("recipeIngredient", {
        recipeIngredientId: 1
        // , recipeIngredientListId: 1
        , amount: 1
        , unit: "package"
        , ingredient: "(20 oz) boneless skinless chicken thighs"
        , note: "patted dry"
      })
      server.create("recipeIngredient", {
        recipeIngredientId: 2
        // , recipeIngredientListId: 1
        , amount: 1
        , unit: "teaspoon"
        , ingredient: "salt"
        , note: ""
      })
      server.create("recipeIngredient", {
        recipeIngredientId: 3
        // , recipeIngredientListId: 1
        , amount: .5
        , unit: "teaspoon"
        , ingredient: "pepper"
        , note: ""
      })
      server.create("recipeIngredient", {
        recipeIngredientId: 4
        // , recipeIngredientListId: 1
        , amount: 2
        , unit: "tablespoons"
        , ingredient: "butter"
        , note: ""
      })



      server.create("recipe", {
        recipeId: 1
        , directionsId: 1
        , title: "Instant Pot® Chicken and Wild Rice Soup"
        , recipeSourceLink: "https://www.bettycrocker.com/recipes/instant-pot-chicken-and-wild-rice-soup/8f631956-26b9-4353-8605-9f52cdde99db"
        , description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, explicabo. Nostrum rerum delectus itaque. Distinctio at atque laborum hic? Dicta sequi quisquam voluptatibus labore quibusdam, iste accusamus ex aperiam voluptate!"
        , imageLink: "https://images-gmi-pmc.edge-generalmills.com/60c3ebda-50a7-415e-8c66-14f6c9b93034.jpg"
      })
      server.create("recipe", {
        recipeId: 2
        , directionsId: 2
        , title: "The Only Red Velvet Cake Recipe You’ll Ever Need"
        , recipeSourceLink: "https://www.chefsteps.com/activities/the-only-red-velvet-cake-recipe-you-ll-ever-need"
        , description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, explicabo. Nostrum rerum delectus itaque. Distinctio at atque laborum hic? Dicta sequi quisquam voluptatibus labore quibusdam, iste accusamus ex aperiam voluptate!"
        , imageLink: "https://cdn.copymethat.com/media/the_only_red_velvet_cake_recipe_youll_ev_20200214190801982058o69u7k.jpg"
      })

    },

    routes() {
      this.namespace = "api"

      this.get("/recipes", schema => {
        return schema.recipes.all()
      })


      this.get("/recipes/:id", (schema, request) => {
        let id = request.params.id

        return schema.recipes.find(id)
      })

      this.get("/recipeingredientlists/:id", (schema, request) => {
        let id = request.params.id

        return schema.ingredientLists.find(id)
      })

      this.get("/recipeingredients", schema => {
        return schema.recipeIngredients.all()
      })
    },
  })

  return server
}