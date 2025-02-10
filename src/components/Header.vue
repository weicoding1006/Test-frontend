<template>
  <header class="w-full bg-gray-300">
    <div class=" container mx-auto flex items-center justify-between py-3">
      <h1>TS教學</h1>
      <nav>
        <ul class=" flex items-center gap-3">
          <li v-for="item in route">
            <RouterLink :to="item.path">{{ item.pathName }}</RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
<script setup lang="ts">
const route = [
  {
    path: "/",
    pathName: "首頁",
  }
];
</script>
