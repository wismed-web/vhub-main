<template>
    <a class="float" @click="Submit()" v-if="!ModalOn">
        <font-awesome-icon icon="check" class="floating" />
    </a>
</template>

<script setup lang="ts">

import { Mode, ModalOn, getTemplate, postSubmit } from "@/share/share";

const Submit = async () => {

    // const htmlValData = jsonHTML.GenJSON(true)
    // const textValData = jsonTEXT.GenJSON(false)

    // var blobHTML = new Blob([htmlValData], { type: "text/plain;charset=utf-8" });
    // FileSaver.saveAs(blobHTML, "dd_html_" + jsonTEXT.Entity + ".json");

    // var blobTEXT = new Blob([textValData], { type: "text/plain;charset=utf-8" });
    // FileSaver.saveAs(blobTEXT, "dd_txt_" + jsonTEXT.Entity + ".json");

    //////////////////////////////////////////////////

    // const textValData = jsonTEXT.GenJSON(false);
    // if (!await postDataToDic(textValData)) {
    //     return;
    // }

    // const htmlValData = jsonHTML.GenJSON(true);
    // if (!await postDataToDic(htmlValData)) {
    //     return;
    // }

    // alert(`[${jsonTEXT.Entity}] has been uploaded, redirecting to main page`);

    const template = await getTemplate()
    console.log("--->", template)

    template.topic = "topic"
    template.type = "type"
    template.category = "category"
    template.keywords = ""
    template.content_html = ""
    template.content_text = ""

    const rt = await postSubmit(template, "")
    if (rt != null) {
        Mode.value = 'view'
    }
};

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
    ;
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
</style>
