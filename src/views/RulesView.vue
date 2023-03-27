<script>
import { UserTileItem } from '../components';

export default {
    components: {
        UserTileItem
    }
};
</script>

<template>
    <main>
        <UserTileItem name="Jan" email="jp2@papaj.com" position="{{1}}" points="{{2137}}" />
        <UserTileItem name="PanJawel" email="jp2@papaj.com" position="{{2}}" points="{{2137}}" />
        <UserTileItem name="Jan" email="jp2@papaj.com" position="{{3}}" points="{{2137}}" />
        <UserTileItem name="Jan" email="jp2@papaj.com" position="{{4}}" points="{{2137}}" />
        <ul></ul>
    </main>
</template>
