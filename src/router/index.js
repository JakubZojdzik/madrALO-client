import { createRouter, createWebHistory } from 'vue-router';
import { AccountView, ChallangesView, LoginView, RankingView, RulesView, ChallangeView } from '../views';
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
        },
        {
            path: '/challange/:id',
            name: 'challange',
            component: ChallangeView
        }
    ]
});

router.beforeEach(async (to) => {
    let logged = false;
    if (to.name === 'profile') {
        logged = await useLoggedIn();
        return logged;
    }
    return true;
});

export default router;
