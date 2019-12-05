import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () =>
        import(
          /* webpackChunkName: "chunk-home" */
          /* webpackMode: "lazy" */
          '../views/home.vue'
        )
    },
    {
      path: '/category',
      name: 'category',
      component: () =>
        import(
          /* webpackChunkName: "chunk-category" */
          /* webpackMode: "lazy" */
          '../views/category.vue'
        )
    },
    {
      path: '/shopcart',
      name: 'shopcart',
      component: () =>
        import(
          /* webpackChunkName: "chunk-shopcart" */
          /* webpackMode: "lazy" */
          '../views/shopcart.vue'
        )
    },
    {
      path: '/user',
      name: 'user',
      component: () =>
        import(
          /* webpackChunkName: "chunk-user" */
          /* webpackMode: "lazy" */
          '../views/user.vue'
        )
    }
  ]
})
