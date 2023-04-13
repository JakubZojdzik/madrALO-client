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
        odd: Boolean,
    },
    components: {
        RouterLink
    },
};
</script>

<template>
    <RouterLink class="link" :to="'/challenge/' + id.toString()">
        <div :class="{ solved: solved, inactive: !current, odd: odd }" class="frame">
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
    display: block;
    color: #fff;
    text-decoration: none;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
}

.odd {
    background: rgba(255, 255, 255, 0.05);
}

.frame {
    margin-bottom: 1em;
    margin-top: 1em;
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
    width: 15%;
}

.content {
    text-decoration: none;
    width: 70%;
}

.solves {
    text-decoration: none;
}

.inactive {
    background: rgba(255, 255, 255, 0.1);
}
</style>
