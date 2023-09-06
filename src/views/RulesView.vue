<script>
import axios from 'axios';

const url = import.meta.env.VITE_APP_API_URL;

export default {
    data() {
        return {
            rules: String
        }
    },
    methods: {
        async fetchData() {
            this.rules = (
                await axios.get(`${url  }/competition/rules`)
            ).data;
        },
    },
    mounted() {
        this.fetchData();
    }
};
</script>

<template>
    <main>
        <div class="wrapper">
            <span v-html="rules"></span>
            <br />
            <p>
                Aplikacja <b><i>SOK</i></b> na licencji MIT dostępna na githubie:
                <a class="whitelink" href="https://github.com/JakubZojdzik/SOK-client" target="_blank" rel="noopener noreferrer">Client</a>,
                <a class="whitelink" href="https://github.com/JakubZojdzik/SOK-api" target="_blank" rel="noopener noreferrer">API</a>
            </p>
        </div>
    </main>
</template>

<style scoped>
.wrapper {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    line-height: 3rem;
}

.whitelink {
    color: white
}

@media screen and (max-width: 700px) {
    .wrapper {
        width: 95%;
    }
}
</style>
