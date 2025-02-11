<script>
import axios from 'axios';
import VueCookie from 'vue-cookie';
import { EditorItem } from '../components';

const url = import.meta.env.VITE_APP_API_URL;

export default {
    data() {
        return {
            title: '',
            rules: '',
            start: null,
            end: null,
            freeze: false,
            freezeTime: null
        };
    },
    methods: {
        submit() {
            axios
                .post(
                    `${url}/competition/edit`,
                    {
                        title: this.title,
                        rules: this.rules,
                        start: new Date(this.start).toISOString(),
                        end: new Date(this.end).toISOString(),
                        freeze: this.freeze,
                        freezeTime: new Date(this.freezeTime).toISOString()
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
        submitIcon() {
            const file = this.$refs.file.files[0];

            if (!file) {
                return;
            }

            const formData = new FormData();
            formData.append('icon', file);

            axios
                .post(`${url}/competition/uploadIcon`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        authorization: `Bearer ${VueCookie.get('authorization')}`
                    }
                })
                .then(() => {
                    this.$router.push('/');
                });
        },
        async fetchData() {
            try {
                const tr = (await axios.get(`${url}/competition/timeRange`)).data;
                this.title = (await axios.get(`${url}/competition/title`)).data;
                this.rules = (await axios.get(`${url}/competition/rules`)).data;
                this.start = new Date(tr.start);
                this.end = new Date(tr.end);
                this.freeze = (await axios.get(`${url}/competition/freeze`)).data;
                this.freezeTime = new Date((await axios.get(`${url}/competition/freezeTime`)).data);

                this.start = (new Date(this.start.getTime() - this.start.getTimezoneOffset() * 60000).toISOString()).slice(0, -1);
                this.end = (new Date(this.end.getTime() - this.end.getTimezoneOffset() * 60000).toISOString()).slice(0, -1);
                this.freezeTime = (new Date(this.freezeTime.getTime() - this.freezeTime.getTimezoneOffset() * 60000).toISOString()).slice(0, -1);
            } catch (error) {
                if (error.response.status === 404 || error.response.status === 400) {
                    this.$router.push('/NotFound');
                }
            }
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
        <h1>Edycja konkursu</h1>
        <div class="wrapper">
            <form @submit.prevent="submit">
                <label>Tytuł:</label>
                <input v-model="title" type="text" placeholder="Tytuł" required />
                <label>Opis (zasady):</label>
                <EditorItem class="editor" @modelValue="(msg) => (rules = msg)" :placeholder="rules" />
                <label>Data startu:</label>
                <input v-model="start" type="datetime-local" min="2023-02-01T00:00" required />
                <label>Data zakończenia:</label>
                <input v-model="end" type="datetime-local" min="2023-02-01T00:00" required />
                <label>Zamrażanie rankingu:</label>
                <input v-model="freeze" type="checkbox" />
                <label>Data zamrożenia rankingu:</label>
                <input v-model="freezeTime" type="datetime-local" min="2023-02-01T00:00" required />
                <button type="submit">Zapisz</button>
            </form>
            <form @submit.prevent="submitIcon" class="iconForm">
                <label>Zmień ikonkę:</label>
                <input type="file" accept="image/png" ref="file" required />
                <button type="submit">Wyślij</button>
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

input[type='checkbox'] {
    display: block;
    width: auto;
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

.iconForm {
    margin-top: 3rem;
}
</style>
