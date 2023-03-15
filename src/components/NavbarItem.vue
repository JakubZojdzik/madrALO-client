<script>
import { RouterLink } from 'vue-router';

export default {
    props: {
        name: String
    },
    data() {
        return {
            activeButton: 0,
        };
    },
    methods: {
        setActivity(event) {
            this.activeButton = event.currentTarget.id[4] - '0';
        }
    },
    components: {
        RouterLink,
    }
};
</script>

<template>
    <nav class="wrapper">
        <RouterLink to="/"><div id="butt0" @click="setActivity" :class="{ active: activeButton==0 }" class="element">Zadania</div></RouterLink>
        <RouterLink to="/ranking"><div id="butt1" @click="setActivity" :class="{ active: activeButton==1 }" class="element">Ranking</div></RouterLink>
        <RouterLink to="/zasady"><div id="butt2" @click="setActivity" :class="{ active: activeButton==2 }" class="element">Zasady</div></RouterLink>
        <RouterLink :to="this.name ? '/profil' : '/login'"><div id="butt3" @click="setActivity" :class="{ active: activeButton==3 }" class="element">{{ name ? name : 'Zaloguj' }}</div></RouterLink>
        <div class="clear"></div>
    </nav>
</template>

<style scoped>
.wrapper {
    width: 60%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 4rem;
    border: 1px solid #fff;
}

.element {
    width: 25%;
    float: left;
    margin: 0;
    text-align: center;
    padding-top: 1rem;
    padding-bottom: 1rem;
    cursor: pointer;
    transition: all 0.2s;
}

.element:hover {
    background: rgba(255, 255, 255, 0.1);
}

.active {
    background-color: #fff;
    color: #002b36;
}

.active:hover {
    background-color: #fff;
    color: #002b36;
}

.clear {
    clear: both;
}

a {
    color: #fff;
    text-decoration: none;
}
</style>
