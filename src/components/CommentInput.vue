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

import { SelfAvatar } from '@/share/share'

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
    alert(comment.value)
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
    margin: 1% 2% 1% 0%;
}
</style>