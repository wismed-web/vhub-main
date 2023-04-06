<template>
    <p class="title"> {{ Titles[idx] }} </p>
</template>

<script setup lang="ts">

import { Mode } from '@/share/share';

const Titles = [
    "For You ... ",
    "Sharing Your Medical Thoughts and Experience ... ",
];

const idx = computed(() => Mode.value == 'view' ? 0 : 1)

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
    font-size: large;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-weight: bold;
    font-style: italic;
    padding-left: 1%;
    padding-bottom: 0.5%;
    border-bottom: 2px solid gray;
}
</style>
