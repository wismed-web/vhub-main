<template>
    <div class="tbl">
        <TextLine text="registered users:" textAlign="left" textColor="gray" lineColor="gray" lineHeight="0px" />
        <Vue3EasyDataTable :headers="headers" :items="items" class="table" @click-row="PopupModal" />
    </div>
</template>

<!-- =============================================================================== -->

<script setup lang="ts">

import { useOverlayMeta, renderOverlay } from '@unoverlays/vue'
import { useNotification } from "@kyvg/vue3-notification";
import { getUserInfoList, getUserOnline, putUser, ModalOn, SelfInfo } from "@/share/share";
import TextLine from "@/components/sub-components/TextLine.vue";
import type { Header, Item } from "vue3-easy-data-table";
import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";
import UserListModal from '@/components/UserListModal.vue'

const notification = useNotification()

const headers = ref<any>(null);
const items = ref<any>(null);

headers.value = [
    { text: "USER", value: "user", sortable: true },
    { text: "EMAIL", value: "email", sortable: true },
    { text: "ROLE", value: "role", sortable: true },
    { text: "ONLINE", value: "online", sortable: true },
    { text: "ACTIVE", value: "active", sortable: true },
    { text: "JOINED", value: "joined", sortable: true }
];
items.value = [
    // { user: "", email: "", role: "", online: "", active: "" },
];

const reloadTable = async () => {

    items.value = []
    let users: { [x: string]: any; }[] | null

    {
        const de = await getUserInfoList('', '');
        if (de.error != null) {
            notification.notify({
                title: "User Info List",
                text: de.error,
                type: "error"
            })
            return
        }
        users = de.data
        if (users == null) {
            return null
        }
    }
    {
        const de = await getUserOnline();
        if (de.error != null) {
            notification.notify({
                title: "User Online List",
                text: de.error,
                type: "error"
            })
            return
        }
        const online = de.data
        if (online == null) {
            return null
        }

        const onlineUsers: string[] = []
        online.forEach((online: { [x: string]: any }) => {
            // console.log(online);
            onlineUsers.push(online['Uname'])
        });

        users.forEach((user: { [x: string]: any }) => {
            // console.log(user);

            const uname = user["uname"];
            const email = user["email"];
            const active = user["active"];
            const role = (user["role"] as string).length == 0 ? 'user' : user["role"];
            const joined = (user["regtime"] as string).substring(0, 10); // only retrieve YYYY-MM-DD

            items.value.push({
                user: uname,
                email: email,
                role: role,
                online: onlineUsers.includes(uname),
                active: active,
                joined: joined,
            });
        });
    }
}

onMounted(reloadTable);

////////////////////////////////////////////////////////////

type ClickRowArgument = Item & {
    isSelected?: boolean;
    indexInCurrentPage?: number;
};

// for simulate double click
// let t = 0;
// let got1st = false;
// const interval = 300;

// double click effect only
// const rowDbClick = (item: ClickRowArgument) => {
//     if (got1st && Date.now() - t > interval) {
//         got1st = false;
//     }
//     if (!got1st) {
//         t = Date.now();
//         got1st = true;
//     } else {
//         if (Date.now() - t <= interval) {
//             rowClick(item);
//         }
//         got1st = false;
//     }
// };

// click real action
const PopupModal = async (item: ClickRowArgument) => {

    // console.log(item);

    if (ModalOn.value) {
        return
    }

    // user setting restrictions
    //
    if (SelfInfo.value.role != 'admin' && SelfInfo.value.role != 'system') {
        notification.notify({
            title: "",
            text: "you are not authorized to set user",
            type: "warn"
        })
        return
    }
    if (item['online']) {
        notification.notify({
            title: "",
            text: "online user CANNOT be set",
            type: "warn"
        })
        return
    }

    ModalOn.value = true
    try {
        // result is updated user
        const result = await renderOverlay(UserListModal, { props: { uname: item['user'], role: item['role'], active: item['active'] }, })
        const de = await putUser(item['user'], result)
        if (de.error != null) {
            notification.notify({
                title: "Update User",
                text: de.error,
                type: "error"
            })
            ModalOn.value = false
            return
        }

        // console.log(rtU.data)
        await reloadTable()

    } catch (e) {
        switch (e) {
            case 'cancel':
                break
        }
    }
    ModalOn.value = false
};

////////////////////////////////////////////////////////////

// headers.value = [
//     { text: "PLAYER", value: "player" },
//     { text: "TEAM", value: "team" },
//     { text: "NUMBER", value: "number" },
//     { text: "POSITION", value: "position" },
//     { text: "HEIGHT", value: "indicator.height" },
//     { text: "WEIGHT (lbs)", value: "indicator.weight", sortable: true },
//     { text: "LAST ATTENDED", value: "lastAttended", width: 200 },
//     { text: "COUNTRY", value: "country" },
// ];
// items.value = [
//     { player: "Stephen Curry", team: "GSW", number: 30, position: 'G', indicator: { "height": '6-2', "weight": 185 }, lastAttended: "Davidson", country: "USA" },
//     { player: "Lebron James", team: "LAL", number: 6, position: 'F', indicator: { "height": '6-9', "weight": 250 }, lastAttended: "St. Vincent-St. Mary HS (OH)", country: "USA" },
//     { player: "Kevin Durant", team: "BKN", number: 7, position: 'F', indicator: { "height": '6-10', "weight": 240 }, lastAttended: "Texas-Austin", country: "USA" },
//     { player: "Giannis Antetokounmpo", team: "MIL", number: 34, position: 'F', indicator: { "height": '6-11', "weight": 242 }, lastAttended: "Filathlitikos", country: "Greece" },
// ];
</script>

<!-- =============================================================================== -->

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tbl {
    margin: auto;
    width: 90%;
    /* border: 3px solid green; */
    /* padding: 10px; */
}

.table {
    margin-top: 1%;
}
</style>
