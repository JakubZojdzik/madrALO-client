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
    }
};
</script>

<template>
    <div :class="{ correct: correct, wrong: !correct }" class="frame">
        <div class="title">
            <b>{{ title }}</b>
        </div>
        <div class="given"><i>{{ name }}</i> podał: {{ given_ans }}</div>
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
    margin-bottom: 1em;
    margin-top: 1em;
    border: 1px solid #fff;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.title {
    padding-right: 1rem;
    width: 30%;
}

.given {
    text-align: right;
    width: 70%;
}


@media screen and (max-width: 700px) {
    .content {
        display: none;
    }
    .link {
        width: 95%;
    }
}
</style>
