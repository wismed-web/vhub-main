<template>
    <div id="modal" v-if="showProfile">
        <img id="img-area" :src="selfAvatar" alt="avatar" @click="popupSetAvatar()">
        <div class="row1">
            <label class="lbl-col1" for="val-user">user &nbsp;</label><input type="text" id="val-user" v-model="loginUser" disabled />
            <label class="lbl-col2" for="val-name">name </label><input type="text" id="val-name" v-model="selfInfo.name" />
        </div>
        <div class="row">
            <label class="lbl-col1" for="val-email">email </label><input type="text" id="val-email" v-model="selfInfo.email" disabled />
            <label class="lbl-col2" for="val-dob">dob &nbsp;</label><input type="text" id="val-dob" v-model="selfInfo.dob" />
        </div>
        <div class="row">
            <label class="lbl-col1" for="val-phone">phone </label><input type="text" id="val-phone" v-model="selfInfo.phone" />
            <label class="lbl-col2" for="val-gender">gender </label>
            <select name="gender" id="val-gender" v-model="selfInfo.gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
        </div>
        <div class="row">
            <label class="lbl-col1" for="val-city">city </label><input type="text" id="val-city" v-model="selfInfo.city" />
            <label class="lbl-col2" for="val-country">country </label><input type="text" id="val-country" v-model="selfInfo.country" />
            <label class="lbl-col3" for="val-addr">address </label><input type="text" id="val-addr" v-model="selfInfo.addr" />
        </div>
        <div class="row">
            <label class="lbl-col1" for="val-bio">bio &nbsp;</label><input type="text" id="val-bio" v-model="selfInfo.bio" />

        </div>
        <div class="row">
            <label class="lbl-col1" for="val-certified">certified </label><input type="text" id="val-certified" v-model="selfInfo.certified" disabled />
            <label class="lbl-col2" for="val-role">role </label><input type="text" id="val-role" v-model="selfInfo.role" disabled />
            <!-- <label class="lbl-col5" for="val-"> &nbsp;</label><input type="text" id="val-" v-model="selfInfo." /> -->
        </div>

        <div class="row">
            <label class="lbl-col1" for="val-bio">bio &nbsp;</label><input type="text" id="val-bio" v-model="selfInfo.bio" />

        </div>

        <div class="row">
            <label class="lbl-col1" for="val-bio">bio &nbsp;</label><input type="text" id="val-bio" v-model="selfInfo.bio" />

            <!-- <label class="lbl-col4" for="val-"> &nbsp;</label><input type="text" id="val-" v-model="selfInfo." />
                    <label class="lbl-col5" for="val-"> &nbsp;</label><input type="text" id="val-" v-model="selfInfo." /> -->

        </div>

        <div class="row">
            <label class="lbl-col1" for="val-bio">bio &nbsp;</label><input type="text" id="val-bio" v-model="selfInfo.bio" />

            <!-- <label class="lbl-col4" for="val-"> &nbsp;</label><input type="text" id="val-" v-model="selfInfo." />
                    <label class="lbl-col5" for="val-"> &nbsp;</label><input type="text" id="val-" v-model="selfInfo." /> -->

        </div>

        <!-- employer expire level official personalid personaltype regtime title -->

        <button id="btn-confirm" @click="confirm('confirm')">confirm</button>
        <button id="btn-cancel" @click="cancel('cancel')">cancel</button>
    </div>

    <CropperForm :visible="showCropper" title="set avatar:" btnConfirmText="set avatar" :maxCropW="800" :maxCropH="600" @cropReady="cropReady" @cropCancel="cropCancel" />
    <Loader v-if="showPageLoader" id="page-loader" />
</template>

<script setup lang="ts">

import Loader from "@/components/Loader.vue"
import { loginUser, loginToken, loginAuth, selfInfo, selfAvatar, setAvatar, getAvatar } from "@/share/share"
import { useOverlayMeta } from '@unoverlays/vue'
import CropperForm from "@/components/sub-components/CropperForm.vue";

const showProfile = ref(true);
const showCropper = ref(false);
const showPageLoader = ref(false);

const popupSetAvatar = async () => {
    showProfile.value = false
    showCropper.value = true
};

const props = defineProps({
    title: String,
})

// Define the events used in the component(optional)
// This allows you to use hints in components
defineEmits(['cancel', 'confirm', 'update:visible'])

// Get Overlay information from useOverlayMeta
const { visible, confirm, cancel } = useOverlayMeta({
    // Animation duration to avoid premature destruction of components
    // Only use component in template and no need to define
    animation: 200
})

///////////////////////////////////////////////////////

const cropReady = async (file: string, cropArea: any) => {
    showPageLoader.value = true
    await setAvatar(file, cropArea.left, cropArea.top, cropArea.width, cropArea.height)
    showCropper.value = false
    await getAvatar()
    showProfile.value = true
    showPageLoader.value = false
}

const cropCancel = async () => {
    showCropper.value = false
    showProfile.value = true
}

///////////////////////////////////////////////////////

// *** style variables ***

// for buttons
let rightColumn1 = '10px'
let rightColumn2 = '75px'
let bottomRow1 = '10px'

</script>

<style scoped>
#modal {
    position: fixed;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    height: 50%;
    background-color: rgb(220, 220, 220);
    opacity: 0.95;
    border-radius: 10px;
}

/* image */

#img-area {
    float: right;
    margin-right: 2%;
    margin-top: 2%;
    width: 12%;
    height: 24%;
    object-fit: contain;
}

#img-area:hover {
    cursor: pointer;
}

/* row */

.row1,
.row {
    color: red;
    font-family: 'Courier New', Courier, monospace;
    font-size: large;
    text-align: left;
}

.row1 {
    margin-top: 5%;
}

.row {
    margin-top: 2%;
}

/* col */

.lbl-col1 {
    margin-left: 5%;
}

.lbl-col2 {
    margin-left: 8%;
}

.lbl-col3 {
    margin-left: 5%;
}

/* value */

#val-addr {
    width: 10%;
}

/* button */

#btn-cancel {
    background-color: rgb(225, 226, 224);
    position: absolute;
    right: v-bind('rightColumn2');
    bottom: v-bind('bottomRow1');
}

#btn-confirm {
    background-color: rgb(225, 226, 224);
    position: absolute;
    right: v-bind('rightColumn1');
    bottom: v-bind('bottomRow1');
}

/* loader */

#page-loader {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>