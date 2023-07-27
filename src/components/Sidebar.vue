<template>
    <div class="h-full w-3/12 bg-[#D9D9D9] text-white grid sm:w-3/5 md:w-2/5">
        <div>
            <div class=" pl-7 pt-7">
                <p class="text-5xl font-bold pb-2">PROM</p>
                <p class="text-5xl font-bold pb-2">DEPT</p>
                <div class="rounded-full px-4 bg-[#FF9900] w-fit h-fit">
                    <p class="font-medium ">event</p>
                </div>
            </div>
            <div class="w-4/5 pt-5 mx-auto">
                <p class="text-center py-2 bg-[#5C8271]">PILIH SECTION</p>
                <div class="grid">
                    <router-link to="/event" class=" py-2 bg-white text-black font-medium pl-2">Event</router-link>
                    <router-link to='/eventDigital' class=" py-2 bg-white text-black font-medium pl-2">Event Digital</router-link>
                    <router-link to='/Adex' class=" py-2 bg-white text-black font-medium pl-2">Adex/Brand</router-link>
                    <router-link to='/Rekap' class=" py-2 bg-white text-black font-medium pl-2">Rekap Data</router-link>
                </div>
            </div>
        </div>
        <button class="py-1 w-4/5 bg-[#FF9900] rounded-full h-fit mx-auto mt-auto mb-4">LOGOUT</button>
    </div>
</template>

<script>
    export default {
        name: 'Cust-sidebar',
        components: {

        }
    }
</script>