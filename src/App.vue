<template>
    <header v-if="display">
        <UserBar />
    </header>
    <main v-if="display">
        <BtnCompose />
        <div> </div>
    </main>
</template>

<script setup lang="ts">

import { useCookies } from "vue3-cookies";
import { loginUser, loginAuth, loginToken, fillSelf, Mode } from "@/share/share";
import BtnCompose from "@/components/BtnCompose.vue";
import UserBar from "./components/UserBar.vue";

const { cookies } = useCookies();
const HeightOfContent = ref((window.innerHeight * 0.9).toString() + "px");
const display = ref(false);

onMounted(async () => {

    // *** from cookie ***
    // console.log(`${window.location.hostname} ---> ${cookies.keys()}`)

    const token = cookies.get("token")
    loginToken.value = token;
    loginAuth.value = "Bearer " + token;

    // console.log(token)

    if (loginAuth.value.length < 128) {

        alert("invalid auth info");
        display.value = false;

    } else {

        await new Promise((f) => setTimeout(f, 200));
        await fillSelf(); // fill loginUser, already 'ping' back-end api, in this, read 'loginAuth.value'
        await new Promise((f) => setTimeout(f, 500));
        if (loginUser.value.length > 0) {
            display.value = true;
        }
    }
});

</script>

<style scoped>
#right {
    width: 75%;
    height: 92%;
    margin-left: 0%;
    background-color: rgb(200, 200, 200);
    overflow-y: scroll;
    height: v-bind(HeightOfContent);
}
</style>
