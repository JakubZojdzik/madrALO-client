<script>
import axios from 'axios';
import VueCookie from 'vue-cookie';
import { EditorItem } from '../components';

const url = import.meta.env.VITE_APP_API_URL;

export default {
    computed: {
        id() {
            return parseInt(this.$route.params.id, 10);
        }
    },
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
                    `${url}/announcements/edit`,
                    {
                        title: this.title,
                        content: this.content,
                        author: this.author,
                        added: this.added,
                        annId: this.id
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
        },
        async fetchData() {
            let ann;
            try {
                ann = (
                    await axios.get(`${url}/announcements/byId`, {
                        headers: {
                            authorization: `Bearer ${VueCookie.get('authorization')}`
                        },
                        params: {
                            annId: this.id
                        }
                    })
                ).data;
            } catch (error) {
                if (error.response.status === 404 || error.response.status === 400) {
                    this.$router.push('/NotFound');
                }
            }
            this.title = ann.title;
            this.content = ann.content;
            this.author = ann.author;
            this.added = ann.added.slice(0, -1);
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
        <h1>Edycja ogłoszenia</h1>
        <div class="wrapper">
            <form @submit.prevent="submit">
                <label>Tytuł:</label>
                <input v-model="title" type="text" placeholder="Tytuł" required />
                <label>Autor:</label>
                <input v-model="author" type="text" placeholder="Autor" required />
                <label>Treść:</label>
                <EditorItem class="editor" @modelValue="(msg) => (content = msg)" :placeholder="content" />
                <label>Data dodania:</label>
                <input v-model="added" type="datetime-local" ref="dateInp" min="2023-02-01T00:00" required />
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
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
}

label {
    margin-left: -2rem;
}
</style>
