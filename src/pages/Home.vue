<template>
  <button
    @click="openModel"
    class="bg-blue-600 px-3 py-1 text-white rounded-md mb-2 cursor-pointer"
  >
    新增
  </button>
  <ProductTable
    :tableHeader="tableHeader"
    :data="productData"
    @delete="handleDelete"
  />
  <D3Example />
  <EditModal v-if="isOpen" @close="closeModal">
    <label>
      <p class="mb-2 font-bold">產品名稱</p>
      <input
        v-model="createProductData.productName"
        type="text"
        class="w-full border border-black p-2"
      />
    </label>
    <label>
      <p class="mb-2 my-5 font-bold">價格</p>
      <input
        v-model="createProductData.price"
        type="text"
        class="w-full border border-black p-2"
      />
    </label>
    <label>
      <p class="mb-2 my-5 font-bold">店家ID</p>
      <input
        v-model="createProductData.storeId"
        type="text"
        class="w-full border border-black p-2"
      />
    </label>
    <div class="flex gap-2">
      <button
        @click="closeModal"
        class="bg-red-700 px-3 py-1 text-white mt-5 rounded-md cursor-pointer"
      >
        取消
      </button>
      <button
        @click="handleSave"
        class="bg-slate-600 px-3 py-1 text-white mt-5 rounded-md cursor-pointer"
      >
        儲存
      </button>
    </div>
  </EditModal>
</template>

<script setup lang="ts">
import EditModal from "@/components/product/EditModal.vue";
import D3Example from "@/components/D3Example.vue";
import ProductTable from "@/components/product/ProductTable.vue";
import { onMounted, ref } from "vue";
import { productAPI } from "@/api/product";
import type { CreateProduct, CreateProductForm } from "@/api/product.interface";
let productData = ref([]);
let isOpen = ref<boolean>(false);
const tableHeader = ["產品編號", "產品名稱", "價格", "店家編號"];
let createProductData = ref<CreateProductForm>({
  productName: "",
  price: "",
  storeId: "",
});

onMounted(async () => {
  productData.value = await productAPI.get();
});

async function handleDelete(id: number) {
  let result = confirm("是否確定移除?");
  if (result) {
    console.log(`id:${id}`);
    await productAPI.delete(id);
    productData.value = await productAPI.get();
  }
}
function openModel() {
  isOpen.value = true;
}

function closeModal() {
  isOpen.value = false;
  createProductData.value.price = "";
  createProductData.value.productName = "";
  createProductData.value.storeId = "";
}

async function handleSave() {
  const requestData: CreateProduct = {
    productName: createProductData.value.productName,
    price: parseInt(createProductData.value.price),
    storeId: parseInt(createProductData.value.storeId),
  };
  await productAPI.post(requestData);
  productData.value = await productAPI.get();
  closeModal();
}
</script>

<style scoped></style>
