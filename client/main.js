import Vue from 'vue';
import Router from 'vue-router';
import Resource from 'vue-resource';
import mixins from './mixins.js';
import interceptors from './interceptors.js';
import routes from './routes.js';
import App from './components/app.vue';

Vue.use(Router);
Vue.use(Resource);
Vue.mixin(mixins);
Vue.use(interceptors);

const router = new Router({history: true});
router.map(routes);

router.beforeEach(function(transition) {
    window.scrollTo(0, 0);
    if (!transition.to.matched) {
        transition.redirect('/404');
    }

    transition.next();
});

router.start(App, '#app');
