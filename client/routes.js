import Default from './components/layouts/default.vue';
import Auth from './components/layouts/auth.vue';

export default {
    '/': {
        component: Default,
        page: 'home',
    },
    '/login': {
        component: Default,
        page: 'login',
    },
    '/test-auth': {
        component: Auth,
        page: 'test-auth',
    },
    '/404': {
        component: Default,
        page: 'four-oh-four',
    },
};
