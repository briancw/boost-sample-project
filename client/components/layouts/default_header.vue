<template>
    <header id="header">
        Header
        <div class="menu">
            <a v-link="{path: '/login'}" class="account_link">Login</a>
        </div>
    </header>
</template>

<script>
export default {
    name: 'header',
};
</script>
