<script>
import store from '../store';
import VueCookie from 'vue-cookie';

export default {
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
            VueCookie.delete('authorization');
            store.state.email = '';
            store.state.name = '';
            this.$router.push('/');
        }
    }
}
</script>

<template>
    <main>
        <div class="wrapper">
            <div class="container">
                <div class="field">Email: {{ emailVal }}</div>
                <div class="field">Nazwa: {{ nameVal }}</div>
                <button class="field" @click="logout">Wyloguj</button>
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
