<template>
    <header>
        <router-link to="/"><img src="../assets/DSA-Logo.png" id="header-img"/></router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/blog">Blog</router-link>
        <router-link to="/working-groups">Working Groups</router-link>
        <router-link to="/calendar">Calendar</router-link>
        <router-link to="/donation">Donation</router-link>
        <!-- <button @click="handleLogout" v-if="this.isLoggedIn()">Logout</button> <router-link to="/login" v-else>Login</router-link> -->
        <router-link to="/login">Login</router-link>
    </header>
</template>

<script>
    import auth from '../utils/auth'
    export default {
    name: 'Header',
    methods: {
        handleLogout() {
            auth.logout();
        },
        isLoggedIn() {
            return auth.isLoggedIn()
        }
    }
}
</script>

<style>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(0,0,0,0);
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
}
#header-img {
    height: 50px;
    margin: 5px;
}
header a {
    text-decoration: none;
    color: inherit;
    padding: 10px;
}
header button {
    border: none;
    background-color: transparent;
    color: var(--black);
}
</style>