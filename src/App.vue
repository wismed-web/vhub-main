<template>
    <header>
        <div class="wrapper">
        </div>
    </header>

    <main>
        <Loader id="page-loader"/>
    </main>
</template>

<script setup lang="ts">
import Loader from "@/components/Loader.vue"
</script>

<style scoped>

#page-loader {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
}

</style>
