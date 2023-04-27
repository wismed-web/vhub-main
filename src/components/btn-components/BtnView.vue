<template>
    <a class="float" id="pen" title="write post" @click="Compose()">
        <font-awesome-icon icon="pen" class="floating" />
    </a>
    <a class="float" id="refresh" title="refresh" @click="MorePosts()">
        <font-awesome-icon icon="refresh" class="floating" />
    </a>
    <a class="float" id="right-from-bracket" title="exit" @click="Exit()">
        <font-awesome-icon icon="right-from-bracket" class="floating" />
    </a>
    <Loader v-if="loading" id="page-loader" />
</template>

<script setup lang="ts">

import { useOverlayMeta, renderOverlay } from '@unoverlays/vue'
import { useNotification } from "@kyvg/vue3-notification";
import { Mode, ModalOn, getPostID, PostIDGroup, putLogout, ClearPost } from "@/share/share";
import Loader from "@/components/sub-components/Loader.vue";
import CCModal from "@/components/sub-components/CCModal.vue"
import { URL_SIGN } from "@/share/ip";

const notification = useNotification()

const Compose = async () => {
    Mode.value = 'input'
    ClearPost()
}

const loading = ref(false)
const MorePosts = async () => {
    loading.value = true
    {
        const de = await getPostID('time', 15) // 15 minutes
        if (de.error != null) {
            notification.notify({
                title: "Error: Get Post ID",
                text: de.error,
                type: "error"
            })
            loading.value = false
            return
        }

        // console.log("de.data: ", de.data)

        const prevCnt = PostIDGroup.value?.length
        PostIDGroup.value = [...new Set(de.data.concat(PostIDGroup.value))];
        PostIDGroup.value = PostIDGroup.value.filter((element: any) => element !== undefined)

        console.log("PostIDGroup: ", PostIDGroup.value)

        if (PostIDGroup.value.length == prevCnt) {
            if (de.data.length == 0) {
                notification.notify({
                    title: "",
                    text: "no new posts available",
                    type: "success"
                })
                loading.value = false
                return
            }
        }
    }
    loading.value = false
};

const Exit = async () => {
    if (ModalOn.value) {
        return
    }
    ModalOn.value = true
    try {
        if (String(await renderOverlay(CCModal, {
            props: {
                text: "Logout ?",
                width: "12%",
                height: "9%",
            },
        })) === 'confirm') {
            const de = await putLogout()
            if (de.error != null) {
                notification.notify({
                    title: "Error: Logout",
                    text: de.error,
                    type: "error"
                })
                return
            }
            location.replace(URL_SIGN);
        }
    } catch (e) {
        switch (e) {
            case 'cancel':
                break
        }
    }
    ModalOn.value = false
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.float {
    position: fixed;
    width: 60px;
    height: 60px;
    bottom: 120px;
    right: 40px;
    background-color: #79c8f3;
    color: #fff;
    border-radius: 50px;
    text-align: center;
    box-shadow: 2px 2px 3px #999;
}

.float:hover {
    background-color: rgb(144, 238, 244);
    cursor: pointer;
}

.floating {
    margin-top: 22px;
    color: white;
}

#pen {
    bottom: 200px;
}

#refresh {
    bottom: 120px;
}

#right-from-bracket {
    bottom: 40px;
}

/* loader */
#page-loader {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
