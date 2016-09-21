<template>
    <div class="page_container home_page">
        <!-- Home {{ foo }}<br /> -->
        <h1>{{ posts.data.stuff }}</h1>

        Comments:<br />
        <div v-for="post in posts.data" class="comment">
            User: {{ post.username }}<br />
            {{ post.content }}
        </div>
    </div>
</template>

<script>
    import store from '../vuex/store.js';
    import boost from 'boostjs';

    export default {
        name: 'home',
        store: store,
        // vuex: {
        //     getters: {
        //         foo: state => state.foo,
        //     },
        // },
        data() {
            return {
                posts: boost.subscribe('/test'),
            };
        },

        ready() {
            console.log(this.posts);
        },

        created() {
        },
    };
</script>

<style lang="scss">
.comment {
    border-bottom: 1px solid #777;
    font-size: 14px;
    margin-top: 6px;
    width: 50%;
    display: inline-block;
}
</style>
