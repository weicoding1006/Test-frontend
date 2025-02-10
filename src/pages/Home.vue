<template>
  <button class="bg-blue-600 px-3 py-1 text-white rounded-md mb-2 cursor-pointer">新增</button>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200 border border-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            v-for="(item, i) in tableHeader"
            :key="i"
            class="py-3 text-center"
          >
            {{ item }}
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="product in productData">
          <td
            v-for="item in product"
            class="text-center py-2 whitespace-nowrap"
          >
            {{ item }}
          </td>
        </tr>
      </tbody>
    </table>
    <D3Example/>
  </div>
</template>

<script setup lang="ts">
import D3Example from "@/components/D3Example.vue";
import { onMounted, ref } from "vue";
import { productAPI } from "@/api/product";
let productData = ref([]);
const tableHeader = ["產品編號", "產品名稱", "價格", "店家編號"];
onMounted(async () => {
  productData.value = await productAPI.get();
  console.log(productData.value);

  // await productAPI.post({
  //   productName: "測試",
  //   price: 100,
  // });
  // console.log(productData.value);
});
</script>

<style scoped></style>
