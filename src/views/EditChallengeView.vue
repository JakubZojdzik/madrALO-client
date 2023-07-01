<script>
import { EditorItem } from '../components';
import axios from 'axios';
import VueCookie from 'vue-cookie';

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
            answer: '',
            author: '',
            points: null,
            solves: null,
            start: null
        };
    },
    methods: {
        submit() {
            axios
                .post(
                    url + '/challenges/edit',
                    {
                        title: this.title,
                        content: this.content,
                        answer: this.answer,
                        author: this.author,
                        points: this.points,
                        solves: this.solves,
                        start: this.start,
                        challId: this.id
                    },
                    {
                        headers: {
                            'content-type': 'application/x-www-form-urlencoded',
                            authorization: 'Bearer ' + VueCookie.get('authorization')
                        }
                    }
                )
                .then(() => {
                    this.$router.push('/');
                });
        },
        async fetchData() {
            let chall, corrAns;
            try {
                chall = (
                    await axios.get(url + '/challenges/byId', {
                        headers: {
                            authorization: 'Bearer ' + VueCookie.get('authorization')
                        },
                        params: {
                            challId: this.id
                        }
                    })
                ).data;
                corrAns = (
                    await axios.get(url + '/challenges/correctAnswer', {
                        headers: {
                            authorization: 'Bearer ' + VueCookie.get('authorization')
                        },
                        params: {
                            challId: this.id
                        }
                    })
                ).data;
            } catch (error) {
                if (error.response.status === 404 || error.response.status === 400) {
                    this.$router.push('/NotFound');
                }
            }
            this.answer = corrAns;
            this.title = chall.title;
            this.content = chall.content;
            this.author = chall.author;
            this.points = chall.points;
            this.solves = chall.solves;
            this.start = chall.start.slice(0, -1);
        }
    },
    mounted() {
        this.fetchData();
    },
    components: {
        EditorItem
    }
};
</script>

<template>
    <main>
        <h1>Edycja zadania</h1>
        <div class="wrapper">
            <form @submit.prevent="submit">
                <label>Tytuł:</label>
                <input v-model="title" type="text" placeholder="Tytuł" required />
                <label>Autor:</label>
                <input v-model="author" type="text" placeholder="Autor" required />
                <label>Treść:</label>
                <EditorItem class="editor" @modelValue="(msg) => (content = msg)" :placeholder="content" />
                <label>Odpowiedź:</label>
                <input v-model="answer" type="text" placeholder="Odpowiedź" required />
                <label>Punkty:</label>
                <input v-model="points" type="number" placeholder="Punkty" required />
                <label>Rozwiązań:</label>
                <input v-model="solves" type="number" placeholder="Rozwiązań" required />
                <label>Data startu:</label>
                <input v-model="start" type="datetime-local" ref="dateInp" min="2023-02-01T00:00" max="2024-01-01T00:00" required />
                <button type="submit">Zapisz</button>
            </form>
        </div>
    </main>
</template>

<style scoped>
h1 {
    text-align: center;
}
.wrapper {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
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

.editor {
    margin-top: .5rem;
    margin-bottom: .5rem;
}

label {
    margin-left: -2rem;
}
</style>
