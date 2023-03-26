<script>
import { ChallangeTileItem } from '../components';
import axios from 'axios';
import VueCookie from 'vue-cookie';
import { useLoggedIn } from '../composables/useLoggedIn';

export default {
    data() {
        return {
            challs: null
        };
    },
    methods: {
        async fetchData() {
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
            this.challs = await (await axios.get('http://localhost:8080/challanges/currentChallanges')).data;
            this.challs.forEach((c) => {
                c.solved = solves.includes(c.id);
                if (c.content.length > 100) {
                    c.content = c.content.substring(0, 96) + '...';
                }
            });
        }
    },
    created() {
        this.fetchData();
    },
    components: {
        ChallangeTileItem
    }
};
</script>

<template>
    <main>
        <div  class="title"> mądrALO - Zadania </div>
        <div>
            <ChallangeTileItem v-for="{ id, title, content, points, solves, solved } in challs" :key="id" :id="id" :title="title" :content="content" :points="points" :solves="solves" :solved="solved" />
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
