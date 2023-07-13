<script>
import { RouterView } from 'vue-router';
import { NavbarItem, TimerItem } from './components';

export default {
    components: {
        RouterView,
        NavbarItem,
        TimerItem
    }
};
</script>

<template>
    <TimerItem />
    <NavbarItem />
    <RouterView />
</template>

<style scoped></style>
