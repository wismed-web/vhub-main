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
                <select class="val-box" id="val-gender" v-model="SelfInfo.gender">
                    <option>Male</option>
                    <option>Female</option>
                </select>
            </span>

            <span class="lbl-val-span-1">
                <label class="lbl-c1" for="val-country">Country:</label>
                <CountrySelect id="val-country" class="val-box" v-model="SelfInfo.country" :country="SelfInfo.country" topCountry="CN" />
            </span>

            <span class="lbl-val-span-1">
                <label class="lbl-c1" for="val-city">Region:</label>
                <RegionSelect id="val-city" class="val-box" v-model="SelfInfo.city" :country="SelfInfo.country" :region="SelfInfo.city" />
            </span>

            <span class="lbl-val-span-1" id="lbl-val-addr">
                <label class="lbl-c1" for="val-addr">Address:</label>
                <br>
                <input type="text" id="val-addr" class="val-box" v-model="SelfInfo.addr" />
            </span>

            <span class="lbl-val-span-1">
                <label class="lbl-c1" for="val-id-type">ID&nbsp;Type:</label>
                <br>
                <input type="text" id="val-id-type" class="val-box" v-model="SelfInfo.personalidtype" />
            </span>

            <span class="lbl-val-span-1">
                <label class="lbl-c1" for="val-id">ID&nbsp;Number:</label>
                <br>
                <input type="text" id="val-id" class="val-box" v-model="SelfInfo.personalid" />
            </span>

        </div>

        <div id="container-middle">

            <span class="lbl-val-span-2">
                <label class="lbl-c2" for="val-name">Name:</label>
                <br>
                <input type="text" id="val-name" class="val-box" v-model="SelfInfo.name" />
            </span>

            <span class="lbl-val-span-2">
                <label class="lbl-c2" for="val-phone">Phone:</label>
                <br>
                <input type="text" id="val-phone" class="val-box" v-model="SelfInfo.phone" />
            </span>

            <span class="lbl-val-span-2">
                <label class="lbl-c2" for="val-email">Email:</label>
                <br>
                <input type="text" id="val-email" class="val-box" v-model="SelfInfo.email" disabled />
            </span>

            <span class="lbl-val-span-2">
                <label class="lbl-c2" for="val-employer">Employer:</label>
                <br>
                <input type="text" id="val-employer" class="val-box" v-model="SelfInfo.employer" />
            </span>

            <span class="lbl-val-span-2">
                <label class="lbl-c2" for="val-title">Title:</label>
                <br>
                <input type="text" id="val-title" class="val-box" v-model="SelfInfo.title" />
            </span>

            <span class="lbl-val-span-2">
                <label class="lbl-c2" for="val-position">Position:</label>
                <br>
                <input type="text" id="val-position" class="val-box" v-model="SelfInfo.position" />
            </span>

            <span class="lbl-val-span-2">
                <label class="lbl-c2" for="val-bio">Bio:</label>
                <br>
                <input type="text" id="val-bio" class="val-box" v-model="SelfInfo.bio" />
            </span>

        </div>

        <div id="container-right">

            <img id="img-area" :src="SelfAvatar" alt="avatar" @click="PopupSetAvatar()">

            <span class="lbl-val-span-3">
                <label class="lbl-c3" for="val-role">V-HUB&nbsp;Role:</label>
                <select id="val-role" class="val-box" v-model="SelfInfo.role">
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                    <option value="system">system</option>
                </select>
            </span>

            <span class="lbl-val-span-3">
                <label class="lbl-c3" for="val-official">Official&nbsp;Account:</label>
                <select id="val-official" class="val-box" v-model="SelfInfo.official">
                    <option :value="true">True</option>
                    <option :value="false">False</option>
                </select>
            </span>

            <span class="lbl-val-span-3">
                <label class="lbl-c3" for="val-certified">Certified:</label>
                <select id="val-certified" class="val-box" v-model="SelfInfo.certified">
                    <option :value="true">True</option>
                    <option :value="false">False</option>
                </select>
            </span>

            <span class="lbl-val-span-3"> Membership: <span id="val-level"> {{ memLvl }} </span> </span>

            <span class="lbl-val-span-3"> Joined Since: <span id="val-joined"> {{ dateReg }} </span> </span>

            <span class="lbl-val-span-3"> Expire At: <span id="val-expire"> {{ dateExp }} </span> </span>

            <span class="lbl-val-span-3">
                <label class="lbl-c3" for="val-tags">Tags:</label>
                <input type="text" id="val-tags" class="val-box" v-model="SelfInfo.tags" />
            </span>

        </div>

        <button id="btn-confirm" @click="resolve('confirm')">confirm</button>
        <button id="btn-cancel" @click="reject('cancel')">cancel</button>

    </div>

    <CropperForm v-if="showCropper" title="set avatar:" btnConfirmText="set avatar" :maxCropW="512" :minCropW="128" :maxCropH="512" :minCropH="128" @cropReady="cropReady" @cropCancel="cropCancel" />
    <Loader v-if="loading" id="page-loader" />
</template>

<script setup lang="ts">

import Datepicker from "vue3-datepicker"
import { useNotification } from "@kyvg/vue3-notification";
import { CountrySelect, RegionSelect } from "vue3-country-region-select";
import Loader from "@/components/sub-components/Loader.vue"
import { loginUser, SelfInfo, SelfAvatar, setAvatar, getAvatar } from "@/share/share"
import { useOverlayMeta } from '@unoverlays/vue'
import CropperForm from "@/components/sub-components/CropperForm.vue";

const notification = useNotification()

const showProfile = ref(true);
const showCropper = ref(false);
const loading = ref(false);

// set dob as default timepicker value
const dob = ref(new Date(SelfInfo.value.dob))

const PopupSetAvatar = async () => {
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
const { visible, resolve, reject } = useOverlayMeta({
    // Animation duration to avoid premature destruction of components
    // Only use component in template and no need to define
    animation: 200
})

///////////////////////////////////////////////////////

const cropReady = async (file: string, cropArea: any) => {

    loading.value = true

    {
        const de = await setAvatar(file, cropArea.left, cropArea.top, cropArea.width, cropArea.height)
        if (de.error != null) {
            notification.notify({
                title: "Error: Set Avatar",
                text: de.error,
                type: "error"
            })
            return
        }
        showCropper.value = false
    }
    {
        const de = await getAvatar()
        if (de.error != null) {
            notification.notify({
                title: "Error: Get Avatar",
                text: de.error,
                type: "error"
            })
            return
        }
        SelfAvatar.value = de.data
        showProfile.value = true
    }

    loading.value = false
}

const cropCancel = async () => {
    showCropper.value = false
    showProfile.value = true
}

watchEffect(async () => { SelfInfo.value.dob = dob.value.toDateString() })

const memLvl = computed(() => {
    switch (SelfInfo.value.level) {
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
const dateReg = computed(() => (new Date(SelfInfo.value.regtime)).toLocaleDateString("en-US"))
const dateExp = computed(() => (new Date(SelfInfo.value.expire)).toLocaleDateString("en-US"))

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
    background-color: rgb(200, 200, 200);
    opacity: 0.99;
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
    margin-top: 0.5%;
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
    width: 40%;
    margin-right: 30%;
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
    width: 65%;
    margin-top: 2%;
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