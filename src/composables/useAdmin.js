import axios from 'axios';
import VueCookie from 'vue-cookie';

const url = import.meta.env.VITE_APP_API_URL;

export default async function useAdmin() {
    if (!VueCookie.get('authorization')) return false;
    const r = (
        await axios.get(`${url}/users/isAdmin`, {
            headers: {
                authorization: `Bearer ${VueCookie.get('authorization')}`
            }
        })
    ).data;
    return r;
}
