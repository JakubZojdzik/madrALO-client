<script>
import axios from 'axios';
import VueCookie from 'vue-cookie';
import store from '../store';

const url = import.meta.env.VITE_APP_API_URL;

export default {
    data() {
    },
    methods: {
        login() {
            axios
                .post(
                    url + '/users/login',
                    {
                        email: this.email,
                        password: this.password
                    },
                    { headers: { 'content-type': 'application/x-www-form-urlencoded' } }
                )
                .then((response) => {
                    this.err = '';
                    VueCookie.set('authorization', response.data.token, '1h');
                    store.commit('setUserData', { name: response.data.name, email: response.data.email });
                    this.$router.push('/');
                })
                .catch((error) => {
                    this.err = error.response.data;
                    this.password = '';
                });
        }
    },
};
</script>

<template>
    <div class="wrapper">
        <div class="container">
            <form @submit.prevent="login">
                <h2 class="title">Podaj email na który zarejestrowałeś konto</h2>

                <div class="field">
                    <input v-model="email" type="email" name="email" placeholder="imie.nazwisko.rok@alo.pwr.edu.pl" />
                    <p>Na twojego maila zostanie wysłany link prowadzący do strony zmiany hasła.</p>
                </div>

                <button type="submit">Wyślij</button>
            </form>
        </div>
    </div>
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
    min-width: 35%;
}

.forgot {
    color: white;
    margin-bottom: 1em;
    margin-top: -.5em;
    display: block;
}

.title {
    margin-top: 0;
    text-align: center;
}

label {
    display: block;
}

input,
button {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid #fff;
    background-color: rgba(0, 0, 0, 0);
    color: #fff;
    font-size: 1em;
}

input:focus {
    background-color: rgba(255, 255, 255, 0.1);
}

button {
    cursor: pointer;
    margin-bottom: 2rem;
}

button:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

.field {
    margin-bottom: 1.5rem;
}

.error {
    color: #d44040;
    margin-bottom: 1.5rem;
}
</style>
