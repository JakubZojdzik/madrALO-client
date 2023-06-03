<script>
import { UserTileItem } from '../components';
import axios from 'axios';
import { useLoggedIn } from '../composables';

const url = import.meta.env.VITE_APP_API_URL;

export default {
    data() {
        return {
            usrs: null
        };
    },
    methods: {
        async fetchData() {
            const logged = await useLoggedIn();
            this.usrs = (await axios.get(url + '/users/ranking')).data;
            this.usrs.forEach((x) => {
                if (x.id === logged) {
                    x.active = true;
                }
            });
        }
    },
    created() {
        this.fetchData();
    },
    components: {
        UserTileItem
    }
};
</script>

<template>
    <main>
        <div class="heading">
            <div class="pos">
                Miejsce
            </div>
            <div class="name">
                Nazwa
            </div>
            <div class="points">Wynik</div>
        </div>
        <UserTileItem v-for="{ name, position, points, active } in usrs" :key="name" :name="name" :email="email" :position="position" :points="points" :active="active" />
        <ul></ul>
    </main>
</template>

<style scoped>
.heading {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid #fff;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(255, 255, 255, 0.1);
    font-size: 1.3rem;
    font-weight: bold;
}

.pos {
    width: 10%;
    text-align: left;
    padding-left: 1rem;
}

.name {
    width: 75%;
    text-align: left;
    padding-right: 1rem;
}


.points {
    width: 15%;
    text-align: right;
}
</style>
