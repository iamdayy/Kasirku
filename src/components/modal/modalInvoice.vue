<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Invoice</ion-title>
      <ion-buttons slot="end">
        <ion-button color="medium" @click="cancel" slot="icon-only"
          ><ion-icon :icon="close"></ion-icon
        ></ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <div class="">
      <object
      width="400"
      height="800"
        v-if="order"
        :data="order.publicUrl"
      />
    </div>
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
  IonIcon,
  modalController,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { close } from "ionicons/icons";

export default defineComponent({
  name: "invoiceModal",
  components: {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
  },
  props: {
    order: Object,
  },
  methods: {
    cancel() {
      return modalController.dismiss(null, "cancel");
    }
  },
  setup() {
    return {
      close,
    };
  }
});
</script>
