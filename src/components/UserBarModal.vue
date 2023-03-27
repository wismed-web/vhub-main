<template>
    <div id="modal" v-if="showProfile">

        <div id="container-left">
            <span class="lbl-input-span">
                <label class="lbl-c1" for="val-user">user:</label>
                <br>
                <input type="text" id="val-user" class="val-c1" v-model="loginUser" disabled />
            </span>
            <span class="lbl-input-span">
                <label class="lbl-c1" for="val-dob">dob:</label>
                <div class="val-c1" >
                    <datepicker id="val-dob" v-model="dob" />
                </div>
            </span>
            <span>
                <label class="lbl-c1" for="val-gender">gender:</label>
                <br>
                <select class="val-c1" v-model="selfInfo.gender">
                    <option>Male</option>
                    <option>Female</option>
                </select>
            </span>
        </div>

        <div id="container-middle">
            <span class="lbl-input-span">
                <label class="lbl-c2" for="val-name">name </label>
                <input type="text" id="val-name" v-model="selfInfo.name" />
            </span>
            <span class="lbl-input-span">
                <label class="lbl-c2" for="val-phone">phone </label>
                <input type="text" id="val-phone" v-model="selfInfo.phone" />
            </span>
            <span class="lbl-input-span">
                <label class="lbl-c2" for="val-email">email </label>
                <input type="text" id="val-email" v-model="selfInfo.email" disabled />
            </span>
            <span class="lbl-input-span">
                <label class="lbl-c2" for="val-role">role </label>
                <input type="text" id="val-role" v-model="selfInfo.role" disabled />
            </span>
            <span class="lbl-input-span">
                <label class="lbl-c2" for="val-certified">certified </label>
                <input type="text" id="val-certified" v-model="selfInfo.certified" disabled />
            </span>
        </div>

        <div id="container-right">
            <img id="img-area" :src="selfAvatar" alt="avatar" @click="popupSetAvatar()">
            <span class="lbl-input-span">
                <label class="lbl-c3" for="val-country">country </label>
                <input type="text" id="val-country" v-model="selfInfo.country" />
            </span>
            <span class="lbl-input-span">
                <label class="lbl-c3" for="val-city">city </label>
                <input type="text" id="val-city" v-model="selfInfo.city" />
            </span>
            <span class="lbl-input-span">
                <label class="lbl-c3" for="val-addr">address </label>
                <input type="text" id="val-addr" v-model="selfInfo.addr" />
            </span>
        </div>

        <!-- employer expire level official personalid personaltype regtime title -->

        <button id="btn-confirm" @click="confirm('confirm')">confirm</button>
        <button id="btn-cancel" @click="cancel('cancel')">cancel</button>

    </div>

    <CropperForm v-if="showCropper" title="set avatar:" btnConfirmText="set avatar" :maxCropW="800" :maxCropH="600" @cropReady="cropReady" @cropCancel="cropCancel" />
    <Loader v-if="showPageLoader" id="page-loader" />
</template>

<script setup lang="ts">

import Datepicker from "vue3-datepicker"
import Loader from "@/components/Loader.vue"
import { loginUser, loginToken, loginAuth, selfInfo, selfAvatar, setAvatar, getAvatar } from "@/share/share"
import { useOverlayMeta } from '@unoverlays/vue'
import CropperForm from "@/components/sub-components/CropperForm.vue";

const showProfile = ref(true);
const showCropper = ref(false);
const showPageLoader = ref(false);

const dob = ref(new Date());

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
    display: flex;
    align-items: stretch;
}

#container-left {
    display: flex;
    flex-direction: column;
    width: 30%;
    margin-top: 4%;
    margin-left: 3%;
}

#container-middle {
    display: flex;
    flex-direction: column;
    width: 30%;
    margin-top: 4%;
}

#container-right {
    display: flex;
    flex-direction: column;
    width: 30%;
    margin-top: 4%;
    margin-left: 2%;
}

/* image */

#img-area {
    float: right;
    margin-left: 60%;
    margin-bottom: 10%;
    width: 40%;
    object-fit: contain;
}

#img-area:hover {
    cursor: pointer;
}

.lbl-input-span {
    margin-bottom: 5%;
}

/* col */

.lbl-c1 {
    display: inline-block;
    width: 20%;
}

.lbl-c2 {
    display: inline-block;
    width: 26%;
}

.lbl-c3 {
    display: inline-block;
    width: 26%;
}

/* value */

.val-c1 {
    margin-left: 10%;
    margin-top: 2%;
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