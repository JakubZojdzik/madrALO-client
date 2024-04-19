<script>
import axios from 'axios';
import VueCookie from 'vue-cookie';
import { ChallengeTileItem } from '../components';
import { useLoggedIn, useAdmin } from '../composables';

const url = import.meta.env.VITE_APP_API_URL;

export default {
    data() {
        return {
            challs: null
        };
    },
    methods: {
        async fetchData(admin) {
            let solves = [];
            const logged = await useLoggedIn();
            if (logged) {
                solves = (
                    await axios.get(`${url}/users/solves`, {
                        headers: {
                            authorization: `Bearer ${VueCookie.get('authorization')}`
                        }
                    })
                ).data;
            }
            let inactChalls = [];
            if (admin) {
                inactChalls = (
                    await axios.get(`${url}/challenges/inactive`, {
                        headers: {
                            authorization: `Bearer ${VueCookie.get('authorization')}`
                        }
                    })
                ).data;
                inactChalls.forEach((c) => {
                    c.solved = solves.includes(c.id);
                    c.content = c.content.replace(/<[^>]+>/g, ' ');
                    c.current = false;
                    if (c.content.length > 100) {
                        c.content = `${c.content.substring(0, 96)}...`;
                    }
                });
            }
            this.challs = (
                await axios.get(`${url}/challenges/current`, {
                    headers: {
                        authorization: `Bearer ${VueCookie.get('authorization')}`
                    }
                })
            ).data;
            this.challs.forEach((c) => {
                c.solved = solves.includes(c.id);
                c.content = c.content.replace(/<[^>]+>/g, ' ');
                c.current = true;
                if (c.content.length > 100) {
                    c.content = `${c.content.substring(0, 96)}...`;
                }
            });
            this.challs = this.challs.concat(inactChalls);
        }
    },
    created() {
        useAdmin().then((admin) => {
            this.fetchData(admin);
        });
    },
    components: {
        ChallengeTileItem
    }
};
</script>

<template>
    <main>
        <div class="title">mądrALO - Zadania</div>
        <div class="info" v-if="challs === null || challs === [] || challs.length === 0 || !challs">
            <p>Żadne zadania nie zostały jeszcze opublikowane. Zapoznaj się z zakładką <i>Zasady</i></p>
        </div>
        <div>
            <ChallengeTileItem v-for="({ id, title, content, points, solves, solved, current }, index) in challs" :key="id" :id="id" :title="title" :content="content" :points="points" :solves="solves" :solved="solved" :current="current" :odd="index % 2 == 1" />
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
