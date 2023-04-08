<template>
    <!-- essential, minimal, full, and ""  -->
    <QuillEditor theme="snow" style="min-height:300px;" toolbar="full" :placeholder="hint" :title="hint" @ready="onReady" @textChange="textChange" />
</template>

<script setup lang="ts">

import { QuillEditor, Quill } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import { PostJsonHTML, PostJsonTEXT } from "@/share/share"

const hint = ref("content");
let quillDef: Quill;

const onReady = (quill: Quill) => {
    quillDef = quill;

    // fill existing html text into quill, format could change by quill    
    quillDef.root.innerHTML = "";
};

const textChange = () => {

    // console.log(quillDef.root.innerHTML);
    // console.log("--->", quillDef.getText(0, 100000));

    PostJsonHTML.value = quillDef.root.innerHTML
    PostJsonTEXT.value = quillDef.getText(0, 100000)
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
