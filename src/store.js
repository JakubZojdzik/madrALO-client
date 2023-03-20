import { createStore } from 'vuex';

export default createStore({
    state() {
        return {
            name: '',
            email: ''
        };
    },
    mutations: {
        setUserData(state, name, email) {
            state.name = name;
            state.email = email;
        }
    }
});
