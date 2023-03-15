<script>
import { RouterView } from 'vue-router';
import { NavbarItem } from './components';

export default {
    components: {
        RouterView,
        NavbarItem,
    }
};
</script>

<template>
    <NavbarItem />
    <RouterView />
</template>

<style scoped></style>
