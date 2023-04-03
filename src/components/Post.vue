<template>
    <div>
        <img :src="avatar" alt="avatar" class="img-area">
        <br>
        <span>{{ Owner }}</span>
        <span>{{ props.title }}</span>
        <hr>
        <div>
            {{ PostContent }}
            <!-- <br>
            {{ PostContent.topic }}
            <br>
            {{ PostContent.category }}
            <br>
            {{ PostContent.keywords }}
            <br>
            {{ PostContent.content_html }}
            <br>
            {{ PostContent.content_text }} -->
        </div>
    </div>
</template>

<script setup lang="ts">

import { getPost, getUserAvatar } from "@/share/share";

const props = defineProps({
    id: String,
    title: String,
})

const Post = ref()
const PostContent = ref()
const Owner = ref("")
const avatar = ref("")

onMounted(async () => {
    Post.value = await getPost(props.id!)
    PostContent.value = JSON.parse(Post.value.RawJSON)
    Owner.value = Post.value.Owner
    avatar.value = (await getUserAvatar(Owner.value)).src
})

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.img-area {
    float: left;
    color: rgb(33, 31, 31);
    width: 5%;
    border-radius: 20%;
    object-fit: contain;
}

.title {
    font-size: medium;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-weight: bold;
    font-style: italic;
    margin-left: 0.5%;
    margin-top: 0.8%;
}

.sep {
    float: left;
    margin-top: 0.5%;
    margin-bottom: 1%;
    width: 89%;
}
</style>
