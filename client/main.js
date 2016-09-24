import boost from 'boostjs';
// import interceptors from './interceptors.js';
// import mixins from './mixins.js';
// import routes from './routes.js';
// import Resource from 'vue-resource';
// Vue.use(Resource);
// Vue.mixin(mixins);
// Vue.use(interceptors);

import App from './components/app.vue';
import Default from './components/layouts/default.vue';
import Auth from './components/layouts/auth.vue';

import Home from './components/home.vue';
import Login from './components/login.vue';

let routes = [
    {path: '/', component: App, children: [
        {path: '', component: Default, children: [
            {path: '/home', component: Home},
            {path: '/login', component: Login},
        ]},
        {path: '', component: Auth, children: [
            {path: '/something', component: Home},
        ]},
    ]},
];
boost.start(routes, App);
