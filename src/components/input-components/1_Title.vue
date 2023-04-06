<template>
    <input class="title" type="text" :placeholder="hint" :title="hint" ref="titleInput" :disabled="ModalOn" />
</template>

<script setup lang="ts">

import { ModalOn } from '@/share/share';

const hint = ref("Topic Name")
const titleInput = ref();

onMounted(async () => { titleInput.value.focus(); });
watchEffect(() => { });

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
    position: relative;
    width: auto;
    font-weight: bold;
    text-align: center;
}
</style>
