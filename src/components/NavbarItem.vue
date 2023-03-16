<script>
import { RouterLink } from 'vue-router';

export default {
    props: {
        name: String
    },
    computed: {
        currentRoute() {
            switch (this.$route.name) {
                case 'challanges':
                    return 0;
                case 'ranking':
                    return 1;
                case 'rules':
                    return 2;
                case 'login':
                    return 3;
                case 'profile':
                    return 3;
                default:
                    return 0;
            }
        }
    },
    components: {
        RouterLink
    }
};
</script>

<template>
    <nav class="wrapper">
        <RouterLink to="/"><div id="butt0" @click="setActivity" :class="{ active: currentRoute == 0 }" class="element">Zadania</div></RouterLink>
        <RouterLink to="/ranking"><div id="butt1" @click="setActivity" :class="{ active: currentRoute == 1 }" class="element">Ranking</div></RouterLink>
        <RouterLink to="/zasady"><div id="butt2" @click="setActivity" :class="{ active: currentRoute == 2 }" class="element">Zasady</div></RouterLink>
        <RouterLink :to="this.name ? '/profil' : '/login'"
            ><div id="butt3" @click="setActivity" :class="{ active: currentRoute == 3 }" class="element">{{ name ? name : 'Zaloguj' }}</div></RouterLink
        >
        <div class="clear"></div>
    </nav>
</template>

<style scoped>
.wrapper {
    width: 60%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 4rem;
    margin-top: 1.6rem;
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
