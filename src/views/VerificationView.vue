<script>
import axios from 'axios';

export default {
    created() {
        console.log('mam', this.$route.query.token);
        axios
            .post(
                'http://localhost:8080/users/verify',
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
