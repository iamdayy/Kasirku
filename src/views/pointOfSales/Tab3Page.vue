<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Kasir</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Kasir</ion-title>
        </ion-toolbar>
      </ion-header>
      <div class="h-full w-full" :style="`background-image: url('${registerBg2}'); background-repeat: no-repeat;`">
        <Tab3Container />
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import registerBg2 from '@/assets/img/ill_header.png'
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/vue";
import Tab3Container from "./container/Tab3Container.vue";

export default defineComponent({
  name: "Tab1Page",
  components: {
    Tab3Container,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonRefresher,
    IonRefresherContent,
  },
  data() {
    return {
      registerBg2
    }
  },
  setup() {
    const store = useStore();
    const getData = computed(() => store.getters["product/getData"]);
    const fetchData = () => store.dispatch("product/fetchProducts");
    const handleRefresh = (event: any) => {
      setTimeout(() => {
        fetchData();
        event?.target?.complete();
      }, 2000);
    };
    return {
      getData,
      handleRefresh,
      fetchData,
    };
  },
  methods: {
    async loadProductData(): Promise<any> {
      return await this.fetchData();
    },
    ionViewWillEnter() {
      this.loadProductData();
    },
  },
});
</script>
