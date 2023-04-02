import { createRouter, createWebHistory } from 'vue-router';
import { AccountView, ChallangesView, LoginView, RankingView, RulesView, ChallangeView, AddChallangeView, RegisterView, EmailInfoView } from '../views';
import { useAdmin, useLoggedIn } from '../composables';

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
            path: '/rules',
            name: 'rules',
            component: RulesView
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView
        },
        {
            path: '/profile',
            name: 'profile',
            component: AccountView
        },
        {
            path: '/addChallange',
            name: 'addChallange',
            component: AddChallangeView
        },
        {
            path: '/emailInfo',
            name: 'emailInfo',
            component: EmailInfoView
        },
        {
            path: '/challange/:id',
            name: 'challange',
            component: ChallangeView
        }
    ]
});

router.beforeEach(async (to) => {
    if (to.name === 'profile') {
        const logged = await useLoggedIn();
        return logged;
    }
    if (to.name === 'addChallange') {
        const admin = await useAdmin();
        return admin;
    }
    return true;
});

export default router;
