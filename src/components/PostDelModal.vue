<template>
    <div id="modal">
        <input type="text" id="post-id" placeholder="Input Erase Post ID" v-model="EraseID">
        <button id="btn-confirm" @click="resolve(EraseID)">confirm</button>
        <button id="btn-cancel" @click="reject('cancel')">cancel</button>
    </div>
</template>

<script setup lang="ts">

import { useOverlayMeta } from '@unoverlays/vue'

const EraseID = ref("")

const props = defineProps({
    id: String,
})

// Define the events used in the component(optional)
// This allows you to use hints in components
defineEmits(['cancel', 'confirm', 'update:visible'])

// Get Overlay information from useOverlayMeta
const { visible, resolve, reject } = useOverlayMeta({
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
    width: 20%;
    height: 8%;
    background-color: rgb(200, 200, 200);
    opacity: 0.99;
    display: flex;
    align-items: stretch;
    flex-direction: column;
    border-radius: 5px;
}

#post-id {
    padding-top: 1%;
    padding-bottom: 1%;
    padding-left: 2%;
    background-color: rgb(170, 170, 170);
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