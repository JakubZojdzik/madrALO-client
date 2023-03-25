<script>
import axios from 'axios';
import VueCookie from 'vue-cookie';
import { useLoggedIn } from '../composables/useLoggedIn';

export default {
    computed: {
        id() {
            return this.$route.params.id;
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
            const chall = (await axios.get('http://localhost:8080/challanges/' + this.id.toString())).data;
            this.title = chall.title;
            this.content = chall.content;
            this.author = chall.author;
            this.points = chall.points;
            this.solves = chall.solves;
            this.solved = s.includes(this.id);
        }
    },
    created() {
        this.fetchData();
    }
};
</script>

<template>
    <main>
        <table>
            <tr>
                <th>{{ points }}</th>
                <th>{{ title }}</th>
                <th>Autor: {{ author }}</th>
            </tr>
            <tr>
                <th>
                    {{ content }}
                </th>
            </tr>
            <tr>
                <th>
                    Zrobione? {{ solved }}
                </th>
            </tr>
        </table>
    </main>
</template>

<style scoped>
.title {
    font-size: 3em;
    text-align: center;
    width: 100%;
    margin-top: 3rem;
}
</style>
