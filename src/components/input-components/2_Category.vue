<template>
    <input class="cat" type="text" :placeholder="hint" :title="hint" v-model="PostCategories" />
</template>

<script setup lang="ts">

import { PostCategories } from '@/share/share';

const hint = ref("Categories (separated by semicolon(;))")

onMounted(async () => { });
watchEffect(() => { });

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cat {
    position: relative;
    float: left;
    width: 48%;
    font-weight: bold;
    text-align: left;
    margin-top: 1%;
    margin-bottom: 1%;
    padding-left: 1%;
}
</style>
