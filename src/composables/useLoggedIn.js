import axios from 'axios';
import VueCookie from 'vue-cookie';

export async function useLoggedIn() {
    console.log("pytanko!");
    axios
        .get('http://localhost:8080/users/islogged', {
            headers: {
                authorization: 'Bearer ' + VueCookie.get('authorization')
            }
        })
        .then((response) => {
            console.log('dostaje', response.data);
            return response.data;
        })
        .catch(() => {
            return false;
        });
}
