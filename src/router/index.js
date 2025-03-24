import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: () => import('@/views/login/Login.vue')
    },
    {
        path: '/adminLogin',
        component: () => import('@/views/login/AdminLogin.vue')
    },
    {
        path: '/aHomepage',
        component: () => import('@/views/homepage/AdminHomePage.vue'),
        redirect: '/mainPage',  // 重定向
        children: [
            {
                path: '/mainPage',
                component: () => import('@/views/homepage/admin/MainPage.vue')
            },
            {
                path: '/userManagement',
                component: () => import('@/views/homepage/admin/UserManagement.vue')
            },
            {
                path: '/electricityManage',
                component: () => import('@/views/homepage/admin/electricity/ElectricityManage.vue')
            },
            {
                path: '/electricityBill',
                component: () => import('@/views/homepage/admin/electricity/ElectricityBill.vue')
            },
            {
                  path: '/waterManage',
                component: () => import('@/views/homepage/admin/water/WaterManage.vue')
            },
            {
                path: '/waterBill',
                component: () => import('@/views/homepage/admin/water/WaterBill.vue')
            },
            {
                path: '/noticeManage',
                component: () => import('@/views/homepage/admin/NoticeManage.vue')
            },
            {
                path: '/statistics',
                component: () => import('@/views/homepage/admin/Statistics.vue')
            },
        ]
    },
    {
        path: '/uHomepage',
        component: () => import('@/views/homepage/UserHomePage.vue'),
        redirect: '/uMainPage',
        children: [
            {
                path: '/uMainPage',
                component: () => import('@/views/homepage/user/UMainPage.vue')
            },
            {
                path: '/uStatistics',
                component: () => import('@/views/homepage/user/UStatistics.vue')
            },
            {
                path: '/uNotice',
                component: () => import('@/views/homepage/user/UNotice.vue')
            }
        ]
    },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
