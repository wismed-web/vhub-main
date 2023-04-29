<template>
    <button id="btn-reply" @click="onReply">
        <font-awesome-icon icon="reply" />
    </button>
    <textarea name="input" id="ta-reply" ref="ta" v-model="reply" placeholder="write your comment..." @input="resize"></textarea>
    <img :src="SelfAvatar" alt="avatar" class="avatar-area">
</template>

<script setup lang="ts">

import { useNotification } from "@kyvg/vue3-notification"
import { SelfAvatar, postSubmit, getTemplate } from '@/share/share'

const props = defineProps({
    id: String,
    title: String,
})

const emit = defineEmits(['onUpdateReply']) // invoke Post method to update replies number etc.

const notification = useNotification()
const reply = ref("")
const ta = ref<HTMLTextAreaElement>()
let OriH: string // keep ta original height, then restore it after replying.

onMounted(async () => {
    ta.value!.rows = 1
    await resize()
    OriH = ta.value!.style.height
})

watchEffect(async () => { })

const resize = async () => {
    ta.value!.style.height = 'auto'
    ta.value!.style.height = ta.value!.scrollHeight + 'px'
}

const onReply = async () => {

    let template: { topic: string; type: string; category: string; keywords: string; content_html: string; content_text: string; }
    {
        const de = await getTemplate()
        if (de.error != null) {
            notification.notify({
                title: "Get Post Template",
                text: de.error,
                type: "error"
            })
            return
        }
        template = de.data

        template.topic = props.title!
        template.type = "Comment"
        template.category = ""
        template.keywords = ""
        template.content_html = ""
        template.content_text = reply.value
    }
    {
        const de = await postSubmit(template, props.id!) // followee is NOT empty, which means it is Reply
        if (de.error != null) {
            notification.notify({
                title: "Submit Reply",
                text: de.error,
                type: "error"
            })
            return
        }
    }
    notification.notify({
        title: "",
        text: "replied!",
        type: "success"
    })

    {
        // update replies number in Post component
        emit('onUpdateReply')

        // clear reply input
        reply.value = ""

        // reset text area    
        ta.value!.style.height = OriH
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.avatar-area {
    float: left;
    width: 2em;
    height: auto;
    margin-left: 5%;
    margin-top: 1%;
    border-radius: 50%;
    object-fit: cover;
}

#ta-reply {
    float: right;
    width: 80%;
    resize: none;
    overflow: hidden;
    padding: 1% 0% 0% 1%;
    margin: 1% 2% 1% 0%;
    background-color: rgb(240, 240, 240);
    border: none;
}

#btn-reply {
    float: right;
    margin: 1% 2% 0% 0%;
}
</style>