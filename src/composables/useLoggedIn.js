import axios from 'axios';
import VueCookie from 'vue-cookie';

export async function useLoggedIn() {
    axios
        .get('http://localhost:8080/users/islogged', {
            headers: {
                authorization: 'Bearer ' + VueCookie.get('authorization')
            }
        })
        .then((response) => {
            return response.data;
        })
        .catch(() => {
            return false;
        });
}
