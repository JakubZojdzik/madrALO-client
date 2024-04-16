<script>
import axios from 'axios';

const url = import.meta.env.VITE_APP_API_URL;

export default {
    data() {
        return {
            email: '',
            password: '',
            passwordRep: '',
            err: ''
        };
    },
    methods: {
        changePass() {
            axios
                .post(
                    `${url}/users/changePassword`,
                    {
                        email: this.email,
                        password: this.password,
                        passwordRep: this.passwordRep
                    },
                    { headers: { 'content-type': 'application/x-www-form-urlencoded' } }
                )
                .then(() => {
                    this.err = '';
                    this.$router.push('/');
                })
                .catch((error) => {
                    this.err = error.response.data;
                    this.password = '';
                });
        }
    }
};
</script>

<template>
    <div class="wrapper">
        <div class="container">
            <form @submit.prevent="changePass">
                <h2 class="title">Zmiana hasła</h2>

                <div class="field">
                    <label for="email">Email na który rejestrowałeś konto</label>
                    <input v-model="email" type="email" name="email" placeholder="imie.nazwisko.rok@alo.pwr.edu.pl" required />
                </div>

                <div class="field">
                    <label for="password">Nowe hasło (8-32 znaków)</label>
                    <input v-model="password" type="password" name="password" placeholder="Hasło" required />
                </div>

                <div class="field">
                    <label for="passwordRep">Powtórz nowe hasło</label>
                    <input v-model="passwordRep" type="password" name="passwordRep" placeholder="Powtórz hasło" required />
                </div>

                <div v-if="err" class="error">
                    {{ err }}
                </div>

                <p>Na twojego maila zostanie wysłany link potwierdzający zmianę hasła.</p>

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
    margin-top: -0.5em;
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
