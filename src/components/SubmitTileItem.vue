<script>
export default {
    props: {
        corr_ans: String,
        correct: Boolean,
        given_ans: String,
        id: Number,
        name: String,
        sent: String,
        title: String
    },
    data() {
        return {
            expanded: false
        };
    },
    methods: {
        toggle() {
            this.expanded = !this.expanded;
        }
    }
};
</script>

<template>
    <div v-on:click="toggle" :class="{ correct: correct, wrong: !correct }" class="frame">
        <div class="sentdate">
            {{ sent }}
        </div>
        <div class="name">
            <b>{{ name }}</b>:
            {{ title }}
        </div>
        <div v-if="expanded" class="given">{{ given_ans }} <span v-if="(!correct) && corr_ans"><b>/</b> {{ corr_ans }}</span></div>
    </div>
</template>

<style scoped>
.correct {
    background: linear-gradient(90deg, rgba(64, 212, 108, 1) 0%, rgba(0, 0, 0, 0) 20%);
}

.correct:hover {
    background: linear-gradient(90deg, rgba(64, 212, 108, 1) 0%, rgba(255, 255, 255, 0.1) 20%);
}

.wrong {
    background: linear-gradient(90deg, rgba(155, 17, 30, 1) 0%, rgba(0, 0, 0, 0) 20%);
}

.wrong:hover {
    background: linear-gradient(90deg, rgba(155, 17, 30, 1) 0%, rgba(255, 255, 255, 0.1) 20%);
}

.frame {
    font-size: 1rem;
    margin-bottom: 1em;
    margin-top: 1em;
    padding: .7rem 2rem .7rem 2rem;
    border: 1px solid #fff;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    cursor: pointer;
}

.sentdate {
    padding-right: 4rem;
}

.name {
    padding-right: 2rem;
    text-align: right;
    margin-left: auto;
}


@media screen and (max-width: 700px) {
    .sentdate, .given {
        width: 100%;
    }
}
</style>
