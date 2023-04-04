<template>
    <div id="modal" v-if="showProfile">

        <div id="container-left">
            <span class="lbl-val-span-1">
                <label class="lbl-c1" for="val-user">User:</label>
                <br>
                <input type="text" id="val-user" class="val-box" v-model="loginUser" disabled />
            </span>

            <span class="lbl-val-span-1" id="lbl-val-dob">
                <label class="lbl-c1" for="val-dob">DOB:</label>
                <div class="val-box">
                    <datepicker id="val-dob" v-model="dob" />
                </div>
            </span>

            <span class="lbl-val-span-1">
                <label class="lbl-c1" for="val-gender">Gender:</label>
                <select class="val-box" id="val-gender" v-model="selfInfo.gender">
                    <option>Male</option>
                    <option>Female</option>
                </select>
            </span>

            <span class="lbl-val-span-1">
                <label class="lbl-c1" for="val-country">Country:</label>
                <CountrySelect id="val-country" class="val-box" v-model="selfInfo.country" :country="selfInfo.country" topCountry="CN" />
            </span>

            <span class="lbl-val-span-1">
                <label class="lbl-c1" for="val-city">Region:</label>
                <RegionSelect id="val-city" class="val-box" v-model="selfInfo.city" :country="selfInfo.country" :region="selfInfo.city" />
            </span>

            <span class="lbl-val-span-1" id="lbl-val-addr">
                <label class="lbl-c1" for="val-addr">Address:</label>
                <br>
                <input type="text" id="val-addr" class="val-box" v-model="selfInfo.addr" />
            </span>

            <span class="lbl-val-span-1">
                <label class="lbl-c1" for="val-id-type">ID&nbsp;Type:</label>
                <br>
                <input type="text" id="val-id-type" class="val-box" v-model="selfInfo.personalidtype" />
            </span>

            <span class="lbl-val-span-1">
                <label class="lbl-c1" for="val-id">ID&nbsp;Number:</label>
                <br>
                <input type="text" id="val-id" class="val-box" v-model="selfInfo.personalid" />
            </span>

        </div>

        <div id="container-middle">

            <span class="lbl-val-span-2">
                <label class="lbl-c2" for="val-name">Name:</label>
                <br>
                <input type="text" id="val-name" class="val-box" v-model="selfInfo.name" />
            </span>

            <span class="lbl-val-span-2">
                <label class="lbl-c2" for="val-phone">Phone:</label>
                <br>
                <input type="text" id="val-phone" class="val-box" v-model="selfInfo.phone" />
            </span>

            <span class="lbl-val-span-2">
                <label class="lbl-c2" for="val-email">Email:</label>
                <br>
                <input type="text" id="val-email" class="val-box" v-model="selfInfo.email" disabled />
            </span>

            <span class="lbl-val-span-2">
                <label class="lbl-c2" for="val-employer">Employer:</label>
                <br>
                <input type="text" id="val-employer" class="val-box" v-model="selfInfo.employer" />
            </span>

            <span class="lbl-val-span-2">
                <label class="lbl-c2" for="val-title">Title:</label>
                <br>
                <input type="text" id="val-title" class="val-box" v-model="selfInfo.title" />
            </span>

            <span class="lbl-val-span-2">
                <label class="lbl-c2" for="val-position">Position:</label>
                <br>
                <input type="text" id="val-position" class="val-box" v-model="selfInfo.position" />
            </span>

            <span class="lbl-val-span-2">
                <label class="lbl-c2" for="val-bio">Bio:</label>
                <br>
                <input type="text" id="val-bio" class="val-box" v-model="selfInfo.bio" />
            </span>

        </div>

        <div id="container-right">

            <img id="img-area" :src="selfAvatar" alt="avatar" @click="popupSetAvatar()">

            <span class="lbl-val-span-3">
                <label class="lbl-c3" for="val-role">V-HUB&nbsp;Role:</label>
                <select id="val-role" class="val-box" v-model="selfInfo.role">
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                    <option value="system">system</option>
                </select>
            </span>

            <span class="lbl-val-span-3">
                <label class="lbl-c3" for="val-official">Official&nbsp;Account:</label>
                <select id="val-official" class="val-box" v-model="selfInfo.official">
                    <option :value="true">True</option>
                    <option :value="false">False</option>
                </select>
            </span>

            <span class="lbl-val-span-3">
                <label class="lbl-c3" for="val-certified">Certified:</label>
                <select id="val-certified" class="val-box" v-model="selfInfo.certified">
                    <option :value="true">True</option>
                    <option :value="false">False</option>
                </select>
            </span>

            <span class="lbl-val-span-3"> Membership: <span id="val-level"> {{ memLvl }} </span> </span>

            <span class="lbl-val-span-3"> Joined Since: <span id="val-joined"> {{ dateReg }} </span> </span>

            <span class="lbl-val-span-3"> Expire At: <span id="val-expire"> {{ dateExp }} </span> </span>

            <span class="lbl-val-span-3">
                <label class="lbl-c3" for="val-tags">Tags:</label>
                <br>
                <input type="text" id="val-tags" class="val-box" v-model="selfInfo.tags" />
            </span>

        </div>

        <button id="btn-confirm" @click="confirm('confirm')">confirm</button>
        <button id="btn-cancel" @click="cancel('cancel')">cancel</button>

    </div>

    <CropperForm v-if="showCropper" title="set avatar:" btnConfirmText="set avatar" :maxCropW="512" :minCropW="128" :maxCropH="512" :minCropH="128" @cropReady="cropReady" @cropCancel="cropCancel" />
    <Loader v-if="showPageLoader" id="page-loader" />
</template>

<script setup lang="ts">

import Datepicker from "vue3-datepicker"
import { CountrySelect, RegionSelect } from "vue3-country-region-select";
import Loader from "@/components/sub-components/Loader.vue"
import { loginUser, selfInfo, selfAvatar, setAvatar, getAvatar } from "@/share/share"
import { useOverlayMeta } from '@unoverlays/vue'
import CropperForm from "@/components/sub-components/CropperForm.vue";

const showProfile = ref(true);
const showCropper = ref(false);
const showPageLoader = ref(false);

// set dob as default timepicker value
const dob = ref(new Date(selfInfo.value.dob))

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

watchEffect(async () => { selfInfo.value.dob = dob.value.toDateString() })

const memLvl = computed(() => {
    switch (selfInfo.value.level) {
        case 0:
            return "Unsubscribed"
        case 1:
            return "Subscribed"
        case 2:
            return "Advanced"
        case 3:
            return "Contributor"
        default:
            return "Unsubscribed"
    }
})
const dateReg = computed(() => (new Date(selfInfo.value.regtime)).toLocaleDateString("en-US"))
const dateExp = computed(() => (new Date(selfInfo.value.expire)).toLocaleDateString("en-US"))

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

#container-left,
#container-middle,
#container-right {
    display: flex;
    flex-direction: column;
    width: 30%;
    margin-top: 4%;
    margin-left: 4%;
}

#container-middle {
    margin-top: 4%;
    margin-left: 3%;
}

#container-right {
    margin-top: 2%;
    margin-left: 1%;
}

/* image */

#img-area {
    float: right;
    margin-left: 70%;
    margin-top: 2%;
    margin-bottom: 10%;
    width: 30%;
    object-fit: contain;
}

#img-area:hover {
    cursor: pointer;
}

/* col */

.lbl-val-span-1,
.lbl-val-span-2,
.lbl-val-span-3 {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size: smaller;
}

.lbl-val-span-1 {
    margin-bottom: 3%;
}

.lbl-val-span-2 {
    margin-bottom: 4%;
}

.lbl-val-span-3 {
    margin-bottom: 8%;
}

/* value */

.val-box {
    margin-left: 8%;
    margin-top: 2%;
    /* border-radius: 1%; */
}

#lbl-val-dob {
    margin-bottom: 8%;
}

#lbl-val-addr {
    margin-top: 4%;
}

#val-gender,
#val-country,
#val-city {
    float: right;
    width: 45%;
    margin-right: 25%;
    margin-top: 0%;
}

#val-tags,
#val-expire,
#val-joined,
#val-level,
#val-role,
#val-certified,
#val-official {
    float: right;
    width: 32%;
    margin-right: 20%;
    margin-top: 0%;
}

#val-tags {
    width: 70%;
    margin-top: 3%;
}

#val-joined,
#val-level,
#val-expire {
    text-align: right;
    color: rgb(90, 90, 90);
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