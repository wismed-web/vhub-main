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
            <p @click="DisplayContent()"> {{ Content }} </p>
        </div>
        <hr id="hr-icons">
        <div id="icons">
            <a id="eye">
                <font-awesome-icon icon="eye" /> {{ nSeen }}
            </a>
            <a id="bookmark" @click="Bookmark()">
                <font-awesome-icon icon="bookmark" />
            </a>
            <a id="heart" @click="HeartLike()">
                <font-awesome-icon icon="heart" /> {{ nHeart }}
            </a>
            <a id="thumb" @click="ThumbsUp()">
                <font-awesome-icon icon="thumbs-up" /> {{ nThumbsUp }}
            </a>
        </div>
    </div>
</template>

<script setup lang="ts">

import { getPost, getUserAvatar, getUserFieldValue, patchInteractToggle, getInteractStatus, patchBookmark, getBookmarkStatus, patchInteractRecord } from "@/share/share";

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

// icons 
const nThumbsUp = ref(0)
const DidThumbsUp = ref(false)
const nHeart = ref(0)
const DidHeartLike = ref(false)
const DidBookmark = ref(false)
const nSeen = ref(0)
const DidSeen = ref(false)

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

    //////////////////////////////////////////////

    const statusThumbsUp = await getInteractStatus("ThumbsUp", props.id!)
    nThumbsUp.value = statusThumbsUp.Count
    DidThumbsUp.value = statusThumbsUp.Status

    const statusHeartLike = await getInteractStatus("HeartLike", props.id!)
    nHeart.value = statusHeartLike.Count
    DidHeartLike.value = statusHeartLike.Status

    const statusSeen = await getInteractStatus("Seen", props.id!)
    nSeen.value = statusSeen.Count
    DidSeen.value = statusSeen.Status

    DidBookmark.value = await getBookmarkStatus(props.id!)

    // console.log(statusBookmark)
})

const DisplayContent = async () => {
    const statusSeen = await patchInteractRecord("Seen", props.id!)
    nSeen.value = statusSeen.Count
    DidSeen.value = statusSeen.Status
}

const ThumbsUp = async () => {
    const statusThumbsUp = await patchInteractToggle("ThumbsUp", props.id!)
    nThumbsUp.value = statusThumbsUp.Count
    DidThumbsUp.value = statusThumbsUp.Status
}

const HeartLike = async () => {
    const statusHeartLike = await patchInteractToggle("HeartLike", props.id!)
    nHeart.value = statusHeartLike.Count
    DidHeartLike.value = statusHeartLike.Status
}

const Bookmark = async () => {
    DidBookmark.value = await patchBookmark(props.id!)
}

// UI
const PostHeight = computed(() => { "auto" })
const HeartLikeColor = computed(() => DidHeartLike.value ? "red" : "darkgrey")
const ThumbsUpColor = computed(() => DidThumbsUp.value ? "blue" : "darkgrey")
const BookmarkColor = computed(() => DidBookmark.value ? "yellowgreen" : "darkgrey")
const EyeColor = computed(() => nSeen.value > 0 ? "black" : "darkgrey")

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

/* ******************************** */

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
    color: v-bind(ThumbsUpColor);
    margin-right: 3%;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

#thumb:hover {
    cursor: pointer;
}

#heart {
    float: right;
    color: v-bind(HeartLikeColor);
    margin-right: 3%;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

#heart:hover {
    cursor: pointer;
}

#bookmark {
    float: right;
    color: v-bind(BookmarkColor);
    margin-right: 3%;
}

#bookmark:hover {
    cursor: pointer;
}

#eye {
    float: right;
    color: v-bind(EyeColor);
    margin-right: 3%;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
</style>
