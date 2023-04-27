<template>
    <div class="cropper-form">

        <p class="title">{{ props.title }}</p>

        <div id="cropper-border">
            <Cropper class="cropper" :src="iSrc" :maxWidth="props.maxCropW" :minWidth="props.minCropW" :maxHeight="props.maxCropH" :minHeight="props.minCropH" @change="cropperChange"> </Cropper>
            <video :hidden="true" id="video" :src="vSrc" type="video/mp4" :onLoadedmetadata="videoLoaded" controls></video>
        </div>

        <button id="btnCancel" class="btn" @click="cancel">cancel</button>
        <button class="btn" :disabled="!btnOkEnable" @click="confirm">{{ props.btnOkText }}</button>
        <button class="btn" onclick="document.getElementById('fileSelector').click()">open</button>
        <input id="fileSelector" type='file' :hidden="true" :accept="inputFilter" @change="selectChange" />

    </div>
</template>

<script setup lang="ts">

import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';

const props = defineProps({
    title: String,
    cropType: String,
    maxCropW: Number,
    minCropW: Number,
    maxCropH: Number,
    minCropH: Number,
    btnOkText: String,
})

const emit = defineEmits(['cropCancel', 'cropReady'])

const inputFilter = computed(() => {
    switch (props.cropType) {
        case "image":
            return "image/*"
        case "video":
            return "video/*"
        default:
            return "image/*, video/*"
    }
})

// https://github.com/advanced-cropper/vue-advanced-cropper
const btnOkEnable = ref(false)
const iSrc = ref("")
const vSrc = ref("")
let selected = ref();
let cropArea: {
    left: Number
    top: Number
    width: Number
    height: Number
} = {
    left: 0,
    top: 0,
    width: 0,
    height: 0
}

onMounted(async () => { })

watchEffect(async () => {
    btnOkEnable.value = selected.value != undefined
})

const selectChange = (event: Event) => {

    const ie = event.target as HTMLInputElement
    if (ie.files?.length == 0) {
        return
    }

    selected.value = ie.files![0]
    // console.log(selected.value.name) // selected file name

    const src = window.URL.createObjectURL(selected.value)
    // console.log('src', src) // selected file src

    if (selected.value.name.endsWith('.mp4')) {
        vSrc.value = src
        iSrc.value = ""
    } else {
        iSrc.value = src
        vSrc.value = ""
    }
}

const cropperChange = async ({ coordinates, canvas }) => {
    cropArea.width = coordinates.width;
    cropArea.height = coordinates.height;
    cropArea.left = coordinates.left;
    cropArea.top = coordinates.top;
}

const confirm = async () => {
    emit('cropReady', selected.value, cropArea)
    iSrc.value = ""
    vSrc.value = ""
    selected.value = undefined
}

const cancel = async () => {
    emit('cropCancel')
    iSrc.value = ""
    vSrc.value = ""
    selected.value = undefined
}

////////////////////////////////////////////////////

const videoLoaded = async (event: any) => {
    // console.log("video-loaded")

    const video: HTMLVideoElement | null = document.querySelector('video')
    // console.log(video!.videoWidth, video!.videoHeight)

    await new Promise((f) => setTimeout(f, 1000));

    const canvas = document.createElement('canvas');
    canvas.width = video!.videoWidth;
    canvas.height = video!.videoHeight;
    canvas!.getContext("2d")!.drawImage(video!, 0, 0, video!.videoWidth, video!.videoHeight);
    canvas.toBlob((blob) => {
        iSrc.value = window.URL.createObjectURL(blob!)
    })
}

</script>

<style scoped>
.cropper-form {
    position: fixed;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    height: 50%;
    background-color: rgb(200, 200, 200);
    opacity: 0.99;
    border-radius: 10px;
}

.title {
    margin-left: 2%;
    font-family: 'Courier New', Courier, monospace;
    color: rgb(10, 10, 10);
}

#cropper-border {
    width: 96%;
    height: 82%;
    margin-top: -1%;
    margin-left: 2%;
    background-color: rgb(100, 100, 100);
}

.cropper {
    width: fit-content;
    height: fit-content;
}

#video {
    width: 100%;
    height: 100%;
}

.btn {
    float: right;
    margin-top: 1%;
    margin-right: 1%;
}

#btnCancel {
    margin-right: 2%;
}
</style>