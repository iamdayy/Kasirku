<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Order {{ order?.invoice_id }}</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="cancel()" slot="icon-only"
          ><ion-icon :icon="close"></ion-icon
        ></ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-card>
      <ion-card-header>
        <ion-card-subtitle>{{ order?.created_at }}</ion-card-subtitle>
        <ion-card-title>Summary</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-list lines="inset">
          <ion-item
            ><ion-label><h3>Subtotal</h3></ion-label
            ><ion-note slot="end"
              ><h3>Idr {{ order?.amount }}</h3></ion-note
            ></ion-item
          >
          <ion-item
            ><ion-label><h2 class="font-semibold">Total</h2></ion-label
            ><ion-note slot="end"><h2>{{ order?.amount }}</h2></ion-note></ion-item
          >
        </ion-list>
        <ion-list>
          <ion-list-header>
            <ion-label><h1>Keranjang</h1></ion-label>
          </ion-list-header>
          <ion-item v-for="product in order?.product_order" :key="product.id">
            <thumbnailPart
              :image="product.product_id.image"
              :alt="product.product_id.title"
            />
            <ion-label>
              <h2>{{ product.product_id.title }}</h2>
              <p>{{ product.product_id.category_id }}</p>
              <ion-note
                ><p>{{ product.product_id.price }}</p></ion-note
              >
              <ion-note
                ><p>{{ product.quantity }}</p></ion-note
              >
            </ion-label>
          </ion-item>
        </ion-list>
        <ion-item>
          <ion-button @click="openInvoice">lihat invoice</ion-button>
          <ion-buttons slot="end">
            <ion-button fill="solid" color="success" expand="full">Bayar</ion-button>
          </ion-buttons>
        </ion-item>
      </ion-card-content>
    </ion-card>
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
  IonNote,
  IonItem,
  IonLabel,
  modalController,
  IonList,
  IonListHeader,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { close, open } from "ionicons/icons";
import ModalInvoice from "@/components/modal/modalInvoice.vue";
import thumbnailPart from "../part/thumbnailPart.vue";
export default defineComponent({
  name: "allProductsListModal",
  components: {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonNote,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    thumbnailPart,
  },
  setup() {
    return {
      close,
      open,
    };
  },
  props: {
    order: Object,
  },
  methods: {
    cancel() {
      return modalController.dismiss(null, "cancel");
    },
    async openInvoice() {
      const modal = await modalController.create({
        component: ModalInvoice,
        componentProps: { order: this.order},
      });
      modal.present();
    },
  },
});
</script>
