<template>
    <a class="float" @click="Mode = 'view'" v-if="!ModalOn">
        <font-awesome-icon icon="right-from-bracket" class="floating" />
    </a>
</template>

<script setup lang="ts">

import { Mode, ModalOn } from '@/share/share';

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.float {
    position: fixed;
    width: 60px;
    height: 60px;
    bottom: 40px;
    right: 40px;
    background-color: #8bcef2;
    color: #fff;
    border-radius: 50px;
    text-align: center;
    box-shadow: 2px 2px 3px #999;
}

.float:hover {
    background-color: rgb(101, 149, 243);
    cursor: pointer;
}

.floating {
    margin-top: 22px;
    color: white;
}
</style>
