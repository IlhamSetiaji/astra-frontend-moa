<template>
  <div>
    <h1>Events List</h1>

    <div class="filters">
      <button class="button" @click="openModal(true)">Input Data Baru</button>

      <select
        id="eventFilter"
        class="eventFilter form-select text-white"
        v-model="selectedEventType"
      >
        <option value="" class="bg-light text-dark">Type</option>
        <option value="Webinar" class="bg-light text-dark">Webinar</option>
        <option value="Workshop" class="bg-light text-dark">Workshop</option>
        <option value="Investor Gathering" class="bg-light text-dark">
          Investor Gathering
        </option>
      </select>

      <select
        id="yearFilter"
        v-model="selectedYear"
        class="yearFilter form-select text-white"
      >
        <option value="" class="bg-light text-dark">Year</option>
        <option
          v-for="year in availableYears"
          :key="year"
          :value="year"
          class="bg-light text-dark"
        >
          {{ year }}
        </option>
      </select>

      <select
        id="monthFilter"
        v-model="selectedMonth"
        class="monthFilter form-select text-white"
      >
        <option value="" class="bg-light text-dark">Month</option>
        <option
          v-for="month in availableMonths"
          :key="month"
          :value="monthValueMap[month]"
          class="bg-light text-dark"
        >
          {{ month }}
        </option>
      </select>

      <input
        id="eventSearch"
        v-model="searchText"
        @input="searchEvents"
        placeholder="Search events..."
        type="search"
        class="form-control position-fixed right-0 me-4"
      />
    </div>

    <div class="header-table">DATA EVENT</div>
    <div class="table-container">
      <table class="table">
        <thead class="tabel">
          <tr>
            <th scope="col">NO</th>
            <th scope="col">EVENT/City</th>
            <th scope="col">VENUE</th>
            <th scope="col">GAMES</th>
            <th scope="col">NV</th>
            <th scope="col">VISITORS</th>
            <th scope="col">SPK</th>
            <th scope="col">LIVE DATA</th>
            <th scope="col">TOOLS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(event, index) in filteredEvents" :key="event.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ event.event_type.name }} / {{ event.city }}</td>
            <td>{{ event.venue }}</td>
            <td>{{ event.games }}</td>
            <td>{{ event.nv === 0 ? "No" : "Yes" }}</td>
            <td>{{ event.visitors }}</td>
            <td>{{ event.spk }}</td>
            <td>
              <a
                v-if="event.live_data"
                class="live-data-button"
                :href="event.live_data"
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Data
              </a>
              <span v-else>-</span>
            </td>
            <td>
              <button @click="openPartnerModal(event)">
                <i class="fas fa-external-link-alt"></i>
              </button>
              <button @click="editEvent(event)">
                <i class="fas fa-pencil-alt"></i>
              </button>
              <button @click="openDeleteModal(event.id)">
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
      @delete="deleteEventConfirmed"
    />
    <EventInputModal
      v-if="isModalOpen"
      @closeModal="closeModal"
      :eventToEdit="eventToEdit"
      ref="modalComponent"
    />
    <EventPartnerModal
      :show="isPartnerModalOpen"
      :event="selectedEventForPartner"
      :brands="brands"
      @close="closePartnerModal"
    />
  </div>
</template>

<script>
import EventInputModal from "./EventInputModal.vue";
import DeleteConfirmationModal from "./DeleteConfirmationModal.vue";
import EventPartnerModal from "./EventPartnerModal.vue";

export default {
  components: {
    EventInputModal,
    DeleteConfirmationModal,
    EventPartnerModal,
  },
  data() {
    return {
      isModalOpen: false,
      events: [],
      selectedEventType: "",
      selectedYear: "",
      selectedMonth: "",
      searchText: "",
      availableYears: [],
      availableMonths: [],
      monthValueMap: {
        January: 1,
        February: 2,
        March: 3,
        April: 4,
        May: 5,
        June: 6,
        July: 7,
        August: 8,
        September: 9,
        October: 10,
        November: 11,
        December: 12,
      },
      isDeleteModalOpen: false, // Tambahkan ini
      eventToDeleteId: null,
      eventToEdit: null,
      isPartnerModalOpen: false, // Tambahkan ini
      selectedEventForPartner: null,
    };
  },
  mounted() {
    this.fetchEvents();
    this.fetchAvailableYears();
    this.fetchAvailableMonths();
    this.$watch(
      () => this.$route.path,
      (to, from) => {
        console.log("route path has changed from " + from + " to " + to);
        this.fetchEvents();
      }
    );
  },
  computed: {
    filteredEvents() {
      const lowercaseSearchText = this.searchText.toLowerCase();

      if (lowercaseSearchText === "") {
        return this.events;
      }

      return this.events.filter((event) => {
        const eventName = event.event_type.name.toLowerCase();
        const eventCity = event.city.toLowerCase();
        return (
          eventName.includes(lowercaseSearchText) ||
          eventCity.includes(lowercaseSearchText)
        );
      });
    },
  },
  methods: {
    openPartnerModal(event) {
      this.selectedEventForPartner = event; // Simpan data acara yang akan dikirim ke modal
      this.isPartnerModalOpen = true; // Buka modal
    },

    closePartnerModal() {
      this.isPartnerModalOpen = false; // Tutup modal
    },
    openModal(isNewData) {
      this.isModalOpen = true;
      if (isNewData) {
        this.eventToEdit = null;
        this.$nextTick(() => {
          this.$refs.modalComponent.resetFields();
        });
      }
    },

    closeModal() {
      this.isModalOpen = false;
    },
    editEvent(event) {
      this.eventToEdit = event; // Set data acara yang ingin diubah
      this.isModalOpen = true; // Buka modal
    },
    async fetchEvents() {
      try {
        let apiUrl = "http://127.0.0.1:8000/api/events/filter?";
        if (this.$route.path === "/events-digital") {
          apiUrl = "http://127.0.0.1:8000/api/events-digital?";
        }
        if (this.selectedEventType) {
          apiUrl += `name=${this.selectedEventType}&`;
        }
        if (this.selectedYear) {
          apiUrl += `year=${this.selectedYear}&`;
        }
        if (this.selectedMonth) {
          apiUrl += `month=${this.selectedMonth}&`;
        }

        const response = await fetch(apiUrl);
        const data = await response.json();
        this.events = data.events;
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    },

    async fetchAvailableYears() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/event");
        const data = await response.json();

        // Ambil tahun unik dari data dan simpan dalam availableYears
        const uniqueYears = [
          ...new Set(
            data.map((event) => new Date(event.start_date).getFullYear())
          ),
        ];
        this.availableYears = uniqueYears;
      } catch (error) {
        console.error("Error fetching available years:", error);
      }
    },

    // Modifikasi method fetchAvailableMonths untuk mengatur array availableMonths dalam urutan yang benar
    async fetchAvailableMonths() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/event");
        const data = await response.json();

        // Ambil bulan unik dari data dan simpan dalam availableMonths
        const uniqueMonths = [
          ...new Set(
            data.map((event) =>
              new Date(event.start_date).toLocaleString("default", {
                month: "long",
              })
            )
          ),
        ];

        // Urutkan bulan dalam urutan yang benar (Januari - Desember)
        const orderedMonths = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ].filter((month) => uniqueMonths.includes(month));

        this.availableMonths = orderedMonths;
      } catch (error) {
        console.error("Error fetching available months:", error);
      }
    },

    searchEvents() {
      // Only update the events shown when search text changes
      if (!this.searchText) {
        this.fetchEvents();
      } else {
        this.events = this.filteredEvents;
      }
    },

    openDeleteModal(eventId) {
      this.isDeleteModalOpen = true;
      this.eventToDeleteId = eventId;
    },

    closeDeleteModal() {
      this.isDeleteModalOpen = false;
      this.eventToDeleteId = null;
    },

    async deleteEventConfirmed() {
      if (this.eventToDeleteId) {
        try {
          const apiUrl = `http://127.0.0.1:8000/api/event/${this.eventToDeleteId}`;
          const response = await fetch(apiUrl, { method: "DELETE" });

          if (response.ok) {
            // Remove the deleted event from the events array
            this.events = this.events.filter(
              (event) => event.id !== this.eventToDeleteId
            );
            this.closeDeleteModal();
          } else {
            console.error("Error deleting event:", response.statusText);
          }
        } catch (error) {
          console.error("Error deleting event:", error);
        }
      }
    },
  },
  watch: {
    selectedEventType: {
      handler: "fetchEvents",
      immediate: true,
    },
    selectedYear: {
      handler: "fetchEvents", // Panggil metode fetchEvents saat selectedYear berubah
      immediate: false, // Jangan panggil fetchEvents saat komponen dimount
    },
    selectedMonth: {
      handler: "fetchEvents", // Panggil metode fetchEvents saat selectedMonth berubah
      immediate: false,
    },

    searchText(newSearchText) {
      // Ubah searchText menjadi lowercase
      const lowercaseSearchText = newSearchText.toLowerCase();

      // Lakukan pencarian berdasarkan searchText yang sedang diketikkan
      this.filteredEvents = this.events.filter((event) => {
        const eventName = event.event_type.name.toLowerCase();
        const eventCity = event.city.toLowerCase();
        return (
          eventName.includes(lowercaseSearchText) ||
          eventCity.includes(lowercaseSearchText)
        );
      });
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
  align-items: center;
  margin-bottom: 20px;
}

.live-data-button {
  display: inline-block;
  padding: 8px 12px;
  background-color: #ff9c04;
  color: white;
  border: none;
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;
}

.eventFilter,
.monthFilter,
.yearFilter {
  background-color: #608474;
  font-weight: bold;
  width: 160px;
  margin-right: 15px;
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
</style>
