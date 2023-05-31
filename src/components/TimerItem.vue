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
            this.startTime = new Date(Date.parse(t['start']));
            this.endTime = new Date(Date.parse(t['end']));
            this.part = (new Date().getTime() - this.startTime.getTime()) / (this.endTime.getTime() - this.startTime.getTime());
            this.part = Math.max(0, this.part);
            this.part = Math.min(1, this.part);
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
    <div class="wrapper">
        <div class="bar" :style="cssVars"></div>
    </div>
</template>

<style scoped>
.wrapper {
    margin: 0;
    min-height: 1rem;
    border: 1px solid #fff;
}
.bar {
    min-height: 1rem;
    background-color: #fff;
    width: var(--bar-width);
}
</style>
