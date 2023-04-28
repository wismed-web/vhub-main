<template>
    <div class="comment-input">
        <button id="btn-reply" @click="reply">
            <font-awesome-icon icon="reply" />
        </button>
        <textarea name="input" id="ta-comment" ref="ta" v-model="comment" placeholder="comment..." @input="resize"></textarea>
        <img :src="SelfAvatar" alt="avatar" class="avatar-area">
    </div>
</template>

<script setup lang="ts">

import { useNotification } from "@kyvg/vue3-notification"
import { SelfAvatar, postSubmit, getTemplate } from '@/share/share'

const props = defineProps({
    id: String,
    title: String,
})

const notification = useNotification()
const comment = ref("")
const ta = ref<HTMLTextAreaElement>()

onMounted(async () => {
    ta.value!.rows = 1
    await resize()
})

watchEffect(async () => { })

const resize = async () => {
    ta.value!.style.height = 'auto'
    ta.value!.style.height = ta.value!.scrollHeight + 'px'
}

const reply = async () => {

    let template: { topic: string; type: string; category: string; keywords: string; content_html: string; content_text: string; }
    {
        const de = await getTemplate()
        if (de.error != null) {
            notification.notify({
                title: "Error: Get Post Template",
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
        template.content_text = comment.value
    }
    {
        const de = await postSubmit(template, props.id!)
        if (de.error != null) {
            notification.notify({
                title: "Error: Submit Comment",
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

#ta-comment {
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