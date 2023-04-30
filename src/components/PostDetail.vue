<template>
    <h2 id="post-title">{{ DetailTitle }}</h2>
    <h6 id="post-author"> {{ DetailAuthor + " @" + PostTime }}</h6>
    <hr id="title-line">
    <div id="post-detail">
        <div v-html="DetailHTML"> </div>
    </div>
</template>

<script setup lang="ts">

import { DetailTitle, DetailAuthor, DetailHTML, DetailTime } from '@/share/share'

const PostTime = computed(() => DetailTime.value.substring(0, 19))

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#post-title {
    text-align: center;
    font-family: 'Courier New', Courier, monospace;
    margin-bottom: -0.2%;
}

#post-author {
    text-align: right;
    font-family: 'Courier New', Courier, monospace;
    margin: 0 1% -0.3% 0%;
}

#title-line {
    width: 100%;
    border-top: 0.8px #4095ef;
}

#post-detail {
    margin-left: 3%;
}
</style>
