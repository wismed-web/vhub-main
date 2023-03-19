<template>
    <div v-if="showCropper" class="cropper-uploader">

        <Cropper class="cropper" :src="img" @change="change"> </Cropper>

        <button class="btn" @click="cancel('cancel')">cancel</button>

        <button class="btn" @click="open('submit')">submit</button>

        <button class="btn" onclick="document.getElementById('inputId').click()">open</button>
        <input id="inputId" type='file' style="visibility:hidden;" />

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
const img = ref("/favicon.ico")

const change = async ({ coordinates, canvas }) => {
    console.log(coordinates, canvas)
}

const open = async ({ param: any }) => {
}

const submit = async ({ param: any }) => {
}

const cancel = async ({ param: any }) => {
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
    background-color: rgb(220, 220, 220);
    opacity: 0.99;
    border-radius: 10px;
}

.cropper {
    position: relative;
    margin-top: 1%;
}

.btn {
    float: right;
    margin-top: 1%;
    margin-right: 1%;
}
</style>