<template>
    <a class="float" @click="DisplayTable()" v-if="!ModalOn && display">
        <font-awesome-icon icon="table" class="floating" />
    </a>
</template>

<script setup lang="ts">

import { ModalOn, SelfInfo } from '@/share/share';

const display = computed(() => SelfInfo.value.role == 'admin' || SelfInfo.value.role == 'system')

const DisplayTable = async () => {
    alert('show user table')
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.float {
    position: fixed;
    width: 60px;
    height: 60px;
    bottom: 200px;
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
