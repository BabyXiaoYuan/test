import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/HomeVisit',
    name: 'HomeVisit',
    component: () => import('../views/HomeVisit/HomeVisit.vue'),
    children: [
      {
        path: '/FkView',
        name: 'FkView',
        component: () => import('../views/FangKe/FkView.vue')
      },
      {
        path: '/FKDetails',
        name: 'FKDetails',
        component: () => import('../views/FangKe/FKDetails.vue')
      },
      {
        path: '/FkAdd',
        name: 'FkAdd',
        component: () => import('../views/FangKe/FkAdd.vue')
      },
      {
        path: '/CancelView',
        name: 'CancelView',
        component: () => import('../views/FangKe/CancelView.vue')
      },
      {
        path: '/CancelAdd',
        name: 'CancelAdd',
        component: () => import('../views/FangKe/CancelAdd.vue')
      },
      {
        path: '/CancelUpd',
        name: 'CancelUpd',
        component: () => import('../views/FangKe/CancelUpd.vue')
      },
      {
        path: '/SchoolView',
        name: 'SchoolView',
        component: () => import('../views/FangKe/SchoolView.vue')
      },
      {
        path: '/SchoolDetails',
        name: 'SchoolDetails',
        component: () => import('../views/FangKe/SchoolDetails.vue')
      },
      {
        path: '/SchoolAdd',
        name: 'SchoolAdd',
        component: () => import('../views/FangKe/SchoolAdd.vue')
      },
      {
        path: '/CheckView',
        name: 'CheckView',
        component: () => import('../views/FangKe/CheckView.vue')
      },
      {
        path: '/ChargeView',
        name: 'ChargeView',
        component: () => import('../views/FangKe/ChargeView.vue')
      },
      {
        path: '/TrackView',
        name: 'TrackView',
        component: () => import('../views/XingCheng/TrackView.vue')
      },
      {
        path: '/PointView',
        name: 'PointView',
        component: () => import('../views/XingCheng/PointView.vue')
      },
      {
        path: '/PointAdd',
        name: 'PointAdd',
        component: () => import('../views/XingCheng/PointAdd.vue')
      },
      {
        path: '/PointUpdata',
        name: 'PointUpdata',
        component: () => import('../views/XingCheng/PointUpdata.vue')
      },
      {
        path: '/CheckDetails',
        name: 'CheckDetails',
        component: () => import('../views/FangKe/CheckDetails.vue')
      },
      {
        path: '/AdminView',
        name: 'AdminView',
        component: () => import('../views/QuanXian/AdminView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
