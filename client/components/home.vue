<template>
    <div class="page_container home_page">
        Home {{ foo }}<br />
        Posts: {{ posts }}
    </div>
</template>

<script>
    import store from '../vuex/store.js';
    import Boost from '../boost.js';

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
                posts: [],
            };
        },
        created() {
            let boost = new Boost();
            boost.subscribe(this, 'posts', '/posts');
        },
    };
</script>

<style lang="scss">
</style>
