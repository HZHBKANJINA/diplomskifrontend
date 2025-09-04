<template>
  <div class="modal-overlay" @click.self="zatvori">
    <div class="modal-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalComponent',
  methods: {
    zatvori() {
      this.$emit('zatvori');
    }
  }
}
</script>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 20px; 
}



.modal-content {
  position: relative;
  background: whitesmoke;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
  max-height: 90vh;
  overflow-y: auto;
}
</style>