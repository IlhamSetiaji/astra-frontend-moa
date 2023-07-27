<template>
  <div class="w-9/12 pt-10 mx-10">
    <div class="flex justify-between">
      <div class="flex h-fit gap-2">
        <button
          class="px-3 bg-[#FF9900] rounded-full text-white font-medium"
        >
          INPUT DATA
        </button>
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
    <div class="mt-1">
      <TableEvent />
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
};
</script>
