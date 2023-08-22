<template>
  <div>
    <div class="modal" v-if="currentStep > 0">
      <div class="modal-dialog">
        <div class="modal-content px-4">
          <div class="modal-header">
            <div class="underline">
              <h4 class="modal-title">
                {{
                  currentStep === 1
                    ? "Pilih Event Type"
                    : currentStep === 2
                    ? "Input Detail Event"
                    : ""
                }}
              </h4>
            </div>
          </div>
          <div class="modal-body">
            <div v-if="currentStep === 1">
              <h6>Event Type</h6>
              <select
                v-model="selectedEventType"
                class="form-select event-type"
              >
                <option value="1" class="bg-light">Webinar</option>
                <option value="2" class="bg-light">Workshop</option>
                <option value="3" class="bg-light">Investor Gathering</option>
              </select>
            </div>
            <div v-else-if="currentStep === 2">
              <label>Venue</label>

              <select id="venue" v-model="venue" class="form-select">
                <option value="online" class="bg-light">Online</option>
                <option value="offline" class="bg-light">Offline</option>
              </select>

              <label for="city">City:</label>
              <input
                id="city"
                class="form-control"
                v-model="city"
                type="text"
              />

              <label for="games">Games:</label>
              <input
                id="games"
                class="form-control"
                v-model="games"
                type="text"
              />

              <label class="mt-2">NV: </label>
              <div class="form-check form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  v-model="nv"
                  value="1"
                /><label> Yes</label>
              </div>
              <div class="form-check form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  v-model="nv"
                  value="0"
                />
                <label> No</label>
              </div>
              <br />
              <label for="visitors" class="mt-2">Visitors:</label>
              <input
                class="form-control"
                id="visitors"
                v-model="visitors"
                type="number"
              />

              <label for="spk">SPK:</label>
              <input id="spk" class="form-control" v-model="spk" type="text" />

              <label for="live_data">Live Data:</label>
              <input
                id="live_data"
                class="form-control"
                v-model="live_data"
                type="text"
              />

              <label for="start_date">Start Date:</label>
              <input
                id="start_date"
                class="form-control"
                v-model="start_date"
                type="date"
              />

              <label for="end_date">End Date:</label>
              <input
                id="end_date"
                class="form-control"
                v-model="end_date"
                type="date"
              />
            </div>

            <div v-if="currentStep === 3">
              <p v-if="saveSuccess" class="success-message">
                Event data
                {{ isEventUpdated ? "updated" : "saved" }} successfully!
              </p>
              <p v-else class="error-message">
                An error occurred while saving the event data.
              </p>
            </div>
          </div>
          <div class="modal-footer">
            <button
              v-if="currentStep !== 3"
              class="btn btn-primary"
              @click="closeModal"
            >
              {{ currentStep === 1 ? "Cancel" : "Back" }}
            </button>
            <button
              v-if="currentStep !== 3"
              class="btn btn-primary"
              @click="handleStepAction"
            >
              {{
                currentStep === 1 ? "Next" : eventToEdit ? "Perbarui" : "Simpan"
              }}
            </button>
            <button
              v-if="currentStep === 3"
              class="btn btn-primary"
              @click="closeModal"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
    eventToEdit: Object,
  },
  data() {
    return {
      currentStep: 1,
      selectedEventType: "",
      venue: "online",
      city: "",
      games: "",
      nv: 0,
      visitors: "",
      spk: "",
      live_data: "",
      start_date: "",
      end_date: "",
      saveSuccess: false,
      saveError: false,
      showNotificationModal: false,
    };
  },
  mounted() {
    if (this.eventToEdit) {
      this.populateFieldsFromEvent();
    }
  },
  methods: {
    nextStep() {
      if (this.currentStep === 1) {
        if (this.selectedEventType) {
          this.currentStep = 2;
        } else {
          // Jika jenis acara belum dipilih, tampilkan pesan kesalahan atau tindakan lain
          // Contoh: this.showEventTypeError = true;
        }
      } else if (this.currentStep === 2) {
        this.currentStep = 1; // Kembali ke langkah pertama saat tombol "Back" ditekan
      }
    },
    resetFields() {
      this.currentStep = 1;
      this.selectedEventType = "";
      this.venue = "online";
      this.city = "";
      this.games = "";
      this.nv = 0;
      this.visitors = "";
      this.spk = "";
      this.live_data = "";
      this.start_date = "";
      this.end_date = "";
      this.saveSuccess = false;
      this.saveError = false;
    },
    populateFieldsFromEvent() {
      // Isi nilai-nilai bidang dengan data acara saat mengedit
      this.selectedEventType = this.eventToEdit.event_type_id;
      this.venue = this.eventToEdit.venue;
      this.city = this.eventToEdit.city;
      this.games = this.eventToEdit.games;
      this.nv = this.eventToEdit.nv;
      this.visitors = this.eventToEdit.visitors;
      this.spk = this.eventToEdit.spk;
      this.live_data = this.eventToEdit.live_data;
      this.start_date = this.eventToEdit.start_date.split(" ")[0];
      this.end_date = this.eventToEdit.end_date.split(" ")[0];
    },
    async saveEvent() {
      try {
        const eventData = {
          event_type_id: this.selectedEventType,
          venue: this.venue,
          city: this.city,
          games: this.games,
          nv: this.nv,
          visitors: this.visitors, // You can set a default value or leave this out depending on your requirements
          spk: this.spk, // You can set a default value or leave this out depending on your requirements
          live_data: this.live_data,
          start_date: this.start_date,
          end_date: this.end_date,
        };

        let apiUrl = "http://127.0.0.1:8000/api/event";
        let httpMethod = "POST";

        if (this.eventToEdit) {
          // Jika sedang mengedit, ubah URL API dan metode HTTP
          apiUrl += `/${this.eventToEdit.id}`;
          httpMethod = "PUT";
        }

        const response = await fetch(apiUrl, {
          method: httpMethod,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventData),
        });

        if (response.ok) {
          this.saveSuccess = true;
          this.currentStep = 3;
          this.$parent.fetchEvents();
          if (this.eventToEdit) {
            this.isEventUpdated = true; // Emit event to parent component
          }
        } else {
          this.showNotificationModal = true;
          this.saveError = true;
        }
      } catch (error) {
        console.error("Terjadi kesalahan saat menyimpan acara:", error);
        this.saveError = true;
      }
    },

    closeModal() {
      if (this.currentStep === 2) {
        this.currentStep = 1; // Kembali ke langkah pertama jika saat ini berada di langkah kedua
      } else {
        this.$emit("closeModal");
        //
      }
      this.saveSuccess = false;
      this.saveError = false;
    },

    handleStepAction() {
      if (this.currentStep === 1) {
        this.nextStep();
      } else if (this.currentStep === 2) {
        this.saveEvent();
      }
    },
  },
  computed: {
    formattedStartDate() {
      // Ubah format tanggal dan waktu sebelum disimpan
      return this.start_date ? new Date(this.start_date).toISOString() : "";
    },
    formattedEndDate() {
      // Ubah format tanggal dan waktu sebelum disimpan
      return this.end_date ? new Date(this.end_date).toISOString() : "";
    },
  },
};
</script>

<style scoped>
/* EventInputModal.vue */

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
  max-width: 600px;
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
  display: flex;
  justify-content: space-between;
}

.btn {
  background-color: #ff9c04;
  border-color: #ff9c04;
  color: white;
  cursor: pointer;
}

/* Additional styling for buttons in footer */
.modal .btn-primary {
  background-color: #ff9c04;
  border-color: #ff9c04;
  color: white;
  cursor: pointer;
  margin-right: 10px;
}

.notification-modal {
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

.notification-modal .modal-dialog {
  background-color: #fff;
  border-radius: 5px;
  max-width: 300px;
  width: 100%;
  border: none;
}
.notification-modal .modal-body {
  text-align: center;
  padding: 20px;
  border: none;
}

.success-message {
  color: #34a853;
  font-weight: bold;
}

.error-message {
  color: #ea4335;
  font-weight: bold;
}

.notification-modal .btn-primary {
  background-color: #ff9c04;
  border-color: #ff9c04;
  color: white;
  cursor: pointer;
  margin-top: 10px;
}
.underline {
  border-bottom: 3px solid #ff9c04; /* Ganti warna sesuai kebutuhan */
  width: 150px; /* Sesuaikan lebar garis bawah */
}
.event-type {
  background-color: #e2e2e2;
}
.form-control,
.form-select {
  background-color: #e2e2e2;
}
</style>
