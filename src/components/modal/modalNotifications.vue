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
    <ion-list>
      <ion-item button :detail="true">
    <ion-label>
      <h3>Button Item</h3>
      <p>Detail set to true - detail arrow displays on both modes</p>
    </ion-label>
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
} from "@ionic/vue";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import { close, open } from "ionicons/icons";
import ModalInvoice from "@/components/modal/modalInvoice.vue";

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
    async openOrderDetail(orderData: any) {
      const modal = await modalController.create({
        component: ModalInvoice,
        componentProps: { order: orderData },
      });
      modal.present();
    },
  },
});
</script>
