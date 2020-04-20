// src/server.js
import { Server, Model, belongsTo, hasMany, IdentityManager } from "miragejs"

export function makeServer({ environment = "development" } = {}) {
  let server = new Server({
    environment,

    identityManagers: {
      recipe: IdentityManager,
      ingredient: IdentityManager
    },

    models: {
      recipe: Model.extend({
        ingredient: hasMany(),
      }),
      ingredient: Model.extend({
        recipe: belongsTo(),
      }),
    },

    seeds(server) {
      server.create("recipe", {
        recipeId: 1
        , title: "Instant Pot® Chicken and Wild Rice Soup"
        , directions: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio, molestias porro. Modi error iure facilis necessitatibus dolorum nam, \n \nitaque vero harum tenetur ullam officiis quo dolor porro voluptatibus inventore laboriosam, numquam at nobis ratione cupiditate? Ipsam, illo corporis. Quae harum quasi nostrum tempore\n \nmolestias error inventore assumenda animi, adipisci nam, tempora temporibus facere deleniti voluptatum non natus fugit ipsa porro quidem eaque minus. Facilis deleniti deserunt ullam! Aut quae debitis ea iusto minus mollitia modi nisi, aperiam quam iste qui, soluta a illum. Laudantium iure id voluptas itaque minima quisquam corporis quia vel fuga, iste nostrum omnis perspiciatis facere et dolore dolorem est deserunt sit, consectetur unde dolores expedita quas vitae. Hic nobis obcaecati animi illo, sint quo. Inventore natus quae similique ullam vero cumque nostrum culpa vitae blanditiis reiciendis, soluta incidunt, nam itaque facere autem labore iure numquam veritatis fuga perferendis. Excepturi laudantium magnam sed, tempore libero aliquam tenetur ea distinctio quam voluptate, repudiandae quo hic animi neque ducimus eaque blanditiis! Recusandae nam sed saepe odit sunt! Quisquam rerum ut beatae ratione quo odit consequatur dignissimos repudiandae, doloremque distinctio, saepe aliquid adipisci! Aliquid rerum repudiandae, esse animi quaerat ex quisquam nisi odit voluptate nobis, hic velit debitis est nam? Odit, nemo labore ducimus quibusdam qui soluta quis explicabo, commodi, cum aperiam impedit eveniet voluptatibus atque neque tempora cupiditate accusantium vel consectetur mollitia. Temporibus placeat quaerat, consectetur laborum est quia? A, corporis cum voluptates dignissimos, aliquam sapiente laboriosam aut possimus excepturi tempora temporibus nemo harum id recusandae. Libero adipisci quod cumque illo ratione odio. Commodi nulla accusamus quidem repudiandae delectus ipsum dicta ut repellat quibusdam amet nihil magnam vero dignissimos rem, eaque, consequatur placeat voluptatum ullam a quo, recusandae architecto nesciunt numquam ad. Aliquid, incidunt. Rem enim sint in quibusdam, magni est necessitatibus, impedit inventore molestias repellat consectetur aspernatur error dicta dolor perferendis debitis? Voluptatibus sit optio perferendis autem similique ratione totam saepe iusto debitis, et numquam ab quibusdam dicta voluptatem asperiores reprehenderit sapiente animi eligendi. Quibusdam vitae quam quasi nemo consequuntur cumque. Sapiente illum sunt corporis est recusandae adipisci, quisquam ex nisi voluptatum doloremque illo, praesentium et molestias vel quibusdam. Enim, cupiditate aperiam nemo quidem adipisci voluptate blanditiis officiis a cum sapiente distinctio, voluptatum ullam cumque commodi aliquam! Voluptatem veniam saepe, tenetur, ex cum eos at voluptates vitae, voluptatum repellat quia. Doloribus, cumque! Sit nihil odit libero, earum distinctio repellendus laudantium voluptas ipsum soluta! Doloremque aut quo eaque at nam excepturi repellendus velit eligendi animi eveniet necessitatibus tempora voluptas, recusandae ipsum veritatis accusamus minus. Ullam at quidem beatae rerum tempora. Odio possimus eos provident repudiandae molestiae eius quidem aspernatur alias recusandae nesciunt dolorum qui facere, distinctio, delectus, aliquam temporibus odit mollitia. Sequi incidunt aliquid aut libero ipsam aliquam. Fuga ex suscipit sit, consectetur esse voluptas, dicta repudiandae quos ratione perspiciatis nisi magnam! Quo quos voluptatem mollitia similique recusandae! Similique cupiditate vero distinctio hic officia! Reprehenderit aliquam officia voluptatibus vel doloremque pariatur numquam vero expedita! Dolore libero, saepe perspiciatis inventore provident maiores sunt odit. Repellendus eos dolorem ea alias harum."
        , recipeSourceLink: "https://www.bettycrocker.com/recipes/instant-pot-chicken-and-wild-rice-soup/8f631956-26b9-4353-8605-9f52cdde99db"
        , description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, explicabo. Nostrum rerum delectus itaque. Distinctio at atque laborum hic? Dicta sequi quisquam voluptatibus labore quibusdam, iste accusamus ex aperiam voluptate!"
        , imageLink: "https://images-gmi-pmc.edge-generalmills.com/60c3ebda-50a7-415e-8c66-14f6c9b93034.jpg"
      })
      server.create("recipe", {
        recipeId: 2
        , title: "The Only Red Velvet Cake Recipe You’ll Ever Need"
        , directions: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio, molestias porro. Modi error iure facilis necessitatibus dolorum nam, \n \nitaque vero harum tenetur ullam officiis quo dolor porro voluptatibus inventore laboriosam, numquam at nobis ratione cupiditate? Ipsam, illo corporis. Quae harum quasi nostrum tempore\n \nmolestias error inventore assumenda animi, adipisci nam, tempora temporibus facere deleniti voluptatum non natus fugit ipsa porro quidem eaque minus. Facilis deleniti deserunt ullam! Aut quae debitis ea iusto minus mollitia modi nisi, aperiam quam iste qui, soluta a illum. Laudantium iure id voluptas itaque minima quisquam corporis quia vel fuga, iste nostrum omnis perspiciatis facere et dolore dolorem est deserunt sit, consectetur unde dolores expedita quas vitae. Hic nobis obcaecati animi illo, sint quo. Inventore natus quae similique ullam vero cumque nostrum culpa vitae blanditiis reiciendis, soluta incidunt, nam itaque facere autem labore iure numquam veritatis fuga perferendis. Excepturi laudantium magnam sed, tempore libero aliquam tenetur ea distinctio quam voluptate, repudiandae quo hic animi neque ducimus eaque blanditiis! Recusandae nam sed saepe odit sunt! Quisquam rerum ut beatae ratione quo odit consequatur dignissimos repudiandae, doloremque distinctio, saepe aliquid adipisci! Aliquid rerum repudiandae, esse animi quaerat ex quisquam nisi odit voluptate nobis, hic velit debitis est nam? Odit, nemo labore ducimus quibusdam qui soluta quis explicabo, commodi, cum aperiam impedit eveniet voluptatibus atque neque tempora cupiditate accusantium vel consectetur mollitia. Temporibus placeat quaerat, consectetur laborum est quia? A, corporis cum voluptates dignissimos, aliquam sapiente laboriosam aut possimus excepturi tempora temporibus nemo harum id recusandae. Libero adipisci quod cumque illo ratione odio. Commodi nulla accusamus quidem repudiandae delectus ipsum dicta ut repellat quibusdam amet nihil magnam vero dignissimos rem, eaque, consequatur placeat voluptatum ullam a quo, recusandae architecto nesciunt numquam ad. Aliquid, incidunt. Rem enim sint in quibusdam, magni est necessitatibus, impedit inventore molestias repellat consectetur aspernatur error dicta dolor perferendis debitis? Voluptatibus sit optio perferendis autem similique ratione totam saepe iusto debitis, et numquam ab quibusdam dicta voluptatem asperiores reprehenderit sapiente animi eligendi. Quibusdam vitae quam quasi nemo consequuntur cumque. Sapiente illum sunt corporis est recusandae adipisci, quisquam ex nisi voluptatum doloremque illo, praesentium et molestias vel quibusdam. Enim, cupiditate aperiam nemo quidem adipisci voluptate blanditiis officiis a cum sapiente distinctio, voluptatum ullam cumque commodi aliquam! Voluptatem veniam saepe, tenetur, ex cum eos at voluptates vitae, voluptatum repellat quia. Doloribus, cumque! Sit nihil odit libero, earum distinctio repellendus laudantium voluptas ipsum soluta! Doloremque aut quo eaque at nam excepturi repellendus velit eligendi animi eveniet necessitatibus tempora voluptas, recusandae ipsum veritatis accusamus minus. Ullam at quidem beatae rerum tempora. Odio possimus eos provident repudiandae molestiae eius quidem aspernatur alias recusandae nesciunt dolorum qui facere, distinctio, delectus, aliquam temporibus odit mollitia. Sequi incidunt aliquid aut libero ipsam aliquam. Fuga ex suscipit sit, consectetur esse voluptas, dicta repudiandae quos ratione perspiciatis nisi magnam! Quo quos voluptatem mollitia similique recusandae! Similique cupiditate vero distinctio hic officia! Reprehenderit aliquam officia voluptatibus vel doloremque pariatur numquam vero expedita! Dolore libero, saepe perspiciatis inventore provident maiores sunt odit. Repellendus eos dolorem ea alias harum."
        , recipeSourceLink: "https://www.chefsteps.com/activities/the-only-red-velvet-cake-recipe-you-ll-ever-need"
        , description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, explicabo. Nostrum rerum delectus itaque. Distinctio at atque laborum hic? Dicta sequi quisquam voluptatibus labore quibusdam, iste accusamus ex aperiam voluptate!"
        , imageLink: "https://cdn.copymethat.com/media/the_only_red_velvet_cake_recipe_youll_ev_20200214190801982058o69u7k.jpg"
      })

      server.create("ingredient", {
        ingredientId: 1
        , recipeId: 1
        , amount: 1
        , unit: "package"
        , ingredient: "(20 oz) boneless skinless chicken thighs"
        , note: "patted dry"
      })
      server.create("ingredient", {
        ingredientId: 2
        , recipeId: 1
        , amount: 1
        , unit: "teaspoon"
        , ingredient: "salt"
        , note: ""
      })
      server.create("ingredient", {
        ingredientId: 3
        , recipeId: 1
        , amount: .5
        , unit: "teaspoon"
        , ingredient: "pepper"
        , note: ""
      })
      server.create("ingredient", {
        ingredientId: 4
        , recipeId: 1
        , amount: 2
        , unit: "tablespoons"
        , ingredient: "butter"
        , note: ""
      })
      server.create("ingredient", {
        ingredientId: 5
        , recipeId: 1
        , amount: 1
        , unit: "package"
        , ingredient: "(20 oz) boneless skinless chicken thighs"
        , note: "patted dry"
      })
      server.create("ingredient", {
        ingredientId: 6
        , recipeId: 1
        , amount: 1
        , unit: "teaspoon"
        , ingredient: "salt"
        , note: ""
      })
      server.create("ingredient", {
        ingredientId: 7
        , recipeId: 1
        , amount: .5
        , unit: "teaspoon"
        , ingredient: "pepper"
        , note: ""
      })
      server.create("ingredient", {
        ingredientId: 8
        , recipeId: 1
        , amount: 2
        , unit: "tablespoons"
        , ingredient: "butter"
        , note: ""
      })

      server.create("ingredient", {
        ingredientId: 9
        , recipeId: 1
        , amount: 1
        , unit: "package"
        , ingredient: "(20 oz) boneless skinless chicken thighs"
        , note: "patted dry"
      })
      server.create("ingredient", {
        ingredientId: 10
        , recipeId: 1
        , amount: 1
        , unit: "teaspoon"
        , ingredient: "salt"
        , note: ""
      })
      server.create("ingredient", {
        ingredientId: 11
        , recipeId: 1
        , amount: .5
        , unit: "teaspoon"
        , ingredient: "pepper"
        , note: ""
      })
      server.create("ingredient", {
        ingredientId: 12
        , recipeId: 1
        , amount: 2
        , unit: "tablespoons"
        , ingredient: "butter"
        , note: ""
      })
    },

    routes() {
      this.namespace = "api"

      this.get("/recipes", schema => {
        return schema.recipes.all()
      })

      this.put("/recipe/:id", function (schema, request) {
        let id = request.params.id
        let attrs = this.normalizedRequestAttrs()
      
        return schema.recipes.find(id).update(attrs)
      })

      this.get("/recipes/:id", (schema, request) => {
        let id = request.params.id

        return schema.recipes.find(id)
      })

      this.get("/recipes/:id/ingredients", schema => {
        return schema.ingredients.all();
      })

      this.get('/ingredients', function (db, request) {
        let ingredients = [];

        if (Object.keys(request.queryParams).length === 0) {
          ingredients = db.ingredients.all();
        } else {
          let filteredRecipeId = new URLSearchParams(request.queryParams.recipeId).toString().replace('=', '');

          ingredients = db.ingredients.where({ recipeId: parseInt(filteredRecipeId) });
        }

        return ingredients;
      });

      this.post("/ingredients", (schema, request) => {
        let attrs = JSON.parse(request.requestBody)
        return schema.ingredients.create(attrs)
      })

      this.delete("/ingredients/:id", (schema, request) => {
        let id = request.params.id
        console.log('delete id:', id)

        return schema.ingredients.find(id).destroy()
      })
    },
  });

  return server
}