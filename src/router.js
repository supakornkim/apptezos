import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import i18n from './i18n'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/en',
    },
    {
      path: '/:lang',
      name: 'home',
      component: Home
    },

  ]
})

router.beforeEach((to, from, next) => {
  const lang = to.params.lang;
  i18n.locale = lang
  return next();
})

export default router
