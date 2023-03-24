<script>
import { ChallangeTileItem } from '../components';
import axios from 'axios';

export default {
    data() {
        return {
            challs: null
        };
    },
    methods: {
        async fetchData() {
            this.challs = await (await axios.get('http://localhost:8080/challanges/currentChallanges')).data;
            this.challs.forEach(c => {
                if (c.content.length > 100) {
                    c.content = c.content.substring(0, 99) + '...';
                }
            });
            console.log(this.challs);
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
        <span style="font-size: 3em"> mądrALO - Zadania </span>
        <p>Zadania zadania, jeszcze nie ma zadań</p>
        <div>
            <ChallangeTileItem v-for="{ id, title, content, points, solves } in challs" :key="id" :id="id" :title="title" :content="content" :points="points" :solves="solves" />
        </div>
    </main>
</template>
