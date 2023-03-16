<script>
import axios from 'axios';

export default {
    data() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        login() {
            axios
                .get('http://localhost:8080/users/login', {
                    auth: {
                        username: 'foo',
                        password: 'bar'
                    }
                })
                .then((response) => {
                    console.log(response);
                });
        }
    }
};
</script>

<template>
    <div class="wrapper">
        <div class="container">
            <form @submit.prevent="login">
                <h2 class="title">Login</h2>

                <div class="field">
                    <label for="email">Email</label>
                    <input type="text" name="email" placeholder="imie.nazwisko.rok@alo.pwr.edu.pl" />
                </div>

                <div class="field">
                    <label for="password">Hasło</label>
                    <input type="password" name="password" placeholder="Hasło" />
                </div>

                <!-- <input type="button" value="Zaloguj" /> -->
                <button type="submit" @click="logn" >Zaloguj</button>
                <div>Nie posiadasz jeszcze konta? Napisz do ... na librusie...</div>
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
}

.title {
    margin-top: 0;
    text-align: center;
}

label {
    display: block;
}

input, button {
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
</style>
