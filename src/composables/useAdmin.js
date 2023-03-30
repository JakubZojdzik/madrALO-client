import axios from 'axios';
import VueCookie from 'vue-cookie';

export async function useLoggedIn() {
    if (!VueCookie.get('authorization')) return false;
    const r = (
        await axios.get('http://localhost:8080/users/isAdmin', {
            headers: {
                authorization: 'Bearer ' + VueCookie.get('authorization')
            }
        })
    ).data;
    return r;
}
