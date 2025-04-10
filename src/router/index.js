import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { 
    path: '/', 
    name: 'home',
    component: () => import('../pages/Home.vue') 
  },
  { 
    path: '/login', 
    name: 'login',
    component: () => import('../pages/Login.vue'),
    meta: { guestOnly: true } 
  },
  {
    path: '/dashboard',
    component: () => import('../components/auth/LayoutAuth.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('../pages/auth/Dashboard.vue'),
        meta: { title: 'Dashboard' }
      },
      {
        path: 'visi-misi',
        name: 'dashboard.visi-misi',
        component: () => import('../pages/auth/VisiMisi.vue'),
        meta: { title: 'Profile' },
      },
      {
        path : 'visi-misi/edit',
        name : 'visi-misi.edit',
        component: () => import('../pages/auth/VisiMisiEdit.vue'),
      },
      {
        path: 'profile',
        name: 'dashboard.profile',
        component: () => import('../pages/auth/Profile.vue'),
        meta: { title: 'Profile' }
      },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../pages/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token')
  const authRequired = to.matched.some(record => record.meta.requiresAuth)
  const guestOnly = to.matched.some(record => record.meta.guestOnly)

  // Redirect jika perlu auth tapi tidak login
  if (authRequired && !isAuthenticated) {
    return next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }

  // Redirect jika sudah login tapi mengakses halaman guest only
  if (guestOnly && isAuthenticated) {
    return next('/dashboard')
  }

  // Set document title
  if (to.meta.title) {
    document.title = `${to.meta.title} | My App`
  }

  next()
})

export default router