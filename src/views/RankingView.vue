<script>
import { UserTileItem } from '../components';
import axios from 'axios';

export default {
    data() {
        return {
            usrs: null
        };
    },
    methods: {
        async fetchData() {
            this.usrs = (await axios.get('http://localhost:8080/users/ranking')).data;
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
        <UserTileItem v-for="{ name, email, position, points } in usrs " :key="name" :name="name" :email="email" :position="position" :points="points" />
        <ul></ul>
    </main>
</template>
