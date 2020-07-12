import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect:  '/myrecipes',
  },
  {
    path: '/myrecipes',
    name: 'MyRecipes',
    meta: { 
      layout: 'app-layout', 
    },
    component: () => import('../views/MyRecipes.vue'),
  },
  {
    path: '/myrecipes/recipe/:id',
    props: true,
    name: 'Recipe',
    meta: { 
      layout: 'app-layout', 
    },
    component: () => import('../views/Recipe.vue'),
  },
  {
    path: '/shoppinglist',
    props: true,
    name: 'ShoppingList',
    meta: { 
      layout: 'app-layout', 
    },
    component: () => import('../views/ShoppingList.vue'),
  },
  {
    path: '/login',
    props: true,
    name: 'Login',
    meta: { 
      layout: 'empty-layout', 
      publicPage: true
    },
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/register',
    props: true,
    name: 'Register',
    meta: { 
      layout: 'empty-layout', 
      publicPage: true
    },
    component: () => import('../views/Register.vue'),
  },
  {
    path: '*',
    props: true,
    name: '404',
    meta: { 
      layout: 'empty-layout', 
      publicPage: true
    },
    component: () => import('@/views/404.vue'),
  }
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  // if(to.matched.some(record => record.meta.requiresAuth)) {
  //   if (store.getters.isLoggedIn) {
  //     next()
  //     return
  //   }
  //   next('/login') 
  // } else {
  //   next() 
  // }
  
  // const authRequired = !publicPages.includes(to.path);
  // const loggedIn = localStorage.getItem('user');

  const publicPage = to.meta.publicPage ?? false;
  const loggedIn = store.getters.isLoggedIn;
  console.log('usertoken',store.getters.user.token)
  console.log('loggedIn',loggedIn)
  if (!publicPage && !loggedIn) {
    return next('/login');
  }
  
  next();
})

export default router;
