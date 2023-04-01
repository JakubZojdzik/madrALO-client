<script>
import { RouterLink } from 'vue-router';
export default {
    props: {
        id: Number,
        title: String,
        content: String,
        points: Number,
        solves: Number,
        solved: Boolean,
        current: Boolean,
    },
    components: {
        RouterLink
    }
};
</script>

<template>
    <RouterLink class="link" :to="'/challange/' + id.toString()">
        <div :class="{ solved: solved, inactive: !current }" class="frame">
            <div class="title">
                <b>{{ title }}</b>
                <br />({{ points }} pkt)
            </div>
            <div class="content">
                {{ content }}
            </div>
            <div class="solves">{{ solves }} rozwiązań</div>
        </div>
    </RouterLink>
</template>

<style scoped>
.link {
    color: #fff;
    text-decoration: none;
}

.frame {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1rem;
    margin-top: 1rem;
    border: 1px solid #fff;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.frame:hover {
    background: rgba(255, 255, 255, 0.1);
}

.solved {
    background-color: rgb(64, 212, 108);
}

.solved:hover {
    background: rgba(64, 212, 108, 0.8);
}

.title {
    padding-right: 1rem;
    width: 10%;
}

.content {
    text-decoration: none;
    width: 75%;
}

.solves {
    text-decoration: none;
}

.inactive {
    background: rgba(255, 255, 255, 0.1);
}
</style>
