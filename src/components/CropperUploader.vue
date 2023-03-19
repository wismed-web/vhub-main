<template>
    <div v-if="showCropper" class="cropper-uploader">

        <div class="cropper-border">
            <Cropper class="cropper" :src="img" @change="cropperChange"> </Cropper>
        </div>

        <button class="btn" @click="cancel('cancel')">cancel</button>
        <button class="btn" @click="submit('submit')">submit</button>
        <button class="btn" onclick="document.getElementById('inputId').click()">select image</button>
        <input id="inputId" type='file' style="visibility:hidden;" accept="image/*" @change="imgChange" />

    </div>
</template>

<script setup>

import { showUserModal, showCropper } from '@/share/share'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';

const props = defineProps({
    title: String
})

// https://github.com/advanced-cropper/vue-advanced-cropper
const img = ref("")

const cropperChange = async ({ coordinates, canvas }) => {
    console.log(coordinates, canvas)
}

const imgChange = (event) => {
    console.log(event.target.files[0])
    const blob = window.URL.createObjectURL(event.target.files[0])
    img.value = blob
}

const submit = async ({ param: any }) => {
}

const cancel = async ({ param: any }) => {
    img.value = ""
    showCropper.value = false
    showUserModal.value = true
}

</script>

<style scoped>
.cropper-uploader {
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

.cropper-border {
    width: 96%;
    height: 87%;
    margin-top: 2%;
    margin-left: 2%;
    background-color: rgb(100, 100, 100);;
}

.cropper {
    width: fit-content;
    height: fit-content;
}

.btn {
    float: right;
    margin-top: 1%;
    margin-right: 1%;
}
</style>