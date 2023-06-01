<script>
import axios from 'axios';
import AnnouncementView from './AnnouncementView.vue';
import dateFormat from "dateformat";

const url = import.meta.env.VITE_APP_API_URL;

export default {
    data() {
        return {
            ann: null
        };
    },
    methods: {
        async fetchData() {
            this.ann = (await axios.get(url + '/announcements/')).data;
            this.ann.forEach(el => {
                el.added = dateFormat(el.added, "dd-mm-yyyy, HH:MM:ss");
            });
        }
    },
    created() {
        this.fetchData();
    },
    components: { AnnouncementView }
};
</script>

<template>
    <main>
        <AnnouncementView v-for="{ id, title, content, author, added } in ann" :key="id" :title="title" :content="content" :author="author" :added="added" />
    </main>
</template>

<style scoped>
</style>
