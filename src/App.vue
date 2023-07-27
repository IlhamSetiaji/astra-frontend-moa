<template>
  <div class="w-screen h-screen flex">
    <Sidebar/>
    <router-view/>
  </div>
</template>

<script>

  import Sidebar from '@/components/Sidebar.vue'

  export default {
    name: 'Cust-sidebar',
    components: {
      Sidebar
    }
  }
</script>