<template>
  <div class="modal" v-if="show">
    <div class="modal-dialog">
      <div class="modal-content px-3">
        <div class="modal-header">
          <div v-if="currentStep === 1">
            <div class="underline">
              <h4 class="modal-title">
                {{ brandToEdit ? "Edit Brand" : "Add Brand" }}
              </h4>
            </div>
          </div>
          <div v-else-if="currentStep === 2">
            <h4>Notifikasi</h4>
          </div>
        </div>
        <div class="modal-body">
          <div v-if="currentStep === 1">
            <form @submit.prevent="saveBrand">
              <label for="name">Name:</label>
              <input
                v-model="brandData.name"
                type="text"
                id="name"
                class="form-control"
                required
              />

              <label for="type">Type:</label>
              <select
                v-model="brandData.type"
                id="type"
                class="form-select"
                required
              >
                <option value="cars">Cars</option>
                <option value="motorcycle">Motorcycle</option>
              </select>

              <label for="description">Description:</label>
              <textarea
                v-model="brandData.description"
                id="description"
                rows="4"
                class="form-control"
              ></textarea>

              <label for="paymentMethod">Payment Method:</label>
              <select
                v-model="brandData.payment_method"
                id="paymentMethod"
                class="form-select"
                required
              >
                <option value="cash">Cash</option>
                <option value="credit_card">Credit Card</option>
                <option value="debit_card">Debit Card</option>
                <option value="paypal">PayPal</option>
                <option value="stripe">Stripe</option>
                <option value="check">Check</option>
              </select>
              <div class="modal-footer">
                <button
                  v-if="currentStep === 1"
                  class="btn btn-primary"
                  type="submit"
                >
                  Save
                </button>
                <button
                  class="btn btn-secondary"
                  v-if="currentStep === 1"
                  @click="closeModal"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
          <div v-if="currentStep === 2">
            <p v-if="brandData.isSuccess" class="success-message">
              Brand data
              {{ isBrandUpdated ? "updated" : "saved" }} successfully!
            </p>
            <p v-else class="error-message">
              An error occurred while saving the event data.
            </p>
          </div>
        </div>
        <div class="modal-footer">
          <button
            v-if="currentStep === 2"
            class="btn btn-primary"
            @click="closeModal"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
    brandToEdit: Object,
  },
  watch: {
    brandToEdit: {
      handler(newBrand) {
        if (newBrand) {
          this.brandData = { ...newBrand };
        } else {
          this.resetFields();
        }
      },
      immediate: true,
    },
  },
  data() {
    return {
      currentStep: 1,
      isBrandUpdated: false,
      brandData: {
        name: "",
        type: "",
        description: "",
        payment_method: "",
        isSuccess: false,
      },
    };
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
      this.isModalOpen = false;
    },
    resetFields() {
      this.brandData = {
        name: "",
        type: "",
        description: "",
        payment_method: "",
        created_at: "",
        updated_at: "",
        result: 0,
      };
      this.currentStep = 1;
      this.isBrandUpdated = false;
    },
    async saveBrand() {
      try {
        this.brandData.result = 0;
        if (this.brandToEdit) {
          // BrandToEdit exists, perform PUT request for updating
          const apiUrl = `http://127.0.0.1:8000/api/brands/${this.brandToEdit.id}`;
          const response = await fetch(apiUrl, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.brandData),
          });

          if (response.ok) {
            console.log("Brand data updated successfully");
            this.brandData.isSuccess = true;
            this.isBrandUpdated = true;
            this.currentStep = 2;
            this.$emit("brandSaved");
          } else {
            console.error("Error updating brand data:", response.statusText);
            this.brandData.isSuccess = false;
            this.currentStep = 2;
          }
        } else {
          // BrandToEdit doesn't exist, perform POST request for adding new brand
          const response = await fetch("http://127.0.0.1:8000/api/brands", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.brandData),
          });

          if (response.ok) {
            console.log("Brand data saved successfully");
            this.brandData.isSuccess = true;
            this.currentStep = 2;
            this.$emit("brandSaved");
          } else {
            console.error("Error saving brand data:", response.statusText);
          }
        }
      } catch (error) {
        console.error("An error occurred:", error);
        this.brandData.isSuccess = false;
        this.currentStep = 2;
      }
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

.modal-dialog {
  background-color: #fff;
  border-radius: 5px;
  max-width: 500px;
  width: 100%;
  border: none;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border: none;
  color: black;
}

.underline {
  border-bottom: 3px solid #ff9c04;
  width: 100px;
}

.modal-title {
  margin: 0;
  font-size: 18px;
}

.modal-body {
  padding: 15px;
  border: none;
}

.modal-footer {
  border: none;
  text-align: right;
  padding: 15px;
  background-color: #f9f9f9;
}

.form-control {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 12px;
  resize: vertical;
}

.form-select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 12px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  background-color: #ff9c04;
  color: white;
}

.btn-secondary {
  background-color: #373737;
  color: white;
}
.form-control,
.form-select {
  background-color: #e2e2e2;
}
</style>
