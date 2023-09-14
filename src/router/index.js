import { createRouter, createWebHistory } from 'vue-router';
import {
    AccountView,
    ChallengesView,
    LoginView,
    RankingView,
    RulesView,
    ChallengeView,
    AddChallengeView,
    RegisterView,
    EmailInfoView,
    VerificationView,
    ThanksView,
    ForgotView,
    PassVerifyView,
    AnnouncementsView,
    AddAnnouncementView,
    NotFoundView,
    EditChallengeView,
    EditAnnouncementView,
    SubmitsView,
    EditCompetitionView
} from '../views';
import { useAdmin, useLoggedIn } from '../composables';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/challenges',
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
            path: '/challenge/:id',
            name: 'challenge',
            component: ChallengeView
        },
        {
            path: '/addChallenge',
            name: 'addChallenge',
            component: AddChallengeView
        },
        {
            path: '/editChallenge/:id',
            name: 'editChallenge',
            component: EditChallengeView
        },
        {
            path: '/',
            name: 'announcements',
            component: AnnouncementsView
        },
        {
            path: '/addAnnouncement',
            name: 'addAnnouncement',
            component: AddAnnouncementView
        },
        {
            path: '/editAnnouncement/:id',
            name: 'editAnnouncement',
            component: EditAnnouncementView
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
            path: '/forgot',
            name: 'forgot',
            component: ForgotView
        },
        {
            path: '/passChange',
            name: 'passChange',
            component: PassVerifyView
        },
        {
            path: '/submits',
            name: 'submits',
            component: SubmitsView
        },
        {
            path: '/editCompetition',
            name: 'editCompetition',
            component: EditCompetitionView
        },
        {
            path: "/:catchAll(.*)",
            name: 'notFound',
            component: NotFoundView
        }
    ]
});

router.beforeEach(async (to) => {
    if (['profile'].includes(to.name)) {
        if (!await useLoggedIn()) {
            return '/';
        }
    }
    if (['addChallenge', 'addAnouncement', 'editChallenge', 'editAnnouncement', 'editCompetition'].includes(to.name)) {
        if (!await useAdmin()) {
            return '/';
        }
    }
    if (to.name === 'login') {
        if (await useLoggedIn()) {
            return '/profile';
        }
    }
    return true;
});

export default router;
