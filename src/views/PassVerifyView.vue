<script>
import axios from 'axios';

const url = import.meta.env.VITE_APP_API_URL;

export default {
    created() {
        axios
            .post(
                `${url}/users/verifyPass`,
                {
                    token: this.$route.query.token
                },
                { headers: { 'content-type': 'application/x-www-form-urlencoded' } }
            )
            .then(() => {
                this.$router.push('/login');
            });
    }
};
</script>

<template>
    <div></div>
</template>
