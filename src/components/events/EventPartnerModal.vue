<template>
  <div class="modal" v-if="show">
    <div class="modal-dialog">
      <div class="modal-content px-3">
        <div class="modal-header">
          <div class="underline">
            <h4 class="modal-title">Event Partner dan Event Participant</h4>
          </div>
        </div>
        <div class="modal-body">
          <div class="mb-4">
            <h6>Pilih Event Partner</h6>
            <select v-model="selectedBrandId" class="form-select">
              <option
                v-for="brand in brands"
                :key="brand.id"
                :value="brand.id"
                class="bg-light"
              >
                {{ brand.name }}
              </option>
            </select>
          </div>

          <div class="mb-4">
            <h6>Partisipasi dalam Event</h6>
            <label class="me-2">
              <input
                type="radio"
                v-model="joinEvent"
                value="1"
                class="form-check-input"
              />
              Ya
            </label>
            <label>
              <input
                type="radio"
                v-model="joinEvent"
                value="0"
                class="form-check-input"
              />
              Tidak
            </label>
          </div>
          <h6>Kehadiran dalam Event</h6>
          <label class="me-2">
            <input
              type="radio"
              v-model="isAttend"
              value="yes"
              class="form-check-input"
              :disabled="joinEvent === '0'"
            />
            Hadir
          </label>
          <label>
            <input
              type="radio"
              v-model="isAttend"
              value="no"
              class="form-check-input"
              :disabled="joinEvent === '0'"
            />
            Tidak hadir
          </label>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" @click="submitAndCloseModal">
            Kirim
          </button>
          <button class="btn btn-secondary" @click="closeModal">Batal</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
    event: Object,
  },
  data() {
    return {
      selectedBrandId: "",
      joinEvent: "0",
      isAttend: "no",
      brands: [],
    };
  },
  mounted() {
    this.fetchBrands();
  },
  methods: {
    async fetchBrands() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/brands");
        const data = await response.json();
        this.brands = data; // Simpan daftar brand dalam properti brands
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    },
    closeModal() {
      this.$emit("close");
    },
    async submitAndCloseModal() {
      const dataToSend = {
        event_id: this.event.id,
        brand_id: this.selectedBrandId,
      };

      if (this.selectedBrandId) {
        try {
          const response = await fetch(
            "http://127.0.0.1:8000/api/event-partners",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(dataToSend),
            }
          );

          const result = await response.json();
          console.log("Data sent successfully:", result);

          // Check if the response status is 201 (Created)
          if (response.status === 201 && this.selectedBrandId) {
            try {
              const incrementResponse = await fetch(
                `http://127.0.0.1:8000/api/brands/${this.selectedBrandId}/increment-result`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

              const incrementResult = await incrementResponse.json();
              console.log("Increment result successful:", incrementResult);
            } catch (error) {
              console.error(
                "An error occurred while incrementing result:",
                error
              );
            }
          }
          this.closeModal();
        } catch (error) {
          console.error("An error occurred:", error);
        }
      }
      if (this.joinEvent) {
        try {
          const participantData = {
            user_id: localStorage.getItem("userId"),
            event_id: this.event.id,
            is_attend: this.isAttend,
          };

          const participantResponse = await fetch(
            "http://127.0.0.1:8000/api/event-participants",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(participantData),
            }
          );

          const participantResult = await participantResponse.json();
          console.log("Participant data sent successfully:", participantResult);
          this.closeModal();
        } catch (error) {
          console.error(
            "An error occurred while sending participant data:",
            error
          );
        }
      }
    },
  },
};
</script>

<style scoped>
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
  border-bottom: 3px solid #ff9c04; /* Ganti warna sesuai kebutuhan */
  width: 290px; /* Sesuaikan lebar garis bawah */
}

.modal-title {
  margin: 0;
  font-size: 18px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  color: white;
  cursor: pointer;
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
.form-select {
  background-color: #e2e2e2;
}
</style>
