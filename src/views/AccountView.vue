<script>
import store from '../store';
import VueCookie from 'vue-cookie';
import { useAdmin } from '../composables';
import { RouterLink } from 'vue-router';

export default {
    data() {
        return {
            admin: false
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
                <button class="field" @click="logout">Wyloguj</button>
                <RouterLink v-if="admin" to="/addChallenge">
                    <button class="field">Dodaj zadanie</button>
                </RouterLink>
                <RouterLink v-if="admin" to="/addAnnouncement">
                    <button class="field">Dodaj ogłoszenie</button>
                </RouterLink>
                <RouterLink v-if="admin" to="/submits">
                    <button class="field">Zgłoszenia</button>
                </RouterLink>
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
    margin-bottom: 1.5rem;
}

button:hover {
    background-color: rgba(255, 255, 255, 0.1);
}
</style>
