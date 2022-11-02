import AuthPage from '@/views/AuthPage.vue';
import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/home'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        redirect: '/tabs/home'
      },
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/Home/Tab1Page.vue')
      },
      {
        path: 'my-angkringan',
        name: 'My-Angkringan',
        component: () => import('@/views/myAngkringan/Tab2Page.vue')
      },
      {
        path: 'pos',
        name: 'PointOfSales',
        component: () => import('@/views/pointOfSales/Tab3Page.vue')
      }
    ]
  },
  {
    path: '/auth/',
    redirect: '/auth/login',
    component: AuthPage,
    children: [
      {
        path: '',
        redirect: '/auth/login' 
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/Auth/LoginPage.vue')
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/Auth/RegisterPage.vue')
      },
      {
        path: 'account',
        name: 'Account',
        meta: {
          requiresAuth: true
        },
        component: () => import('@/views/Auth/profileAccountPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem("user");
  if (to.path === "/auth/login" && loggedIn) {
    next({ name: "Home" });
  } else if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !loggedIn
  ) {
    next({name: 'Login'});
  } else {
    next();
  }
});
export default router
