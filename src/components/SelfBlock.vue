<template>
    <div class="user-block">
        <img :src="SelfAvatar" alt="avatar" class="avatar-area" @click="PopupSelfModal()">
        <div class="name-area">
            {{ SelfInfo.name }}
            <br v-if="SelfInfo.name.length > 0">
            @{{ loginUser }}
        </div>
    </div>
</template>

<script setup lang="ts">

import { useOverlayMeta, renderOverlay } from '@unoverlays/vue'
import { useNotification } from "@kyvg/vue3-notification";
import { loginUser, SelfInfo, getAvatar, SelfAvatar, putUser, getUserInfoList, ModalOn } from "@/share/share"
import SelfBlockModal from "@/components/SelfBlockModal.vue"

const notification = useNotification()

const PopupSelfModal = async () => {

    // *** 'kind', now in cookie ***
    // cookies.set("kind", `${selKind.value}`, "1d", "/", "." + Domain, false, "Lax");
    // cookies.set("name", ``, "1d", "/", "." + Domain, false, "Lax");
    // location.replace(`${URL_CMS}`)

    if (ModalOn.value) {
        return
    }

    ModalOn.value = true

    // prepare UI
    {
        const de = await getUserInfoList(loginUser.value, "")
        if (de.error != null) {
            notification.notify({
                title: "Failed to get self info",
                text: de.error,
                type: "error"
            })
            return
        }
        SelfInfo.value = de.data[0]
    }

    try {
        switch (String(await renderOverlay(SelfBlockModal, { props: { title: 'userModal' }, }))) {
            case 'confirm':
                const de = await putUser(loginUser.value, SelfInfo.value)
                if (de.error != null) {
                    notification.notify({
                        title: "Update User",
                        text: de.error,
                        type: "error"
                    })
                    return
                }
                break
        }
    } catch (e) {
        switch (e) {
            case 'cancel':
                break
        }
    }

    // update UI
    {
        const de = await getUserInfoList(loginUser.value, "")
        if (de.error != null) {
            notification.notify({
                title: "Failed to get self info",
                text: de.error,
                type: "error"
            })
            return
        }
        SelfInfo.value = de.data[0]
    }

    ModalOn.value = false
};

onMounted(async () => {
    // await new Promise((f) => setTimeout(f, 200));
    const de = await getAvatar();
    if (de.error != null) {
        notification.notify({
            title: "Failed to get self avatar",
            text: de.error,
            type: "error"
        })
        return
    }
    SelfAvatar.value = de.data
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

.avatar-area {
    float: left;
    color: rgb(33, 31, 31);
    width: 40%;
    height: 100%;
    border-radius: 10%;
    object-fit: contain;
}

.avatar-area:hover {
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
