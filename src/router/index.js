import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import store from '@/store/index';

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
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/login',
    props: true,
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/register',
    props: true,
    name: 'Register',
    component: () => import('../views/Register.vue'),
  }
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

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }
})

export default router;
