<script>
import axios from 'axios';

const url = import.meta.env.VITE_APP_API_URL;

export default {
    data() {
        return {
            email: '',
            name: '',
            password: '',
            passwordRep: '',
            err: ''
        };
    },
    methods: {
        register() {
            axios
                .post(
                    `${url}/users/register`,
                    {
                        email: this.email,
                        name: this.name,
                        password: this.password,
                        passwordRep: this.passwordRep
                    },
                    { headers: { 'content-type': 'application/x-www-form-urlencoded' } }
                )
                .then(() => {
                    this.err = '';
                    this.$router.push('/emailInfo');
                })
                .catch((error) => {
                    this.err = error.response.data;
                });
        }
    }
};
</script>

<template>
    <div class="wrapper">
        <div class="container">
            <form @submit.prevent="register">
                <h2 class="title">Rejestracja</h2>

                <div class="field">
                    <label for="email">Email (szkolny)</label>
                    <input v-model="email" type="email" name="email" placeholder="imie.nazwisko.rok@alo.pwr.edu.pl" required />
                </div>

                <div class="field">
                    <label for="name">Nazwa użytkownika (bez spacji, 5-12 znaków)</label>
                    <input v-model="name" type="text" name="name" placeholder="Nazwa" required />
                </div>

                <div class="field">
                    <label for="password">Hasło (8-32 znaków)</label>
                    <input v-model="password" type="password" name="password" placeholder="Hasło" required />
                </div>

                <div class="field">
                    <label for="passwordRep">Powtórz hasło</label>
                    <input v-model="passwordRep" type="password" name="passwordRep" placeholder="Powtórz hasło" required />
                </div>

                <div v-if="err" class="error">
                    {{ err }}
                </div>

                <button type="submit">Zarejestruj się</button>
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
    min-width: 45%;
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
