<script>
import axios from 'axios';
import VueCookie from 'vue-cookie';
import { useLoggedIn, useAdmin } from '../composables';
import { Fireworks } from '@fireworks-js/vue';

const url = import.meta.env.VITE_APP_API_URL;

export default {
    computed: {
        id() {
            return parseInt(this.$route.params.id);
        }
    },
    data() {
        return {
            title: '',
            content: '',
            author: '',
            points: 0,
            solves: 0,
            solved: false,
            logged: false,
            answer: '',
            fireworks: false,
            admin: false,
            start: null,
            shake: false,
            error: ''
        };
    },
    methods: {
        async WA() {
            this.shake = true;
            setTimeout(() => (this.shake = false), 500);
        },
        async fetchData() {
            let s = [];
            const lgd = await useLoggedIn();
            if (lgd) {
                this.logged = true;
                s = (
                    await axios.get(url + '/users/solves', {
                        headers: {
                            authorization: 'Bearer ' + VueCookie.get('authorization')
                        }
                    })
                ).data;
            }
            let chall;
            try {
                chall = (
                    await axios.get(url + '/challenges/byId/' + this.id, {
                        headers: {
                            authorization: 'Bearer ' + VueCookie.get('authorization')
                        }
                    })
                ).data;
            } catch (error) {
                if (error.response.status === 400)
                {
                    this.$router.push('/NotFound');
                }
            }

            this.title = chall.title;
            this.content = chall.content;
            this.author = chall.author;
            this.points = chall.points;
            this.solves = chall.solves;
            this.start = chall.start;
            this.solved = s.includes(this.id);
            this.error = '';
        },

        submitAnswer() {
            this.error = '';
            axios
                .post(
                    url + '/challenges/solve',
                    {
                        challId: this.id,
                        answer: this.answer
                    },
                    {
                        headers: {
                            'content-type': 'application/x-www-form-urlencoded',
                            authorization: 'Bearer ' + VueCookie.get('authorization')
                        }
                    }
                )
                .then((response) => {
                    if (response.data == true) {
                        this.solved = true;
                        this.solves++;
                        this.fireworks = true;
                        setTimeout(() => {
                            this.fireworks = false;
                        }, 5000);
                    } else {
                        this.answer = '';
                        this.error = 'Przed nastepną odpowiedzią musisz odczekać 10 min';
                        this.WA();
                    }
                })
                .catch((error) => {
                    this.error = error.response.data;
                    this.answer = '';
                });
        },

        removeChallenge() {
            axios
                .delete(url + '/challenges/removeChallenge', {
                    data: {
                        challId: this.id
                    },
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                        authorization: 'Bearer ' + VueCookie.get('authorization')
                    }
                })
                .then(() => {
                    this.$router.push('/');
                });
        }
    },
    created() {
        this.fetchData();
        useAdmin().then((admin) => {
            this.admin = admin;
        });
    },
    components: {
        Fireworks
    }
};
</script>

<template>
    <main>
        <table>
            <tr>
                <td width="10%" class="t-center">{{ points }} pkt</td>
                <td width="60%" class="title">
                    <b>{{ title }}</b>
                </td>
                <td width="30%" class="t-center">Autor: {{ author }}</td>
            </tr>
            <tr>
                <td colspan="3">
                    <span v-html="content" style="white-space: pre-wrap"></span>
                </td>
            </tr>
        </table>
        <form @submit.prevent="submitAnswer">
            <table style="margin-top: -1px">
                <tr>
                    <td width="50%" class="last">
                        <input :class="{ shake: shake }" :disabled="solved || !logged" v-model="answer" type="text" name="answer" placeholder="Odpowiedź" />
                    </td>
                    <td width="20%" class="last">
                        <button :disabled="solved || !logged" type="submit">Wyślij</button>
                    </td>
                    <td width="30%" class="last">Rozwiązało: {{ solves }}</td>
                </tr>
            </table>
        </form>
        <button class="rem" v-if="admin" @click="removeChallenge">Usuń zadanie</button>
        <div v-if="error" class="error">
            {{ error }}
        </div>
        <div class="start">
            <p v-if="admin">Start: {{ start }}</p>
        </div>
    </main>
    <Fireworks
        v-if="fireworks"
        :style="{
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            position: 'fixed'
        }"
        style="z-index: -1"
    />
</template>

<style scoped>
.title {
    text-align: center;
    font-size: 2rem;
}

.t-center {
    text-align: center;
}

table {
    margin-left: auto;
    margin-right: auto;
    width: 80%;
}

td {
    padding: 2.2rem;
}

table,
td {
    border: 1px solid #fff;
    border-collapse: collapse;
}

.last {
    padding: 0;
    text-align: center;
}

input,
button {
    width: 100%;
    height: 100%;
    padding: 20px;
    margin: 0;
    box-sizing: border-box;
    border: none;
    background-color: rgba(0, 0, 0, 0);
    color: #fff;
    font-size: 1em;
}

input:focus {
    background-color: rgba(255, 255, 255, 0.1);
}

button:hover {
    background-color: rgba(255, 255, 255, 0.1);
    cursor: pointer;
}

button:disabled,
button[disabled],
input:disabled,
input[disabled] {
    background-color: rgba(255, 255, 255, 0.1);
    cursor: unset;
}

.rem {
    display: block;
    cursor: pointer;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1rem;
    padding: 12px 20px;
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

.start {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    text-align: right;
}

.error {
    color: #d44040;
    margin-top: 1em;
    margin-left: auto;
    margin-right: auto;
    width: 80%;
}

.shake {
    animation: shake 0.5s infinite;
}

@keyframes shake {
    0% {
        transform: translate(0);
    }
    20% {
        transform: translate(3em);
    }
    40% {
        transform: translate(-3em);
    }
    60% {
        transform: translate(3em);
    }
    80% {
        transform: translate(-3em);
    }
    100% {
        transform: translate(0);
    }
}

@media screen and (max-width: 700px) {
    table {
        width: 100%;
        overflow-x: auto;
        display: block;
    }

    .title {
        font-size: 1.6rem;
    }
}
</style>
