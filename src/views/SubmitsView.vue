<script>
import axios from 'axios';
import VueCookie from 'vue-cookie';
import { SubmitTileItem } from '../components';

const url = import.meta.env.VITE_APP_API_URL;

export default {
    data() {
        return {
            subs: null
        };
    },
    methods: {
        async fetchData() {
            this.subs = (
                await axios.get(`${url  }/submits`, {
                    headers: {
                        authorization: `Bearer ${  VueCookie.get('authorization')}`
                    }
                })
            ).data;
            this.subs.forEach(el => {
                el.sent = new Date(Date.parse(el.sent)).toLocaleString('pl-PL');
            });
        }
    },
    created() {
        this.fetchData();
    },
    components: {
        SubmitTileItem
    }
};
</script>

<template>
    <main class="wrapper">
        <div class="title">Zgłoszenia</div>
        <div class="info" v-if="subs === null || subs === [] || subs.length === 0 || !subs">
            <p>Brak zgłoszeń</p>
        </div>
        <div>
            <SubmitTileItem v-for="{ id, corr_ans, correct, given_ans, name, sent, title } in subs"
            :key="id" :corr_ans="corr_ans" :correct="correct" :given_ans="given_ans" :name="name" :sent="sent" :title="title" />
        </div>
    </main>
</template>

<style scoped>
.wrapper {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
}
.title {
    font-size: 3em;
    text-align: center;
    width: 100%;
    margin-top: 3rem;
}

.info {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1rem;
    text-align: center;
}
</style>
