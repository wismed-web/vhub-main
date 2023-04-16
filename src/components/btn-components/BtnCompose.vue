<template>
    <a class="float" id="check" title="submit" @click="Submit()">
        <font-awesome-icon icon="check" class="floating" />
    </a>
    <a class="float" id="backward" title="go back" @click="Exit()">
        <font-awesome-icon icon="backward" class="floating" />
    </a>
</template>

<script setup lang="ts">

import { useNotification } from "@kyvg/vue3-notification";
import { Mode, getTemplate, postSubmit, getPostID, PostIDGroup, PostTitle, PostCategories, PostKeywords, PostJsonHTML, PostJsonTEXT, ClearPost } from "@/share/share";

const notification = useNotification()

const Submit = async () => {

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
        // console.log("--->", template)

        template.topic = PostTitle.value
        template.type = "Post"
        template.category = PostCategories.value
        template.keywords = PostKeywords.value
        template.content_html = PostJsonHTML.value
        template.content_text = PostJsonTEXT.value
    }
    {
        const de = await postSubmit(template, "")
        if (de.error != null) {
            notification.notify({
                title: "Error: Submit Post",
                text: de.error,
                type: "error"
            })
            return
        }
    }

    Mode.value = 'view'

    {
        const de = await getPostID('time', 15) // 15 minutes
        if (de.error != null) {
            notification.notify({
                title: "Error: Get Post ID",
                text: de.error,
                type: "error"
            })
            return
        }
        if (de.data.length == 0) {
            notification.notify({
                title: "",
                text: "no posts available",
                type: "error"
            })
            return
        }
        PostIDGroup.value = [...new Set(de.data.concat(PostIDGroup.value))];
        PostIDGroup.value = PostIDGroup.value.filter((element: any) => element !== undefined)
        console.log("--->", PostIDGroup.value)
    }

    ClearPost()
};

const Exit = async () => {
    ClearPost()
    Mode.value = 'view'
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.float {
    position: fixed;
    width: 60px;
    height: 60px;
    bottom: 120px;
    right: 40px;
    background-color: #8bcef2;
    color: #fff;
    border-radius: 50px;
    text-align: center;
    box-shadow: 2px 2px 3px #999;
}

.float:hover {
    background-color: rgb(144, 238, 244);
    cursor: pointer;
}

.floating {
    margin-top: 22px;
    color: white;
}

#check {
    bottom: 120px;
}

#backward {
    bottom: 40px;
}
</style>
