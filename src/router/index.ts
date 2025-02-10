import { createRouter,createWebHistory,type RouteRecordRaw } from "vue-router";
const routes:Array<RouteRecordRaw> = [
    {
        path:'/',
        component:() => import('@/layouts/DefaultLayout.vue'),
        children:[
            {
                path:'',
                name:'Home',
                component:() => import('@/pages/Home.vue'),
            }
        ]
    }
]

const router = createRouter({
 history: createWebHistory(),
 routes, // 繫結上面定義的路由規則
})

export default router