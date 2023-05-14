<script>
import axios from 'axios';

const url = import.meta.env.VITE_APP_API_URL;

export default {
    data() {
        return {
            endTime: Date(),
            startTime: Date(),
            part: Number
        };
    },
    methods: {
        async fetchData() {
            let t = (await axios.get(url + '/challenges/competitionTimeRange')).data;
            console.log('dostalem ', t);
            this.startTime = new Date(Date.parse(t['start']));
            this.endTime = new Date(Date.parse(t['end']));
            console.log(new Date().getTime());
            this.part = (new Date().getTime() - this.startTime.getTime()) / (this.endTime.getTime() - this.startTime.getTime());
        }
    },
    mounted() {
        this.fetchData();
    },
    computed: {
        cssVars() {
            return {
                '--bar-width': this.part * 100 + '%',
            };
        }
    }
};
</script>

<template>
    <div class="bar" :style="cssVars">{{ part }}</div>
</template>

<style scoped>
.bar {
    width: 100%;
    border: 1px solid #fff;
    width: var(--bar-width);
}
</style>
