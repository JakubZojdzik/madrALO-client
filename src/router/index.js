import { createRouter, createWebHistory } from 'vue-router'
import { AccountView, ChallangesView, LoginView, RankingView, RulesView } from '../views'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'challanges',
            component: ChallangesView
        },
        {
            path: '/ranking',
            name: 'ranking',
            component: RankingView
        },
        {
            path: '/zasady',
            name: 'rules',
            component: RulesView
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
        },
        {
            path: '/profil',
            name: 'account',
            component: AccountView
        },
    ]
})

export default router
