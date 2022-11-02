<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>My Angkringan</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">My Angkringan</ion-title>
        </ion-toolbar>
      </ion-header>
      <div class="h-full w-full" :style="`background-image: url('${registerBg2}'); background-repeat: no-repeat;`">
        <Tab2Container />
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import registerBg2 from '@/assets/img/ill_header.png'
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import Tab2Container from "./container/Tab2Container.vue";

export default defineComponent({
  name: "Tab2Page",
  components: {
    Tab2Container,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
  },
    data() {
    return {
        registerBg2
    }
  },
  methods: {
    ...mapActions("order", ["fetchOrders"]),
    ...mapActions("product", ["fetchProducts"]),
    async loadOrdersData() {
      await this.fetchOrders();
    },
    async loadProductsData() {
      await this.fetchProducts();
    },
    ionViewWillEnter() {
      this.loadOrdersData();
      this.loadProductsData();
    },
  },
});
</script>
