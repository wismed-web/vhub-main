<template>
    <a class="float" id="user-edit" @click="DisplayUserTable()" v-if="displayUserTable">
        <font-awesome-icon icon="user-edit" class="floating" />
    </a>
    <a class="float" id="delete-left" @click="DelPost()" v-if="displayPostDel">
        <font-awesome-icon icon="delete-left" class="floating" />
    </a>
</template>

<script setup lang="ts">

import { SelfInfo, ModalOn, delErasePost, delRemovePost, PostIDGroup, Mode } from '@/share/share';
import PostDelModal from '@/components/PostDelModal.vue';
import { useOverlayMeta, renderOverlay } from '@unoverlays/vue'
import { useNotification } from "@kyvg/vue3-notification";

const display = computed(() => SelfInfo.value.role == 'admin' || SelfInfo.value.role == 'system')
const displayUserTable = computed(() => display)
const displayPostDel = computed(() => display && PostIDGroup.value?.length > 0)

const notification = useNotification()

const DisplayUserTable = async () => {
    Mode.value = 'users'
};

const DelPost = async () => {
    if (ModalOn.value) {
        return
    }
    ModalOn.value = true
    try {

        const id = String(await renderOverlay(PostDelModal, { props: { id: '' }, }))
        if (id.length > 0) {
            const de = await delRemovePost(id)
            if (de.error != null) {
                notification.notify({
                    title: "Remove Post",
                    text: de.error,
                    type: "error"
                })
                ModalOn.value = false
                return
            }

            // remove current Post group
            PostIDGroup.value = PostIDGroup.value.filter((element: any) => element !== id)

            notification.notify({
                title: "",
                text: `${id} is removed`,
                type: "success"
            })
        }

    } catch (e) {
        switch (e) {
            case 'cancel':
                break
        }
    }
    ModalOn.value = false
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.float {
    position: fixed;
    width: 60px;
    height: 60px;
    top: 100px;
    right: 40px;
    background-color: #53bc8b;
    color: #fff;
    border-radius: 50px;
    text-align: center;
    box-shadow: 2px 2px 3px #999;
}

.float:hover {
    background-color: rgb(129, 223, 67);
    cursor: pointer;
}

.floating {
    margin-top: 22px;
    color: white;
}

#user-edit {
    top: 100px;
}

#delete-left {
    top: 180px;
    background-color: rgb(200, 50, 50);
}

#delete-left:hover {
    background-color: rgb(255, 50, 50);
}
</style>
