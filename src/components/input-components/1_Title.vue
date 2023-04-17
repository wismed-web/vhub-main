<template>
    <label for="title" id="lbl-title">Title:</label>
    <input id="title" type="text" :placeholder="hint" :title="hint" ref="titleInput" v-model="PostTitle" />
</template>

<script setup lang="ts">

import { PostTitle } from '@/share/share';

const hint = ref("Topic Name")
const titleInput = ref();

onMounted(async () => { titleInput.value.focus(); });
watchEffect(() => { });

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#title {
    position: relative;
    width: 82%;
    font-weight: normal;
    text-align: left;
    margin: 1% 0% 5% 3%;
    padding-left: 1%;
}

#lbl-title {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    font-style: italic;
    margin-bottom: 1%;
}

</style>
