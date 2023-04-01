<script>
import { ChallangeTileItem } from '../components';
import axios from 'axios';
import VueCookie from 'vue-cookie';
import { useLoggedIn, useAdmin } from '../composables';

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
                    await axios.get('http://localhost:8080/users/solves', {
                        headers: {
                            authorization: 'Bearer ' + VueCookie.get('authorization')
                        }
                    })
                ).data;
            }
            let inactChalls = [];
            if (admin) {
                inactChalls = (
                    await axios.get('http://localhost:8080/challanges/inactiveChallanges', {
                        headers: {
                            authorization: 'Bearer ' + VueCookie.get('authorization')
                        }
                    })
                ).data;
                inactChalls.forEach((c) => {
                    c.solved = solves.includes(c.id);
                    c.content = c.content.replace(/<[^>]+>/g, ' ');
                    c.current = false;
                    if (c.content.length > 100) {
                        c.content = c.content.substring(0, 96) + '...';
                    }
                });
            }
            this.challs = (await axios.get('http://localhost:8080/challanges/currentChallanges')).data;
            this.challs.forEach((c) => {
                c.solved = solves.includes(c.id);
                c.content = c.content.replace(/<[^>]+>/g, ' ');
                c.current = true;
                if (c.content.length > 100) {
                    c.content = c.content.substring(0, 96) + '...';
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
        ChallangeTileItem
    }
};
</script>

<template>
    <main>
        <div class="title">mądrALO - Zadania</div>
        <div>
            <ChallangeTileItem v-for="{ id, title, content, points, solves, solved, current } in challs" :key="id" :id="id" :title="title" :content="content" :points="points" :solves="solves" :solved="solved" :current="current" />
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
</style>
