<template>
  <div>
    <div class="filters">
      <button class="button" @click="openModal(true)">Input Data Baru</button>
      <input
        id="brandSearch"
        v-model="searchText"
        @input="searchBrands"
        placeholder="Search brands..."
        type="search"
        class="form-control right-0"
      />
    </div>

    <div class="header-table">DATA BRAND</div>
    <div class="table-container">
      <table class="table">
        <thead class="tabel">
          <tr>
            <th scope="col">NO</th>
            <th scope="col">BRAND</th>
            <th scope="col">TYPE</th>
            <th scope="col">RESULT</th>
            <th scope="col">DESCRIPTION</th>
            <th scope="col">PAYMENT</th>
            <th scope="col">TOOLS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(brand, index) in filteredBrands" :key="brand.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ brand.name }}</td>
            <td>{{ brand.type }}</td>
            <td>{{ brand.result }}</td>
            <td class="decscription">{{ brand.description }}</td>
            <td>{{ brand.payment_method }}</td>
            <td class="tools">
              <button @click="editBrand(brand)">
                <i class="fas fa-pencil-alt"></i>
              </button>
              <button @click="openDeleteModal(brand.id)">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <DeleteConfirmationModal
      v-if="isDeleteModalOpen"
      @close="closeDeleteModal"
      @delete="deleteBrandConfirmed"
    />
    <AdexInputModal
      :show="isModalOpen"
      @closeModal="closeModal"
      @brandSaved="fetchBrands"
      :brandToEdit="brandToEdit"
      ref="modalComponent"
    />
  </div>
</template>

<script>
import AdexInputModal from "./AdexInputModal.vue";
import DeleteConfirmationModal from "./DeleteConfirmationModal.vue";

export default {
  components: {
    AdexInputModal,
    DeleteConfirmationModal,
  },
  data() {
    return {
      isModalOpen: false,
      brands: [],
      searchText: "",
      isDeleteModalOpen: false,
      brandToDeleteId: null,
      brandToEdit: null,
    };
  },
  mounted() {
    this.fetchBrands();
    this.$watch(
      () => this.$route.path,
      (to, from) => {
        console.log("route path has changed from " + from + " to " + to);
        this.fetchBrands();
      }
    );
  },
  computed: {
    filteredBrands() {
      const lowercaseSearchText = this.searchText.toLowerCase();

      if (lowercaseSearchText === "") {
        return this.brands;
      }

      return this.brands.filter((brand) => {
        const brandName = brand.name.toLowerCase();
        return brandName.includes(lowercaseSearchText);
      });
    },
  },

  methods: {
    editBrand(brand) {
      this.brandToEdit = { ...brand }; // Copy the brand data to avoid two-way binding
      this.isModalOpen = true; // Open the modal
    },
    openModal(isNewData) {
      this.isModalOpen = true;
      if (isNewData) {
        this.brandToEdit = null;
        this.$nextTick(() => {
          if (this.$refs.modalComponent) {
            this.$refs.modalComponent.resetFields();
          }
        });
      }
      console.log(this.isModalOpen);
    },

    closeModal() {
      this.isModalOpen = false;
    },
    async fetchBrands() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/brands");
        const data = await response.json();
        this.brands = data;
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    },

    searchBrands() {
      // Only update the brands shown when search text changes
      if (!this.searchText) {
        this.fetchBrands();
      } else {
        this.brands = this.filteredBrands;
      }
    },

    openDeleteModal(brandId) {
      this.isDeleteModalOpen = true;
      this.brandToDeleteId = brandId;
    },

    closeDeleteModal() {
      this.isDeleteModalOpen = false;
      this.brandToDeleteId = null;
    },

    async deleteBrandConfirmed() {
      if (this.brandToDeleteId) {
        try {
          const apiUrl = `http://127.0.0.1:8000/api/brands/${this.brandToDeleteId}`;
          const response = await fetch(apiUrl, { method: "DELETE" });

          if (response.ok) {
            // Remove the deleted brand from the brands array
            this.brands = this.brands.filter(
              (brand) => brand.id !== this.brandToDeleteId
            );
            this.closeDeleteModal();
          } else {
            console.error("Error deleting brand:", response.statusText);
          }
        } catch (error) {
          console.error("Error deleting brand:", error);
        }
      }
    },
  },
};
</script>

<style scoped>
.table-container {
  max-height: 520px; /* Atur ketinggian maksimum yang sesuai */
  overflow-y: auto;
}
.tabel {
  position: sticky;
  top: 0;
  background-color: #f9f9f9;
}
td button {
  background: none;
  border: none;
  cursor: pointer;
}
.header-table {
  text-align: center;
  font-weight: bold;
  color: white;
  background-color: #ff9c04;
}
.filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.button {
  background-color: #ff9c04;
  font-weight: bold;
  width: 150px;
  border-color: transparent;
  border-radius: 25px;
  height: 35px;
  color: white;
  margin-right: 15px;
}
.form-control {
  width: 300px;
  right: 0;
  border-width: medium;
}
.decscription {
  max-width: 500px; /* Adjust the width as needed */
}
</style>
