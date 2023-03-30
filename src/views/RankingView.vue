<script>
import { UserTileItem } from '../components';
import axios from 'axios';
import { useLoggedIn } from '../composables';

export default {
    data() {
        return {
            usrs: null
        };
    },
    methods: {
        async fetchData() {
            const logged = await useLoggedIn();
            this.usrs = (await axios.get('http://localhost:8080/users/ranking')).data;
            this.usrs.forEach(x => {
                if (x.id === logged) {
                    x.active = true;
                }
            });
            console.log(this.usrs);
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
