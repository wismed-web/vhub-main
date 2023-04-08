<template>
    <a class="float" id="pen" @click="Compose()">
        <font-awesome-icon icon="pen" class="floating" />
    </a>
    <a class="float" id="refresh" @click="MorePosts()">
        <font-awesome-icon icon="refresh" class="floating" />
    </a>
    <Loader v-if="showLoader" id="page-loader" />
</template>

<script setup lang="ts">

import { Mode, getPostID, PostIDGroup } from "@/share/share";
import Loader from "../sub-components/Loader.vue";

const Compose = async () => {
    Mode.value = 'input'
}

const showLoader = ref(false)
const MorePosts = async () => {
    showLoader.value = true
    await getPostID('time', 5)
    console.log("--->", PostIDGroup.value)
    showLoader.value = false
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.float {
    position: fixed;
    width: 60px;
    height: 60px;
    bottom: 120px;
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

#pen {
    bottom: 120px;
}

#refresh {
    bottom: 40px;
}
</style>
