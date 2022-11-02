<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Checkout</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="cancel()" slot="icon-only"
          ><ion-icon :icon="close"></ion-icon
        ></ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-searchbar placeholder="Cari..." v-model="search"></ion-searchbar>
    <ion-grid>
      <ion-row>
        <ion-radio-group value="" v-model="filter">
          <ion-col>
            <ion-label>Semua</ion-label>
            <ion-radio value=""></ion-radio>
          </ion-col>
          <ion-col>
            <ion-label>Bakaran</ion-label>
            <ion-radio value="bakaran"></ion-radio>
          </ion-col>
          <ion-col>
            <ion-label>Minuman</ion-label>
            <ion-radio value="minuman"></ion-radio>
          </ion-col>
        </ion-radio-group>
      </ion-row>
    </ion-grid>
    <ion-list>
      <ion-item v-for="orderData in getOrdersData" :key="orderData.id">
        <ion-label
          ><h3>{{ orderData.invoice_id }}</h3>
          <p>{{ orderData.table }}</p></ion-label
        >
        <ion-note slot="end"
          ><h4>Idr {{ orderData.amount }}</h4></ion-note
        ><ion-buttons
        slot="end"
          ><ion-button @click="openOrderDetail(orderData)" slot="icon-only"
            ><ion-icon :icon="open"></ion-icon></ion-button
        ></ion-buttons>
      </ion-item>
    </ion-list>
  </ion-content>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonItem,
  IonLabel,
  modalController,
  IonList,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonNote,
  IonSearchbar,
  IonRadioGroup,
  IonRadio,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import { close, open } from "ionicons/icons";
import ModalProductDetail from "@/components/modal/modalProductDetail.vue";

export default defineComponent({
  name: "allProductsListModal",
  components: {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonItem,
    IonLabel,
    IonList,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonNote,
    IonSearchbar,
    IonRadioGroup,
    IonRadio,
  },
  setup() {
    return {
      close,
      open,
    };
  },
  data() {
    return {
      filter: "",
      search: "",
    };
  },
  computed: {
    ...mapGetters("order", ["getOrdersData"]),
    // products() {
    //   if (this.search && this.filter) {
    //     return this.getOrdersData.filter(
    //       (product: { title: string; category: { title: string } }) => {
    //         return (
    //           product.title.toLowerCase().includes(this.search.toLowerCase()) &&
    //           product.category.title.toLowerCase() === this.filter.toLowerCase()
    //         );
    //       }
    //     );
    //   } else {
    //     if (this.search && !this.filter) {
    //       return this.getOrdersData.filter((product: { title: string }) => {
    //         return product.title
    //           .toLowerCase()
    //           .includes(this.search.toLowerCase());
    //       });
    //     } else {
    //       if (!this.search && this.filter) {
    //         return this.getOrdersData.filter(
    //           (product: { category: { title: string } }) => {
    //             return (
    //               product.category.title.toLowerCase() ===
    //               this.filter.toLowerCase()
    //             );
    //           }
    //         );
    //       } else {
    //         return this.getOrdersData;
    //       }
    //     }
    //   }
    // },
  },
  methods: {
    cancel() {
      return modalController.dismiss(null, "cancel");
    },
    async openOrderDetail(product: any) {
      const modal = await modalController.create({
        component: ModalProductDetail,
        componentProps: { product: product },
      });
      modal.present();
    },
  },
});
</script>
