// import { createRouter, createWebHistory } from 'vue-router'
// import { session } from './data/session'
// import { userResource } from '@/data/user'

// const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: () => import('@/pages/Home.vue'),
//   },
//   {
//     name: 'Login',
//     path: '/account/login',
//     component: () => import('@/pages/Login.vue'),
//   },
//   {
//     name: 'product',
//     path: '/product/:productName',
//     component: () => import('@/pages/product.vue'),
//     props: route => ({
//       productName : route.params.productName,
//       userName : route.query.userName,
//       userId: route.query.userId,
//     }),
//   },
//   {
//     name:'ProductPage',
//     path: '/login/:userInfo',
//     component: () => import('@/pages/ProductPage.vue'),
//     props: route => ({
//       userInfo : route.params.userInfo,
//       userId : route.query.userId,
//     }),
//   },
//   {
//     name:'RegisterPage',
//     path:'/register/:register',
//     component: () => import('@/pages/RegisterPage.vue'),
//     props:true,
//   },
//   {
//     name:'FinalPage',
//     path:'/Ordered/:userInfo',
//     component:() => import('@/pages/FinalPage.vue'),
//     props: true,
//   },
// ];

// let router = createRouter({
//   history: createWebHistory('/serviceForm'),
//   routes,
// })

// router.beforeEach(async (to, from, next) => {
//   if (to.name === 'Login' && isAuthenticated()) {
//     next({ name: 'Home' });
//   } else {
//     next(); // Continue navigation
//   }
// });

// function isAuthenticated() {
//   return localStorage.getItem('token') !== null;
// }

// export default router


import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path:'/',
    redirect:'/serviceForm',
  },
  { 
    path: '/serviceForm', 
    name: 'serviceForm',
    component: () => import('@/pages/Home.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router