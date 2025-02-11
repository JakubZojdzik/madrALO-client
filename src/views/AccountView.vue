<script>
import VueCookie from 'vue-cookie';
import axios from 'axios';
import { RouterLink } from 'vue-router';
import store from '../store';
import { useAdmin } from '../composables';

const url = import.meta.env.VITE_APP_API_URL;

export default {
    data() {
        return {
            admin: false,
            points: 0
        };
    },
    computed: {
        emailVal() {
            return store.state.email;
        },
        nameVal() {
            return store.state.name;
        }
    },
    methods: {
        logout() {
            store.commit('reset');
            VueCookie.delete('authorization');
            this.$router.push('/');
        },
        async fetchData() {
            this.points = (await axios.get(`${url}/users/usersPoints`, {
                headers: {
                    authorization: `Bearer ${VueCookie.get('authorization')}`
                }
            })).data;
        }
    },
    mounted() {
        useAdmin().then((logged) => {
            if (logged) {
                this.admin = true;
            } else {
                this.admin = false;
            }
        });
        this.fetchData();
    },
    components: {
        RouterLink
    }
};
</script>

<template>
    <main>
        <div class="wrapper">
            <div class="container">
                <div class="field">Email: {{ emailVal }}</div>
                <div class="field">Nazwa: {{ nameVal }}</div>
                <div class="field">Punkty: {{ points }}</div>
                <button @click="logout">Wyloguj</button>
                <RouterLink v-if="!admin" to="/submits">
                    <button class="adminButt">Moje zgłoszenia</button>
                </RouterLink>

                <div v-if="admin" class="adminpanel">
                    <div class="label">Admin panel</div>
                    <RouterLink to="/addChallenge">
                        <button class="adminButt">Dodaj zadanie</button>
                    </RouterLink>
                    <RouterLink to="/addAnnouncement">
                        <button class="adminButt">Dodaj ogłoszenie</button>
                    </RouterLink>
                    <RouterLink to="/submits">
                        <button class="adminButt">Wszystkie zgłoszenia</button>
                    </RouterLink>
                    <RouterLink to="/editCompetition">
                        <button class="adminButt">Edytuj konkurs</button>
                    </RouterLink>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
.wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.container {
    border: 1px solid #fff;
    padding: 3rem;
}

.field {
    width: 100%;
    padding: 12px 20px;
    margin: 1rem 0;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid #fff;
    background-color: rgba(0, 0, 0, 0);
    color: #fff;
    font-size: 1em;
}

button {
    cursor: pointer;
    width: 100%;
    padding: 12px 20px;
    margin: 0;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid #fff;
    background-color: rgba(0, 0, 0, 0);
    color: #fff;
    font-size: 1em;
}

button:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

.adminpanel {
    margin-top: 3rem;
}

.adminButt {
    margin: 0.5rem 0;
}

.label {
    text-align: center;
    border-top: solid 1px white;
    border-bottom: solid 1px white;
    padding: 0.4rem;
    margin-bottom: 1rem;
}
</style>
