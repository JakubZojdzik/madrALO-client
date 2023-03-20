import { createRouter, createWebHistory } from 'vue-router';
import { AccountView, ChallangesView, LoginView, RankingView, RulesView } from '../views';
import { useLoggedIn } from '../composables/useLoggedIn';

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
            name: 'profile',
            component: AccountView
        }
    ]
});

router.beforeEach(async (to) => {
    if (to.name === 'profile') {
        useLoggedIn().then((res) => {
            if (!res) return { name: 'login' };
            else return true;
        });
    }
});

export default router;
