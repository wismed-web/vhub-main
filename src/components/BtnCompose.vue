<template>
    <a class="float" @click="toCMS()">
        <font-awesome-icon icon="pen" class="floating" />
    </a>
</template>

<script setup lang="ts">

import { useCookies } from "vue3-cookies";
import { Domain, URL_CMS } from "@/share/ip";

const { cookies } = useCookies();

const toCMS = async () => {

    // *** 'kind', now in cookie ***
    // cookies.set("kind", `${selKind.value}`, "1d", "/", "." + Domain, false, "Lax");
    // cookies.set("name", ``, "1d", "/", "." + Domain, false, "Lax");
    location.replace(`${URL_CMS}`)
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
</style>
