<template>
    <header v-if="display">
        <MainTitle />
        <UserBar />
    </header>

    <main v-if="display" id="container">
        <Post v-for="id in PostIDGroup" :id="id" :title="id" />
        <BtnCompose />
        <BtnRefresh />
    </main>

    <footer v-if="display">
    </footer>
</template>

<script setup lang="ts">

import { useCookies } from "vue3-cookies";
import { loginUser, loginAuth, loginToken, fillSelf, getPostID, PostIDGroup } from "@/share/share";
import MainTitle from "./components/MainTitle.vue";
import BtnCompose from "@/components/BtnCompose.vue";
import BtnRefresh from "@/components/BtnRefresh.vue";
import UserBar from "./components/UserBar.vue";
import Post from "./components/Post.vue";

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
        alert("invalid auth");
        display.value = false;
    } else {
        await fillSelf(); // fill loginUser, already 'ping' back-end api, in this, read 'loginAuth.value'
        await new Promise((f) => setTimeout(f, 500));
        if (loginUser.value.length > 0) {
            display.value = true;
        }

        ////////////////////////////////////////////

        await getPostID('time', 200)
        console.log("--->", PostIDGroup.value)
    }
});

</script>

<style scoped>
#container {
    width: 45%;
    height: 100%;
    margin: auto;
    overflow: scroll;
    scrollbar-width: none;
    /* background-color: rgb(220, 220, 220); */
    display: flex;
    flex-direction: column;
    align-items: stretch;
}

#container::-webkit-scrollbar {
    display: none;
}
</style>
