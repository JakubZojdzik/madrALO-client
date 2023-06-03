<script>
export default {
    props: {
        name: String,
        email: String,
        points: Number,
        position: Number,
        active: Boolean
    }
};
</script>

<template>
    <div :class="{ podium: position <= 3, active: active}" class="frame">
        <div class="pos">
            {{ position }}
        </div>
        <div class="name">
            {{ name }}
        </div>
        <div class="points">{{ points }} pkt</div>
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
    width: 15%;
    text-align: left;
    padding-left: 1rem;
}

.name {
    width: 70%;
    text-align: right;
    padding-right: 1rem;
}


.points {
    width: 15%;
    text-align: right;
}

.podium {
    font-size: 1.3rem;
    font-weight: bold;
}

.active {
    background: rgba(255, 255, 255, 0.1);
}

</style>
