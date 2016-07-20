<template>
    <div class="page_container home_page">
        Home {{ foo }}
    </div>
</template>

<script>
    import store from '../vuex/store.js';

    export default {
        name: 'home',
        store: store,
        vuex: {
            getters: {
                foo: state => state.foo,
            },
        },
    };
</script>

<style lang="scss">
</style>
