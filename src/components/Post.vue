<template>
    <div v-if="bPost" class="post">
        <div class="title">
            <img :src="avatar" alt="avatar" class="avatar-area">
            <div class="owner">
                <p id="owner-name"> {{ OwnerName }} </p>
                <p id="owner-id"> @{{ Owner }} </p>
            </div>
            <span id="topic" @click="TitleDbClick(props.id!)"> {{ Topic }} </span>
        </div>
        <hr id="hr-title">
        <div class="post-content" @click="DisplayContent()">
            <p> {{ Content }} </p>
            <!-- v-for i from 1 to n -->
            <img v-for="i in nImage" :src="getImgSrc(i)" alt="Post-Image" :width="200" :height="200" class="media-area">
            <video v-for="i in nVideo" :src="getVideoSrc(i)" :width="200" :height="200" class="media-area" controls></video>
        </div>
        <hr id="hr-icons">
        <div id="icons">
            <a id="reply" @click="ToggleReply()"> <font-awesome-icon icon="comment" /> {{ nReply }} </a>
            <a id="eye"> <font-awesome-icon icon="eye" /> {{ nSeen }} </a>
            <a id="bookmark" @click="Bookmark()"> <font-awesome-icon icon="bookmark" /> </a>
            <a id="heart" @click="HeartLike()"> <font-awesome-icon icon="heart" /> {{ nHeart }} </a>
            <a id="thumb" @click="ThumbsUp()"> <font-awesome-icon icon="thumbs-up" /> {{ nThumbsUp }} </a>
        </div>
        <hr v-if="blkReply" id="hr-reply-blk">
        <div v-if="blkReply">
            <ReplyInput :id="props.id!" :title="props.title!" @onUpdateReply="UpdateReply" />
            <Reply v-for="i in nReply" :id="Replies[i - 1]" />
        </div>
    </div>
</template>

<script setup lang="ts">

import { useNotification } from "@kyvg/vue3-notification";
import { getPost, getUserAvatar, getUserFieldValue, patchInteractToggle, getInteractStatus, patchBookmark, getBookmarkStatus, patchInteractRecord, getReply } from "@/share/share";
import { ExtractImgSrcBase64, ExtractIframeSrcUrl } from "@/share/util";
import ReplyInput from "@/components/post-components/ReplyInput.vue";
import Reply from "@/components/post-components/Reply.vue";

const props = defineProps({
    id: String,
    title: String
})

const PostEvent = ref()
const Owner = ref("")
const avatar = ref("")
const OwnerName = ref("")
const PostTime = ref("")

const PostContent = ref()
const Topic = ref("")
const PostType = ref("")
const Keywords = ref("")
const Categories = ref("")
const Content = ref("")
const ContentFmt = ref("") // for whole format preview

const nImage = ref(0)
const imgSrcGrp: string[] = []
const getImgSrc = (i: number) => {
    return imgSrcGrp[i - 1]
}
const nVideo = ref(0)
const videoSrcGrp: string[] = []
const getVideoSrc = (i: number) => {
    return videoSrcGrp[i - 1]
}

const bPost = ref(true)
const emit = defineEmits(['onRenderPost']) // invoke RenderPost method to render Post format detail.
const notification = useNotification()

// icons 
const nThumbsUp = ref(0)
const DidThumbsUp = ref(false)
const nHeart = ref(0)
const DidHeartLike = ref(false)
const DidBookmark = ref(false)
const nSeen = ref(0)
const DidSeen = ref(false)

// replies
const blkReply = ref(false)
const Replies = ref([])
const nReply = ref(0) // child 'ReplyInput' updates this number

onMounted(async () => {
    await UpdateReply()
})

watchEffect(async () => {
    {
        const de = await getPost(props.id!)
        if (de.error != null) {
            notification.notify({
                title: "Get Post",
                text: de.error,
                type: "error"
            })
            bPost.value = false // if Post content cannot be fetched, DO NOT show it !
            return
        }
        PostEvent.value = de.data
        Owner.value = PostEvent.value.Owner
        PostTime.value = PostEvent.value.Tm
    }
    {
        const de = await getUserAvatar(Owner.value)
        if (de.error != null) {
            notification.notify({
                title: "Get User Avatar",
                text: de.error,
                type: "error"
            })
            return
        }
        avatar.value = de.data
    }
    {
        const de = await getUserFieldValue(Owner.value)
        if (de.error != null) {
            notification.notify({
                title: "Get User Name",
                text: de.error,
                type: "error"
            })
            return
        }
        OwnerName.value = de.data.Name.length > 0 ? de.data.Name : "USER"
    }

    // console.log(Post.value)

    // refer to /api/definition
    PostContent.value = JSON.parse(PostEvent.value.RawJSON)
    // console.log(PostContent.value)
    Topic.value = PostContent.value.topic
    PostType.value = PostContent.value.type
    Keywords.value = PostContent.value.keywords
    Categories.value = PostContent.value.category
    Content.value = PostContent.value.content_text
    ContentFmt.value = PostContent.value.content_html

    // console.log("Content:", ContentFmt.value)

    const srcImgGrp = await ExtractImgSrcBase64(ContentFmt.value)
    nImage.value = srcImgGrp.length
    // console.log("images: --->", nImage.value)
    srcImgGrp.forEach((src) => { imgSrcGrp.push(src) })

    const srcVideoGrp = await ExtractIframeSrcUrl(ContentFmt.value)
    nVideo.value = srcVideoGrp.length
    // console.log("videos: --->", nVideo.value)
    srcVideoGrp.forEach((src) => { videoSrcGrp.push(src) })

    //////////////////////////////////////////////

    {
        const de = await getInteractStatus("ThumbsUp", props.id!)
        if (de.error != null) {
            notification.notify({
                title: "Get ThumbsUp Status",
                text: de.error,
                type: "error"
            })
            return
        }
        nThumbsUp.value = de.data.Count
        DidThumbsUp.value = de.data.Status
    }
    {
        const de = await getInteractStatus("HeartLike", props.id!)
        if (de.error != null) {
            notification.notify({
                title: "Get HeartLike Status",
                text: de.error,
                type: "error"
            })
            return
        }
        nHeart.value = de.data.Count
        DidHeartLike.value = de.data.Status
    }
    {
        const de = await getInteractStatus("Seen", props.id!)
        if (de.error != null) {
            notification.notify({
                title: "Get Seen Status",
                text: de.error,
                type: "error"
            })
            return
        }
        nSeen.value = de.data.Count
        DidSeen.value = de.data.Status
    }
    {
        const de = await getBookmarkStatus(props.id!)
        if (de.error != null) {
            notification.notify({
                title: "Get Bookmark Status",
                text: de.error,
                type: "error"
            })
            return
        }
        DidBookmark.value = de.data
    }
})

const DisplayContent = async () => {
    const de = await patchInteractRecord("Seen", props.id!)
    if (de.error != null) {
        notification.notify({
            title: "Update Seen Status",
            text: de.error,
            type: "error"
        })
        return
    }
    nSeen.value = de.data.Count
    DidSeen.value = de.data.Status

    // Open Detail ...
    emit("onRenderPost", Topic.value, OwnerName.value, PostTime.value, ContentFmt.value) // *** Trigger Display Detail Page Rendering ***
}

const ThumbsUp = async () => {
    const de = await patchInteractToggle("ThumbsUp", props.id!)
    if (de.error != null) {
        notification.notify({
            title: "Update ThumbsUp Status",
            text: de.error,
            type: "error"
        })
        return
    }
    nThumbsUp.value = de.data.Count
    DidThumbsUp.value = de.data.Status
}

const HeartLike = async () => {
    const de = await patchInteractToggle("HeartLike", props.id!)
    if (de.error != null) {
        notification.notify({
            title: "Update HeartLike Status",
            text: de.error,
            type: "error"
        })
        return
    }
    nHeart.value = de.data.Count
    DidHeartLike.value = de.data.Status
}

const Bookmark = async () => {
    const de = await patchBookmark(props.id!)
    if (de.error != null) {
        return
    }
    DidBookmark.value = de.data
}

const ToggleReply = async () => {
    blkReply.value = !blkReply.value
}

// 'ReplyInput' also invoke this
const UpdateReply = async () => {
    const de = await getReply(props.id!)
    if (de.error != null) {
        notification.notify({
            title: "getReply",
            text: de.error,
            type: "error"
        })
        return
    }
    Replies.value = de.data
    nReply.value = Replies.value.length
}

// simulate double click
let t = 0;
let got1st = false;
const interval = 300;

// double click effect only
const TitleDbClick = (id: string) => {
    if (got1st && Date.now() - t > interval) {
        got1st = false;
    }
    if (!got1st) {
        t = Date.now();
        got1st = true;
    } else {
        if (Date.now() - t <= interval) {
            notification.notify({
                title: Topic.value,
                text: id
            })
        }
        got1st = false;
    }
};

// UI
const PostHeight = computed(() => { "auto" })
const HeartLikeColor = computed(() => DidHeartLike.value ? "red" : "darkgrey")
const ThumbsUpColor = computed(() => DidThumbsUp.value ? "blue" : "darkgrey")
const BookmarkColor = computed(() => DidBookmark.value ? "yellowgreen" : "darkgrey")
const EyeColor = computed(() => nSeen.value > 0 ? "black" : "darkgrey")
const ReplyColor = computed(() => nReply.value > 0 ? "lightseagreen" : "darkgrey")

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

.avatar-area {
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
    font-size: small;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

#owner-name {
    margin-bottom: -25%;
}

#hr-title {
    border-top: 0.8px #4095ef;
    width: 93%;
    margin-left: 7%;
}

/* #owner-id {} */

.post-content {
    font-size: small;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    padding: 0% 9% 0% 9%;
    margin: auto;
    vertical-align: middle;
}

.post-content:hover {
    cursor: pointer;
}

.media-area {
    border-radius: 3%;
    object-fit: cover;
    margin-right: 1%;
}

/* ******************************** */

#hr-reply-blk {
    border-top: 0.8px #8c8b8b;
    width: 95%;
    margin-left: 5%;
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

#reply {
    float: right;
    color: v-bind(ReplyColor);
    margin-right: 3%;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

#reply:hover {
    cursor: pointer;
}
</style>
