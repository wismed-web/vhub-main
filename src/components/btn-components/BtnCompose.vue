<template>
    <a class="float" id="check" @click="Submit()">
        <font-awesome-icon icon="check" class="floating" />
    </a>
    <a class="float" id="right-from-bracket" @click="Exit()">
        <font-awesome-icon icon="right-from-bracket" class="floating" />
    </a>
</template>

<script setup lang="ts">

import { Mode, getTemplate, postSubmit, getPostID, PostIDGroup, PostTitle, PostCategories, PostKeywords, PostJsonHTML, PostJsonTEXT, ClearPost } from "@/share/share";

const Submit = async () => {

    const template = await getTemplate()
    // console.log("--->", template)

    template.topic = PostTitle.value
    template.type = "Post"
    template.category = PostCategories.value
    template.keywords = PostKeywords.value
    template.content_html = PostJsonHTML.value
    template.content_text = PostJsonTEXT.value

    const rt = await postSubmit(template, "")
    if (rt != null) {
        Mode.value = 'view'
        await getPostID('time', 10)
        ClearPost()
        console.log("--->", PostIDGroup.value)
    }
};

const Exit = async () => {
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
    background-color: rgb(101, 149, 243);
    cursor: pointer;
}

.floating {
    margin-top: 22px;
    color: white;
}

#check {
    bottom: 120px;
}

#right-from-bracket {
    bottom: 40px;
}
</style>
