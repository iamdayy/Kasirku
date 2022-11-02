<template>
  <div
    class="w-full bg-white rounded-lg border shadow-md dark:bg-gray-800 dark:border-gray-700"
  >
    <div
      class="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800"
      id="stats"
      role="tabpanel"
      aria-labelledby="stats-tab"
    >
      <dl
        class="grid grid-cols-3 gap-8 p-4 mx-auto max-w-screen-xl text-gray-900 dark:text-white sm:p-8"
      >
        <div class="flex flex-col justify-center items-center">
          <dt class="mb-2 text-3xl font-extrabold">{{TotalOrders}}</dt>
          <dd class="font-light text-gray-500 dark:text-gray-400">
            total Pesanan
          </dd>
        </div>
        <div class="flex flex-col justify-center items-center">
          <dt class="mb-2 text-3xl font-extrabold">{{OrdersNotCompleted}}</dt>
          <dd class="font-light text-gray-500 dark:text-gray-400">
            Belum Selesai
          </dd>
        </div>
        <div class="flex flex-col justify-center items-center">
          <dt class="mb-2 text-3xl font-extrabold">{{OrdersCompleted}}</dt>
          <dd class="font-light text-gray-500 dark:text-gray-400">
            Selesai
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "StatsCardPart",
  props: {
    TotalOrders: {
      type: Number,
      default: 20,
    },
    OrdersNotCompleted: {
        type: Number,
        default: 10
    },
    OrdersCompleted: {
        type: Number,
        default: 20
    }
  },
});
</script>
