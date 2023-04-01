<script>
import { EditorItem } from '../components';
import axios from 'axios';
import VueCookie from 'vue-cookie';

export default {
    data() {
        return {
            title: '',
            content: '',
            answer: '',
            author: '',
            points: null,
            start: null,
        };
    },
    methods: {
        submit() {
            axios
                .post(
                    'http://localhost:8080/challanges/addChallange',
                    {
                        title: this.title,
                        content: this.content,
                        answer: this.answer,
                        author: this.author,
                        points: this.points,
                        start: this.start,
                    },
                    {
                        headers: {
                            'content-type': 'application/x-www-form-urlencoded',
                            authorization: 'Bearer ' + VueCookie.get('authorization')
                        }
                    }
                )
                .then((response) => {
                    console.log('odbieram', response);
                    this.$router.push('/');
                });
        }
    },
    components: {
        EditorItem
    }
};
</script>

<template>
    <main>
        <div class="wrapper">
            <form @submit.prevent="submit">
                <input v-model="title" type="text" placeholder="Tytuł" required />
                <input v-model="author" type="text" placeholder="Autor" required />
                <EditorItem @modelValue="(msg) => (content = msg)" />
                <input v-model="answer" type="text" placeholder="Odpowiedź" required />
                <input v-model="points" type="number" placeholder="Punkty" required />
                <input v-model="start" type="datetime-local" ref="dateInp" min="2023-02-01T00:00" max="2024-01-01T00:00" required />
                <button type="submit">Zapisz</button>
            </form>
        </div>
    </main>
</template>

<style scoped>
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
</style>
