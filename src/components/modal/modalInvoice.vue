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
    <iframe :src="pdfUrl" frameborder="0"></iframe>
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
import { defineComponent, ref } from "vue";
import {  mapGetters } from "vuex";
import { close } from "ionicons/icons";
import { supabase } from "@/supabase/supabase.config"
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
  setup() {
    const pdfUrl = ref('')
    const loadInvoice = (path: any) => {
      const { data } = supabase.storage
        .from("invoice-pdf")
        .getPublicUrl(path);
      pdfUrl.value = data.publicUrl;

      console.log(pdfUrl.value);
    }
    return {
      close,
      loadInvoice,
      pdfUrl
    };
  },
  props: {
    invoicePath: String,
  },
  computed: {
    ...mapGetters("order",["getInvoice"])
  },
  methods: {
    cancel() {
      return modalController.dismiss(null, "cancel");
    },
  },
  mounted() {
    this.loadInvoice(this.invoicePath)
  }
});
</script>
