<template>
    <label for="category" id="lbl-category">Categories:</label>
    <input id="category" type="text" :placeholder="hint" :title="hint" v-model="PostCategories" />
</template>

<script setup lang="ts">

import { PostCategories } from '@/share/share';

const hint = ref("separated by semicolon(;)")

onMounted(async () => { });
watchEffect(() => { });

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#category {
    position: relative;
    width: 82%;
    font-weight: normal;
    text-align: left;
    margin: 1% 0% 5% 3%;
    padding-left: 1%;    
}

#lbl-category {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    font-style: italic;
    margin-bottom: 1%;
}
</style>
