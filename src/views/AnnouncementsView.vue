<script>
import axios from 'axios';
import dateFormat from 'dateformat';
import { useAdmin } from '../composables';
import { AnnouncementItem } from '../components';

const url = import.meta.env.VITE_APP_API_URL;

export default {
    data() {
        return {
            ann: null,
            admin: false
        };
    },
    methods: {
        async fetchData() {
            this.ann = (await axios.get(url + '/announcements/')).data;
            this.ann.forEach((el) => {
                el.added = dateFormat(el.added, 'dd-mm-yyyy, HH:MM:ss');
            });
        }
    },
    created() {
        useAdmin().then((admin) => {
            this.admin = admin;
        });
        this.fetchData();
    },
    components: {
        AnnouncementItem,
    }
};
</script>

<template>
    <main>
        <AnnouncementItem v-for="{ id, title, content, author, added } in ann" :id="id" :key="id" :title="title" :content="content" :author="author" :added="added" :admin="admin" />
    </main>
</template>

<style scoped></style>
