<script>
export default {
    props: {
        name: String,
        email: String,
        points: Number,
        position: Number
    }
};
</script>

<template>
    <div class="frame">
        <div class="pos">
            <b>{{ position }}</b>
        </div>
        <div class="name">
            {{ name }}
        </div>
        <div class="email">
            {{ email }}
        </div>
        <div class="points">
            {{ points }} pkt
        </div>
    </div>
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
    margin-top: -1px;
    border: 1px solid #fff;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.frame:hover {
    background: rgba(255, 255, 255, 0.1);
}

.pos {
    width: 10%;
    text-align: left;
    padding-left: 1rem;
}

.name {
    width: 40%;
    text-align: right;
    padding-right: 1rem;
}

.email {
    width: 40%;
    text-align: left;
    padding-left: 1rem;
}

.points {
    width: 10%;
    text-align: right;
}

</style>
