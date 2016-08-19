<template>
    <div id="site_container">
        <router-view class="view" transition transition-mode="out-in">
            <template v-if="show_auth">
                <login></login>
            </template>
            <template v-if="!show_auth">
                <component :is="page"></component>
            </template>
        </router-view>
    </div>
</template>

<script>
import store from '../vuex/store.js';
import Home from './home.vue';
import Login from './login.vue';
import FourOhFour from './four_oh_four.vue';

export default {
    store: store,
    components: {
        Home,
        Login,
        FourOhFour,
    },
    data() {
        return {
            template: this.$route.template,
            page: this.$route.page,
            show_auth: false,
        };
    },
    watch: {
        $route: function() {
            this.template = (this.$route.template) ? this.$route.template : 'default';
            this.page = (this.$route.page) ? this.$route.page : 'home';
        },
    },
    created() {
    },
    methods: {
    },
};
</script>
