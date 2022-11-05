import AuthPage from '@/views/AuthPage.vue';
import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'
import { supabase } from '@/supabase/supabase.config';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/my-angkringan'
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
        redirect: '/tabs/my-angkringan'
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
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach( async (to, from, next) => {
  const { data } = await supabase.auth.getSession()
  if (to.path === "/auth/login" && data.session) {
    next({ name: "My-Angkringan" });
  } else if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !data.session
  ) {
    next({name: 'Login'});
  } else {
    next();
  }
});
export default router
