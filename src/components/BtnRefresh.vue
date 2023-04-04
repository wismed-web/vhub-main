<template>
    <a class="float" @click="MorePosts()">
        <font-awesome-icon icon="refresh" class="floating" />
    </a>
</template>

<script setup lang="ts">

import { getPostID, PostIDGroup } from "@/share/share";

const MorePosts = async () => {
    await getPostID('time', 200)
    console.log("--->", PostIDGroup.value)
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
</style>
