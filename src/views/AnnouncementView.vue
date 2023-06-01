<script>
import axios from 'axios';
import VueCookie from 'vue-cookie';

const url = import.meta.env.VITE_APP_API_URL;

export default {
    props: {
        id: Number,
        title: String,
        content: String,
        author: String,
        added: String,
        admin: Boolean,
    },
    methods: {
        removeChallenge() {
            axios
                .delete(url + '/annoucements/removeById', {
                    data: {
                        annId: this.id
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
    }
};
</script>

<template>
    <main>
        <table>
            <tr>
                <td width="70%" class="title">
                    <b>{{ title }}</b>
                </td>
                <td width="30%" class="t-center">Autor: {{ author }}</td>
            </tr>
            <tr>
                <td colspan="3">
                    <span v-html="content" style="white-space: pre-wrap"></span>
                </td>
            </tr>
            <tr>
                <td class="date" colspan="3">
                    {{ added }}
                </td>
            </tr>
        </table>
        <button class="rem" v-if="admin" @click="removeChallenge">Usuń ogłoszenie</button>
    </main>
</template>

<style scoped>
.title {
    text-align: center;
    font-size: 1.6rem;
}

.t-center {
    text-align: center;
}

table {
    margin-left: auto;
    margin-right: auto;
    width: 80%;
    margin-bottom: 5rem;
}

td {
    padding: 1.3rem;
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

.date {
    text-align: right;
}

</style>
