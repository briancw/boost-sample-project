import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    foo: 'bar',
};

const mutations = {
    set_foo(state, value) {
        state.foo = value;
    },
};

export default new Vuex.Store({
    state,
    mutations,
    middlewares: [],
});
