<script>
import { RouterView } from 'vue-router';
import { NavbarItem, TimerItem } from './components';

export default {
    components: {
        RouterView,
        NavbarItem,
        TimerItem
    },
    created() {
        const apiURL = import.meta.env.VITE_APP_API_URL;
        const titleEndpointUrl = `${apiURL}/competition/title`;
        fetch(titleEndpointUrl)
            .then((response) => response.text())
            .then((title) => {
                document.title = title;
            });
    }
};
</script>

<template>
    <TimerItem />
    <NavbarItem />
    <RouterView />
</template>

<style scoped></style>
