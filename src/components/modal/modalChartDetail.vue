<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Grafik Laporan</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="cancel()" slot="icon-only"
          ><ion-icon :icon="close"></ion-icon
        ></ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <div>
      <Bar :chartData="chartData" :chartOptions="options" />
    </div>
  </ion-content>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { Bar } from "vue-chartjs";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  modalController,
  IonIcon,
} from "@ionic/vue";
import { close, open } from "ionicons/icons";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { useStore } from "vuex";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);
export default defineComponent({
  name: "modalChartDetail",
  components: {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    Bar,
  },
  data() {
    return {
      loaded: true,
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  computed: {},
  setup() {
    const store = useStore();
    const getOrdersData = computed(() => store.getters["order/getOrdersData"]);
    // const date = new Date();
    // const thisMonth = date.getMonth() + 1;
    const toDate = (dateStr: any) => {
      const date = new Date(dateStr);
      return date.getMonth() + 1;
    };
    const dataFilteredThisMonth = getOrdersData.value.filter(
      (e: { created_at: any }) => toDate(e.created_at) === 10
    ).map((e: any) => e.amount);
    const dataFiltered2Month = getOrdersData.value.filter(
      (e: { created_at: any }) => toDate(e.created_at) === 10 + 1
    ).map((e: any) => e.amount);
    // const dataChart = getOrdersData.value.map((order: { amount: any }) => order.amount);
    const labelChart = getOrdersData.value.map(
      (order: { created_at: any }) => order.created_at
    );
    const chartData = {
      labels: labelChart,
      datasets: [
        {
          label: "bulan ini",
          backgroundColor: "#ffff",
          data: dataFilteredThisMonth,
        },
        {
          label: "Bulan Lalu",
          backgroundColor: "#2d60af",
          data: dataFiltered2Month,
        },
      ],
    };
    console.log(chartData);

    return {
      close,
      open,
      chartData,
    };
  },
  methods: {
    cancel() {
      return modalController.dismiss(null, "cancel");
    },
  },
  // async mounted() {
  //   this.loaded = false

  // try {
  //   const  userlist = {

  //   }
  //   console.log(userlist);

  //   // this.chartData = userlist

  //   this.loaded = true
  // } catch (e) {
  //   console.error(e)
  // }
  // },
});
</script>
