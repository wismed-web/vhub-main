<template>
    <div id="modal">

        <label id="lbl-user">User:</label>
        <span id="val-user">{{ props.uname }}</span>

        <label id="lbl-role" for="val-role">Role:</label>
        <select id="val-role" v-model="valRole">
            <option value="user">user</option>
            <option value="admin">admin</option>
            <option value="system">system</option>
        </select>

        <label id="lbl-active" for="val-active">Active:</label>
        <select id="val-active" v-model="valActive">
            <option :value="true">Yes</option>
            <option :value="false">No</option>
        </select>

        <button id="btn-confirm" @click="confirm({ role: valRole, active: valActive })">confirm</button>
        <button id="btn-cancel" @click="cancel('cancel')">cancel</button>

    </div>
</template>

<script setup lang="ts">

import { useOverlayMeta } from '@unoverlays/vue'

const props = defineProps({
    uname: String,
    role: String,
    active: Boolean,
})

// Define the events used in the component(optional)
// This allows you to use hints in components
defineEmits(['cancel', 'confirm', 'update:visible'])

// Get Overlay information from useOverlayMeta
const { confirm, cancel } = useOverlayMeta({
    // Animation duration to avoid premature destruction of components
    // Only use component in template and no need to define
    animation: 100
})

///////////////////////////////////////////////////////

// for invoker confirm using

const valRole = ref(props.role)
const valActive = ref(props.active)

// onMounted(async () => {
//     valRole.value = props.role
//     valActive.value = props.active
// })

// modal show event
// watch(
//     () => props.visible,
//     (newValue, oldValue) => {
//         if (newValue == true && oldValue == false) {
//             valRole.value = props.role
//             valActive.value = props.active
//             console.log('show modal')
//         }
//     }
// )

///////////////////////////////////////////////////////

// *** style variables ***

// for labels, etc.
let leftColumn1 = '30px'
let leftColumn2 = '120px'
let leftColumn3 = '190px'
let topRow1 = '10px'
let topRow2 = '45px'
let topRow3 = '80px'

// for buttons
let rightColumn1 = '15px'
let rightColumn2 = '80px'
let bottomRow1 = '15px'

</script>

<style scoped>
#modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 450px;
    height: 160px;
    background-color: rgb(220, 220, 220);
    opacity: 0.95;
    border-radius: 20px;
}

/* 1st line */

#lbl-user {
    position: absolute;
    left: v-bind('leftColumn1');
    top: v-bind('topRow1');
    margin-top: 5px;
    font-size: large;
}

#val-user {
    position: absolute;
    left: v-bind('leftColumn2');
    top: v-bind('topRow1');
    margin-top: 5px;
    font-size: medium;
    font-style: italic;
    font-weight: bold;
}

/* 2nd line */

#lbl-role {
    position: absolute;
    left: v-bind('leftColumn1');
    top: v-bind('topRow2');
    margin-top: 2px;
    font-size: medium;
}

#val-role {
    position: absolute;
    left: v-bind('leftColumn2');
    top: v-bind('topRow2');
    margin-top: 0px;
    font-size: 10;
}

/* 3rd line */

#lbl-active {
    position: absolute;
    left: v-bind('leftColumn1');
    top: v-bind('topRow3');
    margin-top: 2px;
    font-size: medium;
}

#val-active {
    position: absolute;
    left: v-bind('leftColumn2');
    top: v-bind('topRow3');
    margin-top: 0px;
    font-size: 10;
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