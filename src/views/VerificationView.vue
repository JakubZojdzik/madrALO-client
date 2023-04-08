<script>
import axios from 'axios';

const url = import.meta.env.VITE_APP_API_URL;

export default {
    created() {
        console.log('mam', this.$route.query.token);
        axios
            .post(
                url + '/users/verify',
                {
                    token: this.$route.query.token
                },
                { headers: { 'content-type': 'application/x-www-form-urlencoded' } }
            )
            .then(() => {
                this.$router.push('/thanks');
            });
    }
};
</script>

<template>
    <div></div>
</template>

<style scoped></style>
