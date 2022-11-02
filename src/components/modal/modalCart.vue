<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Keranjang</ion-title>
      <ion-buttons slot="end">
        <ion-button color="medium" @click="cancel" slot="icon-only"><ion-icon :icon="close"></ion-icon></ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-list v-if="cart.length">
      <ion-item v-for="product in cart" :key="product.id"
        ><ion-label>{{ product.title }}</ion-label     
        ><ion-text>Qty {{ product.quantity }}</ion-text><ion-button slot="end" @click="removeFromCart(product)"
          ><ion-icon slot="icon-only" :icon="close"></ion-icon></ion-button
      ></ion-item>
      <ion-item>
        <ion-label>Total</ion-label>
        <ion-text>{{ cartTotalPrice }}</ion-text>
      </ion-item>
    </ion-list>
    <ion-item v-else color="danger">
        <ion-label>Keranjangnya kosong dong !!!</ion-label>
    </ion-item>
    <ion-button :disabled="!cart.length" expand="block" size="large" @click="checkout">Checkout</ion-button>
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
  IonList,
  IonIcon,
  IonText,
  modalController,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { mapState, mapGetters, mapMutations } from "vuex";
import { close } from "ionicons/icons";
import modalCheckout from "./modalCheckout.vue";
export default defineComponent({
  name: "cartModal",
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
    IonText
  },
  setup() {
    return {
      close,
    };
  },
  computed: {
    ...mapState("cart", ["cart"]),
    ...mapGetters("cart", ["cartTotalPrice"]),
  },
  methods: {
    ...mapMutations("cart", ["removeFromCart"]),
    cancel() {
      return modalController.dismiss(null, "cancel");
    },
    async openModalCheckout() {
      const modal = await modalController.create({
        component: modalCheckout,
      });
      modal.present();
    },
    checkout() {
      this.openModalCheckout();
    }
  },
});
</script>
