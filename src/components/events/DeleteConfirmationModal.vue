<template>
  <div class="modal">
    <div class="modal-dialog delete-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Konfirmasi Penghapusan</h4>
        </div>
        <div class="modal-body">
          <p>Anda yakin ingin menghapus acara ini?</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closeModal">Batal</button>
          <button class="btn btn-danger" @click="confirmDelete">Hapus</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    confirmDelete() {
      this.$emit("delete");
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}

.delete-dialog {
  background-color: #fff;
  border-radius: 5px;
  max-width: 400px;
  width: 100%;
  border: none;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px; /* Header background color */
  color: rgb(0, 0, 0);
  border: none;
}

.modal-title {
  margin: 0;
  font-size: 18px;
}

.modal-body {
  padding: 15px;
}

.modal-footer {
  padding: 15px;
  border: none;
  text-align: right;
  background-color: #f5f5f5; /* Footer background color */
}

.btn {
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-secondary {
  background-color: #dcdcdc; /* Cancel button background color */
  border-color: #dcdcdc;
  color: #333;
}

.btn-danger {
  background-color: #f44336; /* Delete button background color */
  border-color: #f44336;
  color: white;
}
</style>
