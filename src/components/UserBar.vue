<template>
    <div class="user-bar">
        <img src="/favicon.ico" alt="avatar" class="img-area" @click="popupUserModal()">
        <div class="name-area">
            <p>@{{ loginUser }}</p>
            <p>{{ loginSelfInfo.name }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">

import { useOverlayMeta, renderOverlay } from '@unoverlays/vue'
import { useCookies } from "vue3-cookies";
import { Domain, IP_CMS } from "@/share/ip";
import { loginUser, loginToken, loginAuth, loginSelfInfo, putUser, fillSelf } from "@/share/share"
import UserBarModal from "@/components/UserBarModal.vue"

// flag for single modal
const showModal = ref(false)

const popupUserModal = async () => {

    // *** 'kind', now in cookie ***
    // cookies.set("kind", `${selKind.value}`, "1d", "/", "." + Domain, false, "Lax");
    // cookies.set("name", ``, "1d", "/", "." + Domain, false, "Lax");
    // location.replace(`${IP_CMS}`)

    if (showModal.value) {
        return
    }

    showModal.value = true
    await fillSelf()

    try {
        switch (String(await renderOverlay(UserBarModal, { props: { title: 'userModal' }, }))) {
            case 'confirm':
                await putUser(loginUser.value, loginSelfInfo.value)
                break
        }
    } catch (e) {
        switch (e) {
            case 'cancel':
                break
        }
    }

    await fillSelf()
    showModal.value = false
};

watchEffect(async () => { })

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
