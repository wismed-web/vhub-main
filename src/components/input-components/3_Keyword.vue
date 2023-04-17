<template>
    <label for="keyword" id="lbl-keyword">Keywords:</label>
    <input id="keyword" type="text" :placeholder="hint" :title="hint" v-model="PostKeywords" />
</template>

<script setup lang="ts">

import { PostKeywords } from '@/share/share';

const hint = ref("separated by semicolon(;)")

onMounted(async () => { });
watchEffect(() => { });

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#keyword {
    position: relative;
    width: 82%;
    font-weight: normal;
    text-align: left;
    margin: 1% 0% 5% 3%;
    padding-left: 1%;
}

#lbl-keyword {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    font-style: italic;
    margin-bottom: 1%;
}
</style>
