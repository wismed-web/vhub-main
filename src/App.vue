<template>
    <header v-if="display">
        <MainTitle />
        <UserBlock />
    </header>

    <main v-if="display">

        <div v-if="Mode == 'view'">
            <div id="container-post">
                <Post v-for="id in PostIDGroup" :id="id" :title="id" />
            </div>
            <BtnUserTable />
            <BtnCompose />
            <BtnRefresh />
        </div>

        <div v-if="Mode == 'input'" id="container-input">
            <InputTitle />
            <span>
                <InputCategory />
                <InputKeyword />
            </span>
            <InputContent />
            <BtnSubmit />
            <BtnExit />
        </div>

    </main>

    <footer v-if="display">
    </footer>
</template>

<script setup lang="ts">

import { useCookies } from "vue3-cookies";
import { loginUser, loginAuth, loginToken, fillSelf, Mode, getPostID, PostIDGroup } from "@/share/share";
import MainTitle from "./components/MainTitle.vue";
import UserBlock from "./components/UserBlock.vue";
import BtnCompose from "@/components/btn-components/BtnCompose.vue";
import BtnRefresh from "@/components/btn-components/BtnRefresh.vue";
import BtnUserTable from "./components/btn-components/BtnUserTable.vue";
import BtnSubmit from "@/components/btn-components/BtnSubmit.vue";
import BtnExit from "@/components/btn-components/BtnExit.vue";
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

        await getPostID('count', 5)
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
