<script>
import { ChallengeTileItem } from '../components';
import axios from 'axios';
import VueCookie from 'vue-cookie';

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
                await axios.get(url + '/submits', {
                    headers: {
                        authorization: 'Bearer ' + VueCookie.get('authorization')
                    }
                })
            ).data;
        }
    },
    created() {
        this.fetchData();
    },
    components: {
        ChallengeTileItem
    }
};
</script>

<template>
    <main>
        <div class="title">Zgłoszenia</div>
        <div class="info" v-if="subs === null || subs === [] || subs.length === 0 || !subs">
            <p>Brak zgłoszeń</p>
        </div>
        <div>
            <ChallengeTileItem v-for="({ id, title, content, points, solves, solved, current }, index) in subs" :key="id" :id="id" :title="title" :content="content" :points="points" :solves="solves" :solved="solved" :current="current" :odd="index % 2 == 1" />
        </div>
    </main>
</template>

<style scoped>
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
