<template>
  <div>
    <div class="page-container">
      <div class="chart-container">
        <div class="myChart">
          <canvas id="myChart1" class="chart-canvas"></canvas>
          <b
            ><p>{{ apiData.topBrandData[0]?.brand }}</p></b
          >
        </div>
        <div class="myChart">
          <canvas id="myChart2" class="chart-canvas"></canvas>
          <b
            ><p>{{ apiData.topBrandData[1]?.brand }}</p></b
          >
        </div>
        <div class="myChart">
          <canvas id="myChart3" class="chart-canvas"></canvas>
          <b
            ><p>{{ apiData.topBrandData[2]?.brand }}</p></b
          >
        </div>
      </div>
    </div>
    <div class="mt-4"><AdexList></AdexList></div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import AdexList from "./AdexList.vue";

export default {
  data() {
    return {
      apiData: {
        topBrandData: [],
      },
    };
  },
  components: {
    AdexList,
  },
  async mounted() {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/top-events-same-city"
      );
      this.apiData = await response.json();

      this.apiData.topBrandData.forEach((data, index) => {
        const ctx = document.getElementById("myChart" + (index + 1));
        if (ctx) {
          const cityNames = Object.keys(data.topCityEventCounts);
          const cityValues = Object.values(data.topCityEventCounts);

          const chartData = {
            labels: cityNames,
            datasets: [
              {
                label: "Total Event",
                data: cityValues,
                backgroundColor: [
                  "rgb(80,55,149,255)",
                  "rgb(176,133,255,255)",
                  "rgb(133,92,248,255)",
                  "rgb(226,137,242,255)",
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
          console.error("Canvas context not found for index:", index);
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
  height: 260px; /* Tambahkan tinggi lebih besar untuk mengakomodasi teks */
  margin: 10px;
  text-align: center;
  margin-right: 50px;
}

.chart-canvas {
  width: 100%; /* Mengisi lebar kontainer */
  height: 100%; /* Mengisi tinggi kontainer */
}
</style>
