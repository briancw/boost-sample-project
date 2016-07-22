<template>
    <div class="page_container home_page">
        Home {{ foo }}<br />
        Posts: {{ posts.data }}
    </div>
</template>

<script>
    import store from '../vuex/store.js';
    import boost from '../boost.js';

    export default {
        name: 'home',
        store: store,
        vuex: {
            getters: {
                foo: state => state.foo,
            },
        },
        data() {
            return {
                posts: boost.subscribe('/posts'),
            };
        },
        created() {
        },
    };
</script>

<style lang="scss">
</style>
