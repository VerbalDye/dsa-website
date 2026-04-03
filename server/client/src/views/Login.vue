<template>
    <Header />
    <div class="site-container">
        <div class="content">
            <h1 id="login-header">Login</h1>
            <div class="card">
                <form id="login-form" @submit="handleLogin">
                    <table class="grid-less">
                        <tr>
                            <th><label for="email-input">Email: </label></th>
                            <td><input type="email" id="email-input" name="email-input"></td>
                        </tr>
                        <tr>
                            <th><label for="password-input">Password: </label></th>
                            <td><input type="password" id="password-input" name="password-input"></td>
                        </tr>
                    </table>
                    <button>Login</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import dataRequest from '@/utils/dataRequest';
export default {
    data() {
        return {
            locationSearch: ""
        }
    },
    components: { Header },
    methods: {
        async handleLogin(e) {
            e.preventDefault();
            const body = { email: e.target[0].value, password: e.target[1].value }
            let data = await dataRequest("/api/user/login", "POST", JSON.stringify(body), { statusOnly: true });
            if (data.status == 200) {
                const urlParameters = new URLSearchParams(window.location.search);
                for (const [key, value] of urlParameters) {
                    if (key == 'redirect') {
                        this.$router.push(decodeURIComponent(value.toString()));
                        return
                    }
                }
                this.$router.push('/');
            } else {
                window.alert("Incorrect Credentials");
            }
        }
    },
    mounted() {
        this.locationSearch = window.location.search;
    }
}
</script>

<style>
#login-header {
    text-align: left;
}
</style>
