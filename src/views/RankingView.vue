<script>
import axios from 'axios';
import VueCookie from 'vue-cookie';

export default {
    data() {
        return {
            email: '',
            password: '',
            err: ''
        };
    },
    methods: {
        dane() {
            axios
                .get('http://localhost:8080/users/myid', {
                    headers: {
                        authorization: 'Bearer ' +  VueCookie.get('authorization')
                    }
                })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
};
</script>

<template>
    <div class="wrapper">
        <button type="submit" @click="dane">Zaloguj</button>
    </div>
</template>

<style scoped></style>
