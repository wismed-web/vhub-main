<template>
    <header v-if="display">
        <MainTitle />
        <UserBlock />
    </header>

    <main v-if="display && !ModalOn">

        <div v-if="Mode == 'view'">
            <div id="container-post">
                <Post v-for="id in PostIDGroup" :id="id" :title="id" />
            </div>
            <BtnAdmin />
            <BtnView />
        </div>

        <div v-if="Mode == 'input'" id="container-input">
            <InputTitle />
            <span>
                <InputCategory />
                <InputKeyword />
            </span>
            <InputContent />

            <BtnCompose />
        </div>
    </main>

    <footer v-if="display">
        <notifications position="bottom right" :speed="2000" :duration="9000" :closeOnClick="false" />
    </footer>
</template>

<script setup lang="ts">

import { useCookies } from "vue3-cookies";
import { loginUser, loginAuth, loginToken, fillSelf, ModalOn, Mode, getPostID, PostIDGroup } from "@/share/share";
import MainTitle from "./components/MainTitle.vue";
import UserBlock from "./components/UserBlock.vue";
import BtnView from "@/components/btn-components/BtnView.vue";
import BtnAdmin from "./components/btn-components/BtnAdmin.vue";
import BtnCompose from "@/components/btn-components/BtnCompose.vue";
import Post from "./components/Post.vue";
import InputTitle from "@/components/input-components/1_Title.vue"
import InputCategory from "@/components/input-components/2_Category.vue"
import InputKeyword from "@/components/input-components/3_Keyword.vue"
import InputContent from "@/components/input-components/4_Content.vue"

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

        await getPostID('time', 15 * 4 * 24 * 2) // 2 days
        console.log("--->", PostIDGroup.value)
    }
});

</script>

<style>
html,
body {
    margin: 0;
    height: 100%;
    overflow: hidden
}

#container-post {
    width: 50%;
    height: v-bind(HeightOfContent);
    margin: auto;
    overflow: auto;
    scrollbar-width: auto;
    /* background-color: rgb(225, 100, 100); */
    display: flex;
    flex-direction: column;
    align-items: stretch;
}

#container-post::-webkit-scrollbar {
    display: none;
}

#container-input {
    width: 60%;
    height: 100%;
    margin: auto;
    overflow: scroll;
    scrollbar-width: none;
    /* background-color: rgb(220, 220, 220); */
    display: flex;
    flex-direction: column;
    align-items: stretch;
}

#container-input::-webkit-scrollbar {
    display: none;
}
</style>
