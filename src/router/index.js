import { createRouter, createWebHistory } from 'vue-router';
import { AccountView, ChallengesView, LoginView, RankingView, RulesView, ChallengeView, AddChallengeView, RegisterView, EmailInfoView, VerificationView, ThanksView } from '../views';
import { useAdmin, useLoggedIn } from '../composables';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'challenges',
            component: ChallengesView
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
            path: '/addChallenge',
            name: 'addChallenge',
            component: AddChallengeView
        },
        {
            path: '/emailInfo',
            name: 'emailInfo',
            component: EmailInfoView
        },
        {
            path: '/verification',
            name: 'verification',
            component: VerificationView
        },
        {
            path: '/thanks',
            name: 'thanks',
            component: ThanksView
        },
        {
            path: '/challenge/:id',
            name: 'challenge',
            component: ChallengeView
        }
    ]
});

router.beforeEach(async (to) => {
    if (to.name === 'profile') {
        const logged = await useLoggedIn();
        return logged;
    }
    if (to.name === 'addChallenge') {
        const admin = await useAdmin();
        return admin;
    }
    return true;
});

export default router;
