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


        <!-- <a v-on:click="test_auth()" href="#">Test</a> -->
        <br />
        <a v-on:click.prevent="test_auth" href="#">Test</a>
        <br /><br />
        <a v-if="loggedIn" v-on:click.prevent="logout" href="#">Logout</a>
    </div>
</template>

<script>
    import boost from 'boostjs';

    export default {
        name: 'home',
        data() {
            return {
                email: 'brian@whicheloe.us',
                pwd: '123456',
                error: '',
                loggedIn: false,
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

                    if (answer.success && answer.token) {
                        localStorage.token = answer.token;
                        localStorage.invalidationDate = answer.invalidationDate;
                        this.$set('loggedIn', true);
                        console.log('logged in');
                    } else if (answer.error) {
                        this.error = answer.error;
                    }
                });
            },

            http_logout(event) {
                event.preventDefault();
                this.error = '';
                let endpoint = '/api/logout';
                let payload = {msg: 'please'};

                this.$http.post(endpoint, payload).then(response => {
                    let answer = response.data;
                    if (answer.success && !answer.token) {

                        delete localStorage.token;
                        console.log('logged out');

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

            logout() {
                boost.logout();
                this.$set('loggedIn', false);
                alert('You are now logged out');
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
