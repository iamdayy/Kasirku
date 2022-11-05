<template>
    <div
      class="p-2 rounded-lg md:p-1"
      id="stats"
      role="tabpanel"
      aria-labelledby="stats-tab"
    >
      <dl
        class="grid grid-cols-3 gap-3 p-2 mx-auto max-w-screen-xl text-gray-900 dark:text-white md:p-5"
      >
        <div class="flex flex-col justify-center items-center">
          <dt class="mb-2 text-xl xl:text-3xl font-extrabold">{{TotalOrders?.length}}</dt>
          <dd class="font-light text-gray-500 dark:text-gray-400 text-sm xl:text-lg">
            Total Pesanan
          </dd>
        </div>
        <div class="flex flex-col justify-center items-center">
          <dt class="mb-2 text-xl xl:text-3xl font-extrabold relative">{{OrdersNotCompleted?.length}}</dt>
          <dd class="font-light text-gray-500 dark:text-gray-400 text-sm xl:text-lg">
            Belum Selesai
          </dd>
        </div>
        <div class="flex flex-col justify-center items-center">
          <dt class="mb-2 text-xl xl:text-3xl font-extrabold">{{OrdersCompleted?.length}}</dt>
          <dd class="font-light text-gray-500 dark:text-gray-400 text-sm xl:text-lg">
            Selesai
          </dd>
        </div>
      </dl>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "StatsCardPart",
  props: {
    TotalOrders: {
      type: Array
    },
    
  },
  computed: {
    OrdersNotCompleted () {
        return this.TotalOrders?.filter((order: any) => order.success === false)
    },
    OrdersCompleted () {
        return this.TotalOrders?.filter((order: any) => order.success === true)
    }
  }
});
</script>
