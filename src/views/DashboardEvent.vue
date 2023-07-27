<template>
  <div class="w-9/12 pt-10 mx-10">
    <div class="flex justify-between">
      <div class="flex h-fit gap-2">
        <button
          class="px-3 bg-[#FF9900] rounded-full text-white font-medium"
          @click="openModal"
        >
          INPUT DATA
        </button>

        <!-- Filter -->
        <select
          name=""
          id="event"
          class="w-20 bg-[#5C8271] text-white py-1 px-2 font-medium h-fit"
        >
          <option hidden>Event</option>
          <option value="">1</option>
          <option value="">2</option>
          <option value="">3</option>
        </select>

        <select
          name=""
          id="year"
          class="w-20 bg-[#5C8271] text-white py-1 px-2 font-medium h-fit"
        >
          <option hidden>Year</option>
          <option value="">2021</option>
          <option value="">2022</option>
          <option value="">2023</option>
        </select>

        <select
          name=""
          id="city"
          class="w-20 bg-[#5C8271] text-white py-1 px-2 font-medium h-fit"
        >
          <option hidden>City</option>
          <option value="">Jakarta</option>
          <option value="">Bandung</option>
          <option value="">Surabaya</option>
        </select>
      </div>
      <div class="">
        <div class="flex">
          <input
            class="bg-[#DFD9D9] px-2 py-1 font-medium"
            placeholder="Search here"
          />
          <button class="bg-[#2E3192]">
            <img class="w-7" src="search.png" />
          </button>
        </div>
      </div>
    </div>

    <div class="w-full bg-[#FF9900] text-white text-center font-bold mt-2">
      <p>DATA EVENT</p>
    </div>

    <!-- Table -->
    <div class="mt-1">
      <TableEvent />
    </div>

  </div>

  <!-- Modal -->
  <div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center" v-if="showModal">
    <div class=" bg-white p-[20px] rounded-[8px] w-1/2 shadow">
      <p class="text-lg font-bold">Input Data ADEX</p>
      <div class="bg-[#FF9900] h-[0.2rem] w-40"/>
      <form class="mt-3">
        <label for="">
          Brand
        </label>
        <input type="text" class="w-full border border-[#DFD9D9] rounded-[8px] px-[10px] py-[5px] mt-[5px]" placeholder="Nama Brand"/>
  
        <label for=""  class="mt-3">type</label>
        <select name="" id="" class="w-full border border-[#DFD9D9] rounded-[8px] px-[10px] py-[5px] mt-[5px]">
          <option hidden>Pilih Type</option>
          <option value="">1</option>
          <option value="">2</option>
          <option value="">3</option>
        </select>
  
        <label for=""  class="mt-3">Metode Pembayaran</label>
        <select name="" id="" class="w-full border border-[#DFD9D9] rounded-[8px] px-[10px] py-[5px] mt-[5px]">
          <option hidden>Pilih Metode Pembayaran</option>
          <option value="">1</option>
          <option value="">2</option>
          <option value="">3</option>
        </select>
  
        <button class="bg-[#FF9900] rounded px-3 py-1 text-lg font-medium text-white mt-10">INPUT DATA</button>
        <button class="bg-gray-100 rounded px-5 py-1 text-lg font-medium mt-10 float-right border hover:bg-gray-200" @click="closeModal">Close</button>
      </form>

    </div>
  </div>
</template>

<script>
import TableEvent from "../components/TableEvent.vue";

export default {
  name: "DashboardEvent",
  components: {
    TableEvent,
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
  },
};
</script>