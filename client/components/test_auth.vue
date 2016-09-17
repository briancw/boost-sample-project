<template>
    Authed On frontend for vue transitions
    <br/>
    <br/>
    Api Auth Status: <span :style="{'color': authStatus ? '#00ffbc' : 'red'}">{{ authStatus }}</span>
    </br/>
    <a href="#!" @click="testAuth">Retest API</a>
    </br/>
</template>

<script>
export default {
    name: 'test-auth',
    data() {
        return {
            authStatus: false,
        };
    },
    activate(done) {
        this.testAuth();
        done();
    },
    methods: {
        testAuth() {
            let endpoint = '/api/test';
            this.$http.post(endpoint).then(response => {
                console.log('auth tested');
                this.authStatus = response.data.authStatus;
            });
        },
    },
};
</script>
