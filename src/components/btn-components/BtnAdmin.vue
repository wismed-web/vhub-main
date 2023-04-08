<template>
    <a class="float" id="user-edit" @click="DisplayTable()" v-if="display">
        <font-awesome-icon icon="user-edit" class="floating" />
    </a>
    <a class="float" id="delete-left" @click="DisplayDelPost()" v-if="display">
        <font-awesome-icon icon="delete-left" class="floating" />
    </a>
</template>

<script setup lang="ts">

import { SelfInfo } from '@/share/share';

const display = computed(() => SelfInfo.value.role == 'admin' || SelfInfo.value.role == 'system')

const DisplayTable = async () => {
    alert('show user table')
};

const DisplayDelPost = async () => {
    alert('show delete post')
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.float {
    position: fixed;
    width: 60px;
    height: 60px;
    top: 100px;
    right: 40px;
    background-color: #a5ebca;
    color: #fff;
    border-radius: 50px;
    text-align: center;
    box-shadow: 2px 2px 3px #999;
}

.float:hover {
    background-color: rgb(159, 241, 104);
    cursor: pointer;
}

.floating {
    margin-top: 22px;
    color: white;
}

#user-edit {
    top: 100px;
}

#delete-left {
    top: 180px;
}

</style>
