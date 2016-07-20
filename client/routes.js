import Default from './components/layouts/default.vue';

export default {
    '/': {
        component: Default,
        page: 'home',
    },
    '/404': {
        component: Default,
        page: 'four-oh-four',
    },
};
