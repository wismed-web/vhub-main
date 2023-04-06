<template>
    <a class="float" @click="MorePosts()" v-if="!ModalOn">
        <font-awesome-icon icon="refresh" class="floating" />
    </a>
    <Loader v-if="showPageLoader" id="page-loader" />
</template>

<script setup lang="ts">

import { getPostID, PostIDGroup, ModalOn } from "@/share/share";
import Loader from "./sub-components/Loader.vue";

const showPageLoader = ref(false)

const MorePosts = async () => {
    showPageLoader.value = true
    await getPostID('count', PostIDGroup.value !== undefined ? PostIDGroup.value.length + 3 : 3)
    console.log("--->", PostIDGroup.value)
    showPageLoader.value = false
};

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

/* loader */
#page-loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
