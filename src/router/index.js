import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/myrecipes',
    name: 'MyRecipes',
    component: () => import(/* webpackChunkName: "about" */ '../views/MyRecipes.vue'),
  },
  {
    path: '/myrecipes/recipe/:id',
    props: true,
    name: 'Recipe',
    component: () => import('../views/Recipe.vue'),
  },
  {
    path: '/shoppinglist',
    props: true,
    name: 'ShoppingList',
    component: () => import('../views/ShoppingList.vue'),
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
