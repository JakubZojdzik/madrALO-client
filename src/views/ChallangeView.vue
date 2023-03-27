<script>
import axios from 'axios';
import VueCookie from 'vue-cookie';
import { useLoggedIn } from '../composables/useLoggedIn';
import { Fireworks } from '@fireworks-js/vue';

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
            fireworks: false
        };
    },
    methods: {
        async fetchData() {
            let s = [];
            const lgd = await useLoggedIn();
            if (lgd) {
                this.logged = true;
                s = (
                    await axios.get('http://localhost:8080/users/solves', {
                        headers: {
                            authorization: 'Bearer ' + VueCookie.get('authorization')
                        }
                    })
                ).data;
            }
            const chall = (await axios.get('http://localhost:8080/challanges/' + this.id)).data;
            this.title = chall.title;
            this.content = chall.content;
            this.author = chall.author;
            this.points = chall.points;
            this.solves = chall.solves;
            this.solved = s.includes(this.id);
        },

        submitAnswer() {
            console.log('submituje');
            axios
                .post(
                    'http://localhost:8080/challanges/solve',
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
                    }
                });
        }
    },
    created() {
        this.fetchData();
    },
    components: {
        Fireworks
    }
};
</script>

<template>
    <main class="fireworks">
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
                    <span style="white-space: pre-wrap">
                        {{ content }}
                    </span>
                </td>
            </tr>
        </table>
        <form @submit.prevent="submitAnswer">
            <table style="margin-top: -1px">
                <tr>
                    <td width="50%" class="last">
                        <input :disabled="solved" v-model="answer" type="text" name="answer" placeholder="Odpowiedź" />
                    </td>
                    <td width="20%" class="last">
                        <button :disabled="solved" type="submit">Wyślij</button>
                    </td>
                    <td width="30%" class="last">Rozwiązało: {{ solves }}</td>
                </tr>
            </table>
        </form>
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

button:disabled, button[disabled], input:disabled, input[disabled] {
    background-color: rgba(255, 255, 255, 0.1);
    cursor: unset;
}
</style>
