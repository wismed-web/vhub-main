<template>
    <label for="video" id="lbl-video">Video URL Retriever:</label>
    <span><input id="video" type="text" :placeholder="hint" :title="hint" v-model="url" readonly />
        <button id="btn-video" @click="PopupUploadVideo()">
            <font-awesome-icon icon="upload" />
        </button>
    </span>
    <CropperForm v-if="cropper" title="upload video" btnOkText="upload" :maxCropW="1024" :maxCropH="1024" @cropReady="cropReady" @cropCancel="cropCancel" />
    <Loader v-if="loading" id="page-loader" />
</template>

<script setup lang="ts">

import { useNotification } from "@kyvg/vue3-notification";
import CropperForm from "@/components/sub-components/CropperForm.vue";
import Loader from "@/components/sub-components/Loader.vue"
import { ModalOn, uploadMedia } from "@/share/share";
import { URL_API } from "@/share/ip";

const notification = useNotification()

const cropper = ref(false)
const loading = ref(false)

const hint = ref("video url")
const url = ref("video url")

onMounted(async () => { });
watchEffect(() => { });

const PopupUploadVideo = async () => {
    ModalOn.value = true
    cropper.value = true
};

const cropReady = async (file: string, cropArea: any) => {

    loading.value = true

    {
        const de = await uploadMedia(file, cropArea.left, cropArea.top, cropArea.width, cropArea.height, "", "", "")
        if (de.error != null) {
            notification.notify({
                title: "Error: Upload Media",
                text: de.error,
                type: "error"
            })
            return
        }
        cropper.value = false
        ModalOn.value = false
        url.value = URL_API + "/" + de.data
    }

    loading.value = false
}

const cropCancel = async () => {
    cropper.value = false
    ModalOn.value = false
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#lbl-video {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    font-style: italic;
    margin-bottom: 1%;
}

#video {
    position: relative;
    width: 72%;
    font-weight: normal;
    text-align: left;
    margin: 1% 2% 5% 3%;
    padding-left: 1%;
}

#btn-video {
    width: 8%;
}

/* loader */
#page-loader {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
