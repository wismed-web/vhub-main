<template>
    <div class="user-bar">
        <img src="/favicon.ico" alt="avatar" class="img-area" @click="setUser()">
        <div class="name-area">
            <p>@{{ loginUser }}</p>
            <p>{{ loginSelfInfo.name }}</p>
        </div>
        <UserBarModal v-bind:visible="showModal"  @confirm="confirm" @cancel="cancel" />
    </div>
</template>

<script setup lang="ts">

import { useCookies } from "vue3-cookies";
import { Domain, IP_CMS } from "@/share/ip";
import { loginUser, loginToken, loginAuth, loginSelfInfo } from "@/share/share"
import UserBarModal from "@/components/UserBarModal.vue"

const { cookies } = useCookies();
const showModal = ref(false)

const setUser = async () => {

    // *** 'kind', now in cookie ***
    // cookies.set("kind", `${selKind.value}`, "1d", "/", "." + Domain, false, "Lax");
    // cookies.set("name", ``, "1d", "/", "." + Domain, false, "Lax");
    // location.replace(`${IP_CMS}`)

    showModal.value = true;

};

const confirm = async (result: any) => {
    showModal.value = false;
}

const cancel = async () => {
    showModal.value = false
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user-bar {
    position: fixed;
    width: 160px;
    height: 60px;
    top: 1%;
    right: 1%;
    background-color: #eee;
    color: #fff;
    text-align: center;
    /* box-shadow: 2px 2px 3px #999; */
}

.img-area {
    float: left;
    margin-top: 10%;
    margin-left: 10%;
    color: white;
}

.img-area:hover {
    cursor: pointer;
}

.name-area {
    float: left;
    color: black;
    font-size: x-small;
    margin-top: 1%;
    margin-left: 10%;
    text-align: left;
}
</style>
