<template>
    <header v-if="display">
        <MainTitle />
        <SelfBlock />
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
        <div v-if="Mode == 'users'">
            <UserList />
            <BtnUserList />
        </div>
    </main>

    <footer v-if="display">
    </footer>

    <notifications position="top center" :speed="2000" :duration="6000" :closeOnClick="false" />
</template>

<script setup lang="ts">

import { useCookies } from "vue3-cookies";
import { useNotification } from "@kyvg/vue3-notification";
import { loginUser, loginAuth, loginToken, loginAsAdmin, getSelfName, getUserInfoList, ModalOn, Mode, getPostID, PostIDGroup, SelfInfo } from "@/share/share";
import MainTitle from "./components/MainTitle.vue";
import SelfBlock from "./components/SelfBlock.vue";
import BtnView from "@/components/btn-components/BtnView.vue";
import BtnAdmin from "./components/btn-components/BtnAdmin.vue";
import BtnCompose from "@/components/btn-components/BtnCompose.vue";
import Post from "./components/Post.vue";
import InputTitle from "@/components/input-components/1_Title.vue"
import InputCategory from "@/components/input-components/2_Category.vue"
import InputKeyword from "@/components/input-components/3_Keyword.vue"
import InputContent from "@/components/input-components/4_Content.vue"
import UserList from "./components/UserList.vue";
import BtnUserList from "./components/btn-components/BtnUserList.vue";

const { cookies } = useCookies();
const notification = useNotification()

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

        notification.notify({
            title: "Error",
            text: "Invalid Auth Info",
            type: "error"
        })
        display.value = false;

    } else {

        {
            const de = await getSelfName();
            if (de.error != null) {
                notification.notify({
                    title: "Error: Cannot Get Self User Name",
                    text: de.error,
                    type: "error"
                })
                display.value = false;
                return
            }
            loginUser.value = de.data
        }
        {
            const de = await getUserInfoList(loginUser.value, "")
            if (de.error != null) {
                notification.notify({
                    title: "Error: Cannot Get Self Info",
                    text: de.error,
                    type: "error"
                })
                display.value = false;
                return
            }
            SelfInfo.value = de.data[0]
            loginAsAdmin.value = de.data[0].role == 'admin' || de.data[0].role == 'system' ? true : false
        }

        // await new Promise((f) => setTimeout(f, 500));

        display.value = true;

        {
            const de = await getPostID('time', 15 * 4 * 24 * 2) // 2 days
            if (de.error != null) {
                notification.notify({
                    title: "Error: Get Post ID",
                    text: de.error,
                    type: "error"
                })
                return
            }
            if (de.data.length == 0) {
                notification.notify({
                    title: "",
                    text: "no posts available",
                    type: "warn"
                })
                return
            }
            PostIDGroup.value = [...new Set(de.data.concat(PostIDGroup.value))];
            PostIDGroup.value = PostIDGroup.value.filter((element: any) => element !== undefined)
            console.log("--->", PostIDGroup.value)
        }
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
