<script>
import axios from 'axios';
import dateFormat from 'dateformat';
import { useAdmin } from '../composables';
import { AnnouncementItem } from '../components';
import VueCookie from 'vue-cookie';

const url = import.meta.env.VITE_APP_API_URL;

export default {
    data() {
        return {
            ann: null,
            admin: false
        };
    },
    methods: {
        async fetchData(admin) {
            this.ann = (await axios.get(url + '/announcements/')).data;
            let inactAnn = [];
            if (admin) {
                inactAnn = (
                    await axios.get(url + '/announcements/inactive', {
                        headers: {
                            authorization: 'Bearer ' + VueCookie.get('authorization')
                        }
                    })
                ).data;
            }
            inactAnn.forEach((c) => {
                c.active = false;
            });
            this.ann.forEach((c) => {
                c.active = true;
            });
            this.ann = this.ann.concat(inactAnn);
            this.ann.forEach((el) => {
                el.added = dateFormat(el.added, 'dd-mm-yyyy, HH:MM:ss');
            });
        }
    },
    created() {
        useAdmin().then((admin) => {
            this.admin = admin;
            this.fetchData(admin);
        });
    },
    components: {
        AnnouncementItem
    }
};
</script>

<template>
    <main>
        <AnnouncementItem v-for="{ id, title, content, author, added, active } in ann" :id="id" :key="id" :title="title" :content="content" :author="author" :added="added" :admin="admin" :active="!active" />
    </main>
</template>

<style scoped></style>
