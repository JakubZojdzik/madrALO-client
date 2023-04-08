<script>
import { UserTileItem } from '../components';
import axios from 'axios';
import { useLoggedIn } from '../composables';

const url = import.meta.env.VITE_APP_API_URL;

export default {
    data() {
        return {
            usrs: null
        };
    },
    methods: {
        async fetchData() {
            const logged = await useLoggedIn();
            this.usrs = (await axios.get(url + '/users/ranking')).data;
            this.usrs.forEach(x => {
                if (x.id === logged) {
                    x.active = true;
                }
            });
        }
    },
    created() {
        this.fetchData();
    },
    components: {
        UserTileItem
    }
};
</script>

<template>
    <main>
        <UserTileItem v-for="{ name, email, position, points, active } in usrs " :key="name" :name="name" :email="email" :position="position" :points="points" :active="active"/>
        <ul></ul>
    </main>
</template>
