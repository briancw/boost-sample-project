<template>
    <div id="auth_container">
        <default-header></default-header>
        <router-view></router-view>
        <default-footer></default-footer>
    </div>
</template>

<script>
    import DefaultHeader from './default_header.vue';
    import DefaultFooter from './default_footer.vue';

    export default {
        components: {
            DefaultHeader,
            DefaultFooter,
        },
        // watch: {
        //     $route: function() {
        //     //     this.template = (this.$route.template) ? this.$route.template : 'default';
        //         this.page = (this.$route.page) ? this.$route.page : 'home';
        //         console.log(this.page);
        //     },
        // },
    };
</script>
