<template>
    <div id="app">
        <div id="site_container">
            <router-link to="/home">Testin</router-link>
            <router-link to="/login">login</router-link>
            <router-link to="/something">Something</router-link>
            <transition name="fade" mode="out-in">
                <router-view class="view"></router-view>
            </transition>
        </div>
    </div>
</template>

<script>

// import store from '../vuex/store.js';

export default {
    data() {
        return {
            // show_auth: false,
        };
    },
};
</script>
