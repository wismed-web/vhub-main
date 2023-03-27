<template>
    <div class="cropper-form">

        <p class="title">{{ props.title }}</p>

        <div id="cropper-border">
            <Cropper class="cropper" :src="iSrc" :maxWidth="props.maxCropW" :maxHeight="props.maxCropH" @change="cropperChange"> </Cropper>
            <video :hidden="true" id="video" :src="vSrc" type="video/mp4" :onLoadedmetadata="loaded" controls></video>
        </div>

        <button id="btnCancel" class="btn" @click="cancel">cancel</button>
        <button class="btn" :disabled="!btnConfirmEnable" @click="confirm">{{ props.btnConfirmText }}</button>
        <button class="btn" onclick="document.getElementById('fileSelector').click()">open</button>
        <input id="fileSelector" type='file' :hidden="true" accept="image/*, video/*" @change="selectChange" />

    </div>
</template>

<script setup>

import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';

const props = defineProps({
    title: String,
    maxCropW: Number,
    maxCropH: Number,
    btnConfirmText: String,
})

const emit = defineEmits(['cropCancel', 'cropReady'])

// https://github.com/advanced-cropper/vue-advanced-cropper
const btnConfirmEnable = ref(false)
const iSrc = ref("")
const vSrc = ref("")
let selected = ref();
let cropArea = class {
    constructor(left, top, width, height) {
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
    }
};

onMounted(async () => { })

watchEffect(async () => {
    btnConfirmEnable.value = selected.value != undefined
})

const cropperChange = async ({ coordinates, canvas }) => {
    cropArea.width = coordinates.width;
    cropArea.height = coordinates.height;
    cropArea.left = coordinates.left;
    cropArea.top = coordinates.top;
}

const loaded = (event) => {
    setTimeout(grabFrameToCropper, 500)
}

const selectChange = (event) => {
    selected.value = event.target.files[0]
    console.log(selected.value.name)
    const src = window.URL.createObjectURL(selected.value)
    if (selected.value.name.endsWith('.mp4')) {
        vSrc.value = src
    } else {
        iSrc.value = src
    }
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

const grabFrameToCropper = async (param) => {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    canvas.toBlob((blob) => {
        iSrc.value = window.URL.createObjectURL(blob)
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