<template>
    <div class="user-block">
        <img :src="SelfAvatar" alt="avatar" class="img-area" @click="popupSelfModal()">
        <div class="name-area">
            {{ SelfInfo.name }}
            <br v-if="SelfInfo.name.length > 0">
            @{{ loginUser }}
        </div>
    </div>
</template>

<script setup lang="ts">

import { useOverlayMeta, renderOverlay } from '@unoverlays/vue'
import { loginUser, SelfInfo, getAvatar, SelfAvatar, putUser, fillSelf, ModalOn } from "@/share/share"
import UserBlockModal from "@/components/UserBlockModal.vue"

const popupSelfModal = async () => {

    // *** 'kind', now in cookie ***
    // cookies.set("kind", `${selKind.value}`, "1d", "/", "." + Domain, false, "Lax");
    // cookies.set("name", ``, "1d", "/", "." + Domain, false, "Lax");
    // location.replace(`${URL_CMS}`)

    if (ModalOn.value) {
        return
    }

    ModalOn.value = true
    await fillSelf()

    try {
        switch (String(await renderOverlay(UserBlockModal, { props: { title: 'userModal' }, }))) {
            case 'confirm':
                await putUser(loginUser.value, SelfInfo.value)
                break
        }
    } catch (e) {
        switch (e) {
            case 'cancel':
                break
        }
    }

    await fillSelf()
    ModalOn.value = false
};

onMounted(async () => {
    await new Promise((f) => setTimeout(f, 200));
    await getAvatar();
})

watchEffect(async () => { })

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user-block {
    position: fixed;
    width: 160px;
    height: 60px;
    top: 1%;
    right: 1%;
    color: #fff;
    text-align: center;
    background-color: white;
    box-shadow: 2px 2px 3px #999;
}

.img-area {
    float: left;
    color: rgb(33, 31, 31);
    width: 40%;
    height: 100%;
    border-radius: 10%;
    object-fit: contain;
}

.img-area:hover {
    cursor: pointer;
}

.name-area {
    float: left;
    color: black;
    font-size: small;
    margin-top: 7%;
    margin-left: 5%;
    text-align: left;
}
</style>
