<template>
  <button
    @click="openAddModel"
    class="bg-blue-600 px-3 py-1 text-white rounded-md mb-2 cursor-pointer"
  >
    新增
  </button>
  <ProductTable
    :tableHeader="tableHeader"
    :data="productData"
    @delete="handleDelete"
    @update="openUpdateModal"
  />
  <D3Example />
  <Modal v-if="isOpenAddModal" @close="closeAddModal">
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

    <p class="mb-2 my-5 font-bold">店家名稱</p>
    <select v-model="createProductData.storeId" class="border w-full p-2">
      <option :value="option.id" v-for="option in storeData">
        {{ option.storeName }}
      </option>
    </select>

    <div class="flex gap-2">
      <button
        @click="closeAddModal"
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
  </Modal>

  <Modal v-if="isOpenEditModal" @close="closeEditModal">
    <label>
      <p class="mb-2 font-bold">產品名稱</p>
      <input
        v-model="editProductItem.productName"
        type="text"
        class="w-full border border-black p-2"
      />
    </label>
    <label>
      <p class="mb-2 my-5 font-bold">價格</p>
      <input
        v-model="editProductItem.price"
        type="text"
        class="w-full border border-black p-2"
      />
    </label>

    <p class="mb-2 my-5 font-bold">店家名稱</p>
    <select v-model="editProductItem.storeId" class="border w-full p-2">
      <option :value="option.id" v-for="option in storeData">
        {{ option.storeName }}
      </option>
    </select>

    <div class="flex gap-2">
      <button
        @click="closeEditModal"
        class="bg-red-700 px-3 py-1 text-white mt-5 rounded-md cursor-pointer"
      >
        取消
      </button>
      <button
        @click="handleEdit"
        class="bg-slate-600 px-3 py-1 text-white mt-5 rounded-md cursor-pointer"
      >
        儲存
      </button>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import Modal from "@/components/product/Modal.vue";
import D3Example from "@/components/D3Example.vue";
import ProductTable from "@/components/product/ProductTable.vue";
import { onMounted, ref } from "vue";
import { productAPI } from "@/api/product/product";
import { storeAPI } from "@/api/store/store";
import type {
  CreateProduct,
  CreateProductForm,
  editProduct,
  Product,
  updateProductForm,
} from "@/api/product/product.interface";
import type { Store } from "@/api/store/store.interface";

//變數---------------------------------------------------------------
const tableHeader = ["產品編號", "產品名稱", "價格", "店家編號"];
let productData = ref<Product[]>([]);
let storeData = ref<Store[]>([]);
let isOpenAddModal = ref<boolean>(false);
let isOpenEditModal = ref<boolean>(false);
let createProductData = ref<CreateProductForm>({
  productName: "",
  price: "",
  storeId: "",
});

let editProductItem = ref<updateProductForm>({
  id: "",
  productName: "",
  price: "",
  storeId: "",
});

//生命週期------------------------------------------------------------
onMounted(async () => {
  productData.value = await productAPI.get();
  storeData.value = await storeAPI.get();
  console.log(storeData.value);
});

//Function-----------------------------------------------------------
async function handleDelete(id: number) {
  let result = confirm("是否確定移除?");
  if (result) {
    console.log(`id:${id}`);
    await productAPI.delete(id);
    productData.value = await productAPI.get();
  }
}
function openAddModel() {
  isOpenAddModal.value = true;
}

function closeAddModal() {
  isOpenAddModal.value = false;
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
  closeAddModal();
}

function openUpdateModal(id: number) {
  console.log(id);
  isOpenEditModal.value = true;
  let result = productData.value.find((item) => {
    return item.id == id;
  });
  if (!result) return;

  editProductItem.value = {
    id: result.id.toString(),
    productName: result.productName,
    price: result.price.toString(),
    storeId: result.storeId.toString(),
  };
  console.log(editProductItem.value);
}
function closeEditModal() {
  isOpenEditModal.value = false;
}

async function handleEdit() {
  let id = parseInt(editProductItem.value.id)
  let requestData: editProduct = {
    productName: editProductItem.value.productName,
    price: parseInt(editProductItem.value.price),
    storeId: parseInt(editProductItem.value.storeId),
  };
  await productAPI.put(id, requestData);
  productData.value = await productAPI.get();
  closeEditModal();
}
</script>

<style scoped></style>
