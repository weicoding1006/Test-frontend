<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200 border border-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            v-for="(item, i) in props.tableHeader"
            :key="i"
            class="py-3 text-center"
          >
            {{ item }}
          </th>
          <th class="py-3 text-center">刪除</th>
          <th class="py-3 text-center">編輯</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="(item, i) in props.data" :key="item.id">
          <td class="text-center py-2">{{ item.id }}</td>
          <td class="text-center py-2">{{ item.productName }}</td>
          <td class="text-center py-2">{{ item.price }}</td>
          <td class="text-center py-2">{{ item.storeId }}</td>
          <td class="text-center py-2">
            <button
              @click="handleDelete(item.id)"
              class="bg-red-700 text-white py-1 px-3 rounded-md cursor-pointer"
            >
              刪除
            </button>
          </td>
          <td class="text-center py-2">
            <button
              @click="handleUpdate(item.id)"
              class="bg-gray-600 text-white py-1 px-3 rounded-md cursor-pointer"
            >
              編輯
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "@/api/product/product.interface";

type Emits = {
  (event: "delete", id: number): void;
  (event: "update", id: number): void;
};

const props = defineProps<{
  tableHeader: string[];
  data: Product[];
}>();

const emit = defineEmits<Emits>();

function handleDelete(id: number) {
  emit("delete", id);
}

function handleUpdate(id: number) {
  emit("update", id);
}
</script>
