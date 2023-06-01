<script>
import axios from 'axios';

const url = import.meta.env.VITE_APP_API_URL;

export default {
    data() {
        return {
            ann: null
        };
    },
    methods: {
        async fetchData() {
            this.ann = (await axios.get(url + '/challenges/inactiveChallenges')).data;
        }
    },
    created() {
        this.fetchData();
    }
};
</script>

<template>
    <main>
        papiez
        <p v-for="{ id, title, content, author, added } in ann" :key="id">uuu{{ title }}: {{ content }}, {{ author }}, {{ added }}</p>
    </main>
</template>

<style scoped></style>
