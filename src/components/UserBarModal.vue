<template>
    <div id="modal" v-if="visible">
        <img id="img-area" src="/favicon.ico" alt="avatar" @click="setAvatar()">
        <div class="row1">
            <label class="lbl-col1" for="val-user">user &nbsp;</label><input type="text" id="val-user" v-bind:value="loginUser" disabled />
            <label class="lbl-col2" for="val-name">name </label><input type="text" id="val-name" v-bind:value="loginSelfInfo.name" />
        </div>
        <div class="row2">
            <label class="lbl-col1" for="val-email">email </label><input type="text" id="val-email" v-bind:value="loginSelfInfo.email" disabled />
            <label class="lbl-col2" for="val-role">role </label><input type="text" id="val-role" v-bind:value="loginSelfInfo.role" />
        </div>
        <!-- addr bio certified city country dob email employer expire gender level official personalid personaltype phone regtime title  -->
        <button id="btn-confirm" @click="confirm()">confirm</button>
        <button id="btn-cancel" @click="cancel()">cancel</button>
    </div>
</template>

<script setup lang="ts">

import { loginUser, loginToken, loginAuth, loginSelfInfo } from "@/share/share"
import { useOverlayMeta } from '@unoverlays/vue'

const setAvatar = async () => {
    alert('hello')
};

const props = defineProps({
    // If you want to use it as a component in template,
    // you need to define visible in props
    visible: Boolean
})

// Define the events used in the component(optional)
// This allows you to use hints in components
defineEmits(['cancel', 'confirm', 'update:visible'])

// Get Overlay information from useOverlayMeta
const { visible, confirm, cancel } = useOverlayMeta({
    // Animation duration to avoid premature destruction of components
    // Only use component in template and no need to define
    animation: 1000
})

///////////////////////////////////////////////////////

// for invoker confirm using

// *** style variables ***

// for buttons
let rightColumn1 = '10px'
let rightColumn2 = '75px'
let bottomRow1 = '10px'

</script>

<style scoped>
#modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    height: 50%;
    background-color: rgb(220, 220, 220);
    opacity: 0.95;
    border-radius: 10px;
}

#img-area {
    float: left;
    margin-left: 2%;
    margin-top: 2%;
    width: 10%;
    background-color: rgb(219, 196, 243);
}

#img-area:hover {
    cursor: pointer;
}

.row1, .row2 {
    color: red;
    font-family: 'Courier New', Courier, monospace;
    font-size: large;
    text-align: left;
}

.row1 {
    margin-top: 5%;
}

.row2 {
    margin-top: 1%;
}

.lbl-col1 {
    margin-left: 10%;
}

.lbl-col2 {
    margin-left: 8%;
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