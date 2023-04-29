<template>
    <div v-if="display" class="reply">
        <hr id="hr-reply">
        <div class="owner">
            <p id="owner-name"> {{ OwnerName }} </p>
            <p id="owner-id"> @{{ Owner }} </p>
        </div>
        <textarea name="input" id="ta-reply" ref="ta" v-model="Content" readonly></textarea>
        <img :src="avatar" alt="avatar" class="avatar-area">
        <hr id="hr-icons">
        <div id="icons">
            <a id="heart" @click="HeartLike()"> <font-awesome-icon icon="heart" /> {{ nHeart }} </a>
            <a id="thumb" @click="ThumbsUp()"> <font-awesome-icon icon="thumbs-up" /> {{ nThumbsUp }} </a>
        </div>
    </div>
</template>

<script setup lang="ts">

import { useNotification } from "@kyvg/vue3-notification";
import { getPost, getUserAvatar, getUserFieldValue, patchInteractToggle, getInteractStatus } from "@/share/share";

const props = defineProps({
    id: String,
})

const Post = ref()
const Owner = ref("")
const avatar = ref("")
const OwnerName = ref("")

const PostContent = ref()
const Topic = ref("")
const PostType = ref("")
const Keywords = ref("")
const Categories = ref("")
const Content = ref("")
const ContentFmt = ref("")

const display = ref(true)
const notification = useNotification()

// icons 
const nThumbsUp = ref(0)
const DidThumbsUp = ref(false)
const nHeart = ref(0)
const DidHeartLike = ref(false)

const ta = ref<HTMLTextAreaElement>()
const resize = async () => {
    ta.value!.style.height = 'auto'
    ta.value!.style.height = ta.value!.scrollHeight + 'px'
}

onMounted(async () => { })

watchEffect(async () => {
    {
        const de = await getPost(props.id!)
        if (de.error != null) {
            notification.notify({
                title: "Get Post(Reply)",
                text: de.error,
                type: "error"
            })
            display.value = false // if Post content cannot be fetched, DO NOT show it !
            return
        }
        Post.value = de.data
        Owner.value = Post.value.Owner
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
    PostContent.value = JSON.parse(Post.value.RawJSON)
    // console.log(PostContent.value)
    Topic.value = PostContent.value.topic
    PostType.value = PostContent.value.type
    Keywords.value = PostContent.value.keywords
    Categories.value = PostContent.value.category
    Content.value = PostContent.value.content_text
    ContentFmt.value = PostContent.value.content_html

    // console.log("Content:", ContentFmt.value)

    //////////////////////////////////////////////

    ta.value!.value = Content.value // [v-model] affects 'ta' after 'watchEffect', so we have to manually assign value here!
    await resize()

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
})

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

// UI
const PostHeight = computed(() => { "auto" })
const HeartLikeColor = computed(() => DidHeartLike.value ? "red" : "darkgrey")
const ThumbsUpColor = computed(() => DidThumbsUp.value ? "blue" : "darkgrey")

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.reply {
    background-color: rgb(240, 240, 240);
    height: v-bind(PostHeight);
    margin-bottom: 0.5%;
}

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
    width: 78%;
    resize: vertical;
    overflow: hidden;
    padding: 1% 0% 0% 1%;
    margin: 1% 2% 1% 0%;
    background-color: rgb(240, 240, 240);
    border: none;
}

.owner {
    float: right;
    width: auto;
    height: 1em;
    margin-right: 2%;
    text-align: right;
    font-size: x-small;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

#owner-name {
    margin-bottom: -25%;
}

/* ******************************** */

#hr-reply {
    border-top: 0.8px #8c8b8b;
    width: 95%;
    margin-left: 5%;
}

#hr-icons {
    border-top: 0.5px #8c8b8b;
    width: 12%;
    margin-left: 88%;
}

#icons {
    height: 1.5em;
}

#thumb {
    float: right;
    color: v-bind(ThumbsUpColor);
    margin-right: 2%;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

#thumb:hover {
    cursor: pointer;
}

#heart {
    float: right;
    color: v-bind(HeartLikeColor);
    margin-right: 2%;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

#heart:hover {
    cursor: pointer;
}
</style>
