<template>
  <div>
    <div class="header-table">REKAP DATA</div>
    <div class="table-container">
      <table class="table">
        <thead class="tabel">
          <tr>
            <th scope="col">NO</th>
            <th scope="col">PLATFORM</th>
            <th scope="col">TOTAL TRAFFIC</th>
            <th scope="col">INTERACTION</th>
            <th scope="col">TIME ON SITE</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(event, index) in events" :key="event.event_id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ event.event_info }}</td>
            <td>{{ event.total_traffic }}</td>
            <td>{{ event.total_interaction }}</td>
            <td>{{ event.time_on_site_days }} Days</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      events: [],
    };
  },
  async mounted() {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/event-details");
      this.events = await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
.header-table {
  text-align: center;
  font-weight: bold;
  color: white;
  background-color: #ff9c04;
}
</style>
