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
    
</ion-content>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
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
    },
    data() {
        return {

        }
    },
    setup() {
        return  {
            close,
            open
        }
    },
    methods: {
        cancel() {
            return modalController.dismiss(null, "cancel");
        }
    }
})
</script>