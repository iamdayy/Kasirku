<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>My Angkringan</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">My Angkringan</ion-title>
        </ion-toolbar>
      </ion-header>
      <div
        :style="`background-image: url('${registerBg2}'); background-repeat: no-repeat;`"
      >
        <Tab2Container />
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import registerBg2 from "@/assets/img/ill_header.png";
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/vue";
import { logOut, close, home, personCircle } from "ionicons/icons";
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
    IonRefresher,
    IonRefresherContent,

  },
  data() {
    return {
      registerBg2,
    };
  },
  setup() {
    return {
      close,
      logOut,
      home,
      personCircle,
    };
  },
  methods: {
    handleRefresh(event: any) {
      setTimeout(() => {
        this.loadProductsData();
        event?.target?.complete();
      }, 2000);
    },
    ...mapActions("auth", ["logout"]),
    ...mapActions("order", ["fetchOrders"]),
    ...mapActions("product", ["fetchProducts"]),
    async handleSignOut() {
      await this.logout();
    },
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
