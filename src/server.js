// src/server.js
import { Server, Model } from "miragejs"

export function makeServer({ environment = "development" } = {}) {
  let server = new Server({
    environment,

    models: {
      recipe: Model,
    },

    seeds(server) {
      server.create("recipe", {
        recipeId: 1
        , title: "Instant Pot® Chicken and Wild Rice Soup"
        , recipeSourceLink: "https://www.bettycrocker.com/recipes/instant-pot-chicken-and-wild-rice-soup/8f631956-26b9-4353-8605-9f52cdde99db"
        , imageLink: "https://images-gmi-pmc.edge-generalmills.com/60c3ebda-50a7-415e-8c66-14f6c9b93034.jpg"
      })
      server.create("recipe", {
        recipeId: 2
        , title: "The Only Red Velvet Cake Recipe You’ll Ever Need"
        , recipeSourceLink: "https://www.chefsteps.com/activities/the-only-red-velvet-cake-recipe-you-ll-ever-need"
        , imageLink: "https://cdn.copymethat.com/media/the_only_red_velvet_cake_recipe_youll_ev_20200214190801982058o69u7k.jpg"
      })
    },

    routes() {
      this.namespace = "api"

      this.get("/recipes", schema => {
        return schema.recipes.all()
      })
    },
  })

  return server
}