<template>
    <a class="float" id="backward" title="go back" @click="Exit()">
        <font-awesome-icon icon="backward" class="floating" />
    </a>
</template>

<script setup lang="ts">

import { PostListOn } from "@/share/share";

const Exit = async () => {
    PostListOn.value = true
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.float {
    position: fixed;
    width: 60px;
    height: 60px;
    bottom: 120px;
    right: 40px;
    background-color: #79c8f3;
    color: #fff;
    border-radius: 50px;
    text-align: center;
    box-shadow: 2px 2px 3px #999;
}

.float:hover {
    background-color: rgb(144, 238, 244);
    cursor: pointer;
}

.floating {
    margin-top: 22px;
    color: white;
}

#backward {
    bottom: 40px;
}
</style>
