import axios from 'axios';
import VueCookie from 'vue-cookie';

export async function useLoggedIn() {
    const r = (await axios.get('http://localhost:8080/users/islogged', {
        headers: {
            authorization: 'Bearer ' + VueCookie.get('authorization')
        }
    })).data;
    console.log('use:', r);
    return r;
}
