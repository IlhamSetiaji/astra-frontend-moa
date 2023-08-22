<template>
  <div>
    <div class="page-container">
      <div class="chart-container">
        <div class="myChart">
          <canvas id="myChart1" class="chart-canvas"></canvas>
          <b><p>Total Traffic</p></b>
        </div>
        <div class="myChart">
          <canvas id="myChart2" class="chart-canvas"></canvas>
          <b><p>Interaction</p></b>
        </div>
        <div class="myChart">
          <canvas id="myChart3" class="chart-canvas"></canvas>
          <b><p>Time on Site</p></b>
        </div>
      </div>
    </div>
    <div class="mt-5"><DigitalList></DigitalList></div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import DigitalList from "./DigitalList.vue";

export default {
  data() {
    return {
      apiData: [],
    };
  },
  components: {
    DigitalList,
  },
  async mounted() {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/event-details");
      this.apiData = await response.json();
      this.createCharts();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  methods: {
    sortByDescending(property) {
      return (a, b) => b[property] - a[property];
    },
    createCharts() {
      const topTrafficData = this.apiData
        .slice()
        .sort(this.sortByDescending("total_traffic"))
        .slice(0, 4);
      const topInteractionData = this.apiData
        .slice()
        .sort(this.sortByDescending("total_interaction"))
        .slice(0, 4);
      const topTimeOnSiteData = this.apiData
        .slice()
        .sort(this.sortByDescending("time_on_site_days"))
        .slice(0, 4);

      this.createChart("myChart1", topTrafficData, "Total Traffic");
      this.createChart("myChart2", topInteractionData, "Interaction");
      this.createChart("myChart3", topTimeOnSiteData, "Time on Site");
    },
    createChart(canvasId, data, label) {
      const ctx = document.getElementById(canvasId);
      if (ctx) {
        const labels = data.map((item) => item.event_info);
        const values = data.map((item) => {
          if (label === "Time on Site") {
            return parseInt(item.time_on_site_days);
          } else if (label === "Interaction") {
            return parseInt(item.total_interaction);
          } else {
            return item.total_traffic;
          }
        });

        const chartData = {
          labels: labels,
          datasets: [
            {
              label: label,
              data: values,
              backgroundColor: [
                "rgb(80,55,149,255)",
                "rgb(176,133,255,255)",
                "rgb(133,92,248,255)",
              ],
              hoverOffset: 4,
            },
          ],
        };

        new Chart(ctx, {
          type: "pie",
          data: chartData,
        });
      } else {
        console.error("Canvas context not found for:", canvasId);
      }
    },
  },
};
</script>

<style scoped>
.page-container {
  display: flex;
  justify-content: center;
}

.chart-container {
  display: flex;
  flex-direction: row;
}

.myChart {
  width: 260px;
  height: 260px; /* Adjust height as needed */
  margin: 10px;
  text-align: center;
  margin-right: 50px;
}

.chart-canvas {
  width: 100%;
  height: 100%;
}
</style>
