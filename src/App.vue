<template>
    <header v-if="display">
        <MainTitle />
        <SelfBlock />
    </header>

    <main v-if="display">

        <div v-if="Mode == 'view'">
            <div v-if="PostListOn" id="container-post-list">
                <Post v-for="id in PostIDGroup" :id="id" :title="id" @onRenderPost="RenderPost" />
                <BtnViewList />
            </div>
            <div v-else id="container-post-detail">
                <PostDetail />
                <BtnViewDetail />
            </div>
            <BtnAdmin />
        </div>

        <div v-if="Mode == 'input'" id="container-input">
            <div id="container-input-left">
                <InputTitle />
                <InputKeyword />
                <InputCategory />
                <UploadVideo />
            </div>
            <div id="container-input-right">
                <InputContent :hidden="ModalOn" />
            </div>
            <BtnCompose />
        </div>

        <div v-if="Mode == 'users'">
            <UserList />
            <BtnUserList />
        </div>

    </main>

    <footer v-if="display">
    </footer>

    <notifications position="top center" :speed="2000" :duration="4000" :closeOnClick="false" />
</template>

<script setup lang="ts">

import { useCookies } from "vue3-cookies";
import { useNotification } from "@kyvg/vue3-notification";
import { loginUser, loginAuth, loginToken, loginAsAdmin, getSelfName, getUserInfoList, ModalOn, Mode, getPostID, PostIDGroup, SelfInfo, PostListOn, DetailHTML, DetailTitle, DetailAuthor, DetailTime } from "@/share/share";
import MainTitle from "./components/MainTitle.vue";
import SelfBlock from "./components/SelfBlock.vue";
import Post from "./components/Post.vue";
import PostDetail from '@/components/PostDetail.vue'
import InputTitle from "@/components/input-components/1_Title.vue"
import InputCategory from "@/components/input-components/2_Category.vue"
import InputKeyword from "@/components/input-components/3_Keyword.vue"
import UploadVideo from "@/components/input-components/4_Video.vue"
import InputContent from "@/components/input-components/5_Content.vue"
import UserList from "./components/UserList.vue";
import BtnViewList from "@/components/btn-components/BtnViewList.vue";
import BtnViewDetail from "@/components/btn-components/BtnViewDetail.vue";
import BtnAdmin from "./components/btn-components/BtnAdmin.vue";
import BtnCompose from "@/components/btn-components/BtnCompose.vue";
import BtnUserList from "./components/btn-components/BtnUserList.vue";

const { cookies } = useCookies();
const notification = useNotification()

const HeightOfContent = ref((window.innerHeight * 0.91).toString() + "px");
const HeightOfInput = ref((window.innerHeight * 0.84).toString() + "px");
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
                    title: "Failed to get self user name",
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
                    title: "Failed to get self info",
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
                    title: "Get Post ID",
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
            // console.log("--->", PostIDGroup.value)
        }
    }
});

const RenderPost = async (title: string, author: string, time: string, html: string) => {
    // assign detail value from Post clicking
    DetailTitle.value = title
    DetailAuthor.value = author
    DetailTime.value = time
    DetailHTML.value = html

    // display detail page
    PostListOn.value = false
}

</script>

<style>
html,
body {
    margin: 0;
    height: 100%;
    overflow: hidden
}

/* ///////////////////////////////// */

#container-post-list {
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

#container-post-list::-webkit-scrollbar {
    display: none;
}

#container-post-detail {
    width: 50%;
    height: v-bind(HeightOfContent);
    margin: auto;
    overflow: auto;
    /* overflow-x: hidden; */
    scrollbar-width: auto;
    background-color: rgb(250, 250, 250);
    display: flex;
    flex-direction: column;
    align-items: stretch;
    box-shadow: 4px 3px 4px #999;
}

#container-post-detail::-webkit-scrollbar {
    display: none;
}

/* ///////////////////////////////// */

/* INPUT */

#container-input {
    width: 98%;
    height: 100%;
    margin: auto;
    display: flex;
    flex-direction: row;
    align-items: stretch;
}

#container-input::-webkit-scrollbar {
    display: none;
}

/* LEFT */

#container-input-left {
    width: 20%;
    height: v-bind(HeightOfInput);
    margin-top: 1%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    /* background-color: rgb(144, 200, 221); */
}

/* RIGHT */

#container-input-right {
    width: 80%;
    height: v-bind(HeightOfInput);
    margin-top: 1%;
}
</style>
