<template>
  <div class="modal" v-if="show">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <b>
            <h4 class="modal-title">Login Error</h4>
          </b>
        </div>
        <div class="modal-body">
          <p>{{ errorMessage }}</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" @click="closeModal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
    errorMessage: String,
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
/* ErrorModal.vue */

/* Customize modal styles as needed */
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

.modal-dialog {
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
  padding-bottom: 10px;
  border: none;
}

.modal-title {
  margin: 0;
  font-size: 18px;
}

.modal-body {
  padding-top: 10px;
  border: none;
}
.modal-footer {
  border: none;
}

.btn {
  background-color: #ff9c04;
  border-color: #ff9c04;
}
</style>
