<template>
    <div id="modal" v-if="showUserModal">
        <img id="img-area" src="/favicon.ico" alt="avatar" @click="setAvatar()">
        <div class="row1">
            <label class="lbl-col1" for="val-user">user &nbsp;</label><input type="text" id="val-user" v-model="loginUser" disabled />
            <label class="lbl-col2" for="val-name">name </label><input type="text" id="val-name" v-model="loginSelfInfo.name" />
        </div>
        <div class="row">
            <label class="lbl-col1" for="val-email">email </label><input type="text" id="val-email" v-model="loginSelfInfo.email" disabled />
            <label class="lbl-col2" for="val-dob">dob &nbsp;</label><input type="text" id="val-dob" v-model="loginSelfInfo.dob" />
        </div>
        <div class="row">
            <label class="lbl-col1" for="val-phone">phone </label><input type="text" id="val-phone" v-model="loginSelfInfo.phone" />
            <label class="lbl-col2" for="val-gender">gender </label>
            <select name="gender" id="val-gender" v-model="loginSelfInfo.gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
        </div>
        <div class="row">
            <label class="lbl-col1" for="val-city">city </label><input type="text" id="val-city" v-model="loginSelfInfo.city" />
            <label class="lbl-col2" for="val-country">country </label><input type="text" id="val-country" v-model="loginSelfInfo.country" />
            <label class="lbl-col3" for="val-addr">address </label><input type="text" id="val-addr" v-model="loginSelfInfo.addr" />
        </div>
        <div class="row">
            <label class="lbl-col1" for="val-bio">bio &nbsp;</label><input type="text" id="val-bio" v-model="loginSelfInfo.bio" />

        </div>
        <div class="row">
            <label class="lbl-col1" for="val-certified">certified </label><input type="text" id="val-certified" v-model="loginSelfInfo.certified" disabled />
            <label class="lbl-col2" for="val-role">role </label><input type="text" id="val-role" v-model="loginSelfInfo.role" disabled />
            <!-- <label class="lbl-col5" for="val-"> &nbsp;</label><input type="text" id="val-" v-model="loginSelfInfo." /> -->
        </div>

        <div class="row">
            <label class="lbl-col1" for="val-bio">bio &nbsp;</label><input type="text" id="val-bio" v-model="loginSelfInfo.bio" />

        </div>

        <div class="row">
            <label class="lbl-col1" for="val-bio">bio &nbsp;</label><input type="text" id="val-bio" v-model="loginSelfInfo.bio" />

            <!-- <label class="lbl-col4" for="val-"> &nbsp;</label><input type="text" id="val-" v-model="loginSelfInfo." />
                    <label class="lbl-col5" for="val-"> &nbsp;</label><input type="text" id="val-" v-model="loginSelfInfo." /> -->

        </div>

        <div class="row">
            <label class="lbl-col1" for="val-bio">bio &nbsp;</label><input type="text" id="val-bio" v-model="loginSelfInfo.bio" />

            <!-- <label class="lbl-col4" for="val-"> &nbsp;</label><input type="text" id="val-" v-model="loginSelfInfo." />
                    <label class="lbl-col5" for="val-"> &nbsp;</label><input type="text" id="val-" v-model="loginSelfInfo." /> -->

        </div>

        <!-- employer expire level official personalid personaltype regtime title -->

        <button id="btn-confirm" @click="confirm('confirm')">confirm</button>
        <button id="btn-cancel" @click="cancel('cancel')">cancel</button>
    </div>

    <CropperUploader />

</template>

<script setup lang="ts">

import { loginUser, loginToken, loginAuth, loginSelfInfo, showUserModal, showCropper } from "@/share/share"
import { useOverlayMeta } from '@unoverlays/vue'
import CropperUploader from "@/components/CropperUploader.vue";

const setAvatar = async () => {
    showCropper.value = true
    showUserModal.value = false
};

const props = defineProps({
    title: String
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
    width: 10%;
    background-color: rgb(219, 196, 243);
    border-radius: 100%;
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
</style>