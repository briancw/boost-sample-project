<template>
    <div class="page_container login_page">
        <form class="login_form" v-on:submit="do_login">
            <input type="text" v-model="email" />
            <input type="password" v-model="pwd" />

            <div v-if="error">
                {{ error }}
            </div>

            <div class="login_button">
                <button>Login</button>
                <!-- <RaisedButton type="submit" label="Login" primary={true} /> -->
            </div>
        </form>

        <br />

        <a v-on:click="test_auth()" href="#">Test</a>
        <br /><br />
    </div>
</template>

<script>
    import boost from 'boostjs';

    export default {
        name: 'home',
        data() {
            return {
                email: 'brian@snapshot.is',
                pwd: '123456',
                error: '',
            };
        },
        methods: {
            do_login(event) {
                event.preventDefault();
                this.error = '';
                let endpoint = '/api/login';
                let payload = {email: this.email, pwd: this.pwd};
                this.$http.post(endpoint, payload).then(response => {
                    let answer = response.data;
                    // console.log(answer);
                    if (answer.success && answer.token) {
                        localStorage.token = answer.token;
                        console.log('logged in');
                    } else if (answer.error) {
                        this.error = answer.error;
                    }
                });
            },
            test_auth() {
                let endpoint = '/api/test';
                this.$http.post(endpoint).then(response => {
                    console.log(response);
                });
            },
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
