<script>
import axios from 'axios';
import VueCookie from 'vue-cookie';
import { EditorItem } from '../components';

const url = import.meta.env.VITE_APP_API_URL;

export default {
    data() {
        return {
            title: '',
            content: '',
            author: '',
            added: null
        };
    },
    methods: {
        submit() {
            axios
                .post(
                    `${url}/announcements/add`,
                    {
                        title: this.title,
                        content: this.content,
                        author: this.author,
                        added: this.added
                    },
                    {
                        headers: {
                            'content-type': 'application/x-www-form-urlencoded',
                            authorization: `Bearer ${VueCookie.get('authorization')}`
                        }
                    }
                )
                .then(() => {
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
                <input v-model="added" type="datetime-local" ref="dateInp" min="2023-02-01T00:00" required />
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
