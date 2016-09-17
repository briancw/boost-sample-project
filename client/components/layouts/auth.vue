<template>
    <div id="auth-container">
        <default-header></default-header>
        
        <template v-if="authed">
            <slot></slot>
        </template>
        <template v-if="!authed">
            <login></login>
        </template>

        <default-footer></default-footer>
    </div>
</template>

<script>
    import DefaultHeader from './default_header.vue';
    import DefaultFooter from './default_footer.vue';
    import Login from '../login.vue';

    export default {
        components: {
            DefaultHeader,
            DefaultFooter,
            Login,
        },
        data() {
                // I'm thinking we need to do something with the url bar in here,
                // it doesn't just change when the login component is displayed instead.

            return {
                authed: !!localStorage.token && Date.now() < localStorage.invalidationDate,
                token: localStorage.token,
            };
        },
    };
</script>
