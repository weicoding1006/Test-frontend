<script setup lang="ts">
import { RouterView } from "vue-router";
import Header from "@/components/Header.vue";
</script>

<template>
  <Header></Header>
  <main class="container mx-auto my-2">
    <RouterView></RouterView>
  </main>
</template>
