<template>
    <div class="post">
        <div class="title">
            <img :src="avatar" alt="avatar" class="img-area">
            <div class="owner">
                <p id="owner-name"> {{ OwnerName }} </p>
                <p id="owner-id"> @{{ Owner }} </p>
            </div>
            <span id="topic"> {{ Topic }} </span>
        </div>
        <hr id="hr-title">
        <div class="post-content">
            <p> {{ Content }} </p>
        </div>
        <hr id="hr-icons">
        <div id="icons">
            <a id="bookmark" @click="ToggleBookmark()">
                <font-awesome-icon icon="bookmark" />
            </a>
            <a id="thumb" @click="ToggleThumb()">
                <font-awesome-icon icon="thumbs-up" />
                {{ nThumbsUp }}
            </a>
        </div>
    </div>
</template>

<script setup lang="ts">

import { getPost, getUserAvatar, getUserFieldValue } from "@/share/share";

const props = defineProps({
    id: String,
    title: String,
})

const Post = ref()
const PostContent = ref()
const Owner = ref("")
const avatar = ref("")
const OwnerName = ref("")
const Topic = ref("")
const Content = ref("")
const nThumbsUp = ref(0)

onMounted(async () => { })

watchEffect(async () => {

    Post.value = await getPost(props.id!)
    Owner.value = Post.value.Owner
    avatar.value = (await getUserAvatar(Owner.value)).src

    OwnerName.value = (await getUserFieldValue(Owner.value)).Name
    if (OwnerName.value.length == 0) {
        OwnerName.value = "USER"
    }

    PostContent.value = JSON.parse(Post.value.RawJSON)
    Topic.value = PostContent.value.topic
    Content.value = PostContent.value.content_text
})

const ToggleThumb = async () => {
    alert("thumb")
}

const ToggleBookmark = async () => {
    alert("bookmark")
}

// UI
const PostHeight = computed(() => { "auto" })

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.post {
    background-color: rgb(240, 240, 240);
    height: v-bind(PostHeight);
    margin-bottom: 0.5%;
}

.title {
    height: 4em;
    font-size: small;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}

.img-area {
    float: left;
    color: rgb(33, 31, 31);
    width: 3.5em;
    height: auto;
    margin-left: 1%;
    margin-top: 1%;
    border-radius: 50%;
    object-fit: cover;
}

#topic {
    float: left;
    margin-left: 5%;
    padding-top: 3%;
    font-size: large;
}

.owner {
    float: right;
    margin-right: 2%;
    height: 3em;
    text-align: right;
}

#owner-name {
    margin-bottom: -15%;
}

.post-content {
    font-size: small;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    padding: 0% 2% 0% 2%;
    margin: auto;
    vertical-align: middle;
}

#hr-icons {
    border-top: 0.5px #8c8b8b;
    width: 20%;
    margin-left: 80%;
}

#icons {
    height: 1.5em;
}

#thumb {
    float: right;
    margin-right: 2%;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

#thumb:hover {
    cursor: pointer;
}

#bookmark {
    float: right;
    margin-right: 2%;
}

#bookmark:hover {
    cursor: pointer;
}
</style>
