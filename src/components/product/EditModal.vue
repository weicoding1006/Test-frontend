<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-container">
      <div class="modal-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Emits = {
  (event: "close"): void;
};
const emit = defineEmits<Emits>();
function closeModal() {
  emit("close");
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  .modal-container {
    background-color: #fff;
    padding: 1.5rem;
    max-width: 600px;
    width: 90%;
    position: relative;
  }
}
</style>
