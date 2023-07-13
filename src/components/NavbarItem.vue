<script>
import { RouterLink } from 'vue-router';
import axios from 'axios';
import store from '../store';
import { useLoggedIn } from '../composables';

const url = import.meta.env.VITE_APP_API_URL;

export default {
    data() {
        return {
            title: String
        }
    },
    computed: {
        name() {
            return store.state.name;
        },
        currentRoute() {
            switch (this.$route.name) {
            case 'announcements':
                return 0;
            case 'challenges':
                return 1;
            case 'ranking':
                return 2;
            case 'rules':
                return 3;
            case 'login':
                return 4;
            case 'profile':
                return 4;
            case 'register':
                return 4;
            default:
                return -1;
            }
        }
    },
    methods: {
        async fetchTitle() {
            this.title = (await axios.get(`${url  }/competition/title`)).data;
        }
    },
    mounted() {
        useLoggedIn().then((logged) => {
            if (!logged) {
                store.commit('setUserData', { name: '', email: '' });
            }
        });
        this.fetchTitle();
    },
    components: {
        RouterLink
    }
};
</script>

<template>
    <nav class="wrapper">
        <RouterLink to="/">
            <div id="butt0" @click="setActivity" :class="{ active: currentRoute == 0 }" class="element"><span v-if="!title">
                Ogłoszenia</span>{{ title }}
            </div>
        </RouterLink>
        <RouterLink to="/challenges"><div id="butt0" @click="setActivity" :class="{ active: currentRoute == 1 }" class="element">Zadania</div></RouterLink>
        <RouterLink to="/ranking"><div id="butt1" @click="setActivity" :class="{ active: currentRoute == 2 }" class="element">Ranking</div></RouterLink>
        <RouterLink to="/rules"><div id="butt2" @click="setActivity" :class="{ active: currentRoute == 3 }" class="element">Zasady</div></RouterLink>
        <RouterLink :to="name ? '/profile' : '/login'"
            ><div id="butt3" @click="setActivity" :class="{ active: currentRoute == 4 }" class="element">{{ name ? name : 'Zaloguj' }}</div></RouterLink
        >
        <div class="clear"></div>
    </nav>
</template>

<style scoped>
.wrapper {
    width: 75%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 4rem;
    margin-top: 1.6rem;
    border: 1px solid #fff;
}

.element {
    width: 20%;
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

@media screen and (max-width: 700px) {
    .element {
        clear: both;
        width: 100%;
    }

    .wrapper {
        width: 95%;
    }
}
</style>
