import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      component: () => import('@/views/pages/Index'),
      children: [{
        name: 'Login',
        path: '',
        component: () => import('@/views/pages/Login')
      }]
    },
    {
      path: '/admin',
      component: () => import('@/views/dashboard/Index'),
      beforeEnter: (to, from, next) => {
        // console.log(store.state.idToken)
        if (localStorage.getItem('tokin')) {
          next()
        } else {
          next({
            name: 'Login'
          });
        }
      },
      children: [
        // Dashboard
        {
          name: 'الاحصائيات',
          path: 'dashboard',
          component: () => import('@/views/dashboard/Dashboard')
        },
        {
          name: 'المستخدمين',
          path: 'users',
          component: () => import('@/views/dashboard/users')
        },
        {
          name: 'ملفي',
          path: 'profile',
          component: () => import('@/views/dashboard/profile')
        },
        {
          name: 'الاعدادات',
          path: 'setting',
          component: () => import('@/views/dashboard/setting')
        },
      ]
    },
    {
      path: '*',
      component: () => import('@/views/pages/Index'),
      children: [{
        name: '404 Error',
        path: '',
        component: () => import('@/views/pages/Error')
      }]
    }
  ]
})
