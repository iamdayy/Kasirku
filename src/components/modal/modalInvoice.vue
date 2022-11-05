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
    <div class="container">
      <iframe class="responsive-iframe" v-if="fileInfo" :src="fileUrl" allowfullscreen />
    </div>
    <ion-buttons>
      <ion-button>Download</ion-button>
      <ion-button>Cetak</ion-button>
    </ion-buttons>
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
import { defineComponent, ref} from "vue";
import { close } from "ionicons/icons";
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

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
    },
    generatePdf() {
        const doc = new jsPDF({
            orientation: "portrait",
            unit: "in",
            format: "letter",
        });
        const info: any[] = []

        this.order?.product_order.forEach((element: any) => {
            info.push([element.product_id, element.quantity])
        });
        autoTable(doc, {
            head: [["Title", "Harga", "Qty"]],
            body: info,
            margin: { left: 0.5, top: 1.25 },
        });
        // text is placed using x, y coordinates
        doc.setFontSize(16).text("Nota "+this.order?.invoice_id, 0.5, 1.0);
        // create a line under heading
        doc.setLineWidth(0.01).line(0.5, 1.1, 8.0, 1.1);
        // Using array of sentences
        doc
            .setFont("helvetica")
            .setFontSize(12)
            .text(JSON.stringify(this.order?.table), 0.5, 3.5, { align: "left", maxWidth: 7.5 });

        // Creating footer and saving file
        doc
            .setFont("times")
            .setFontSize(11)
            .setTextColor(0, 0, 255)
            .text(
                "Terima Kasih Dan Kembali Lagi....",
                0.5,
                doc.internal.pageSize.height - 0.5
            );
            this.fileInfo = doc.output("blob");
            this.getUrl()
    },
  },
  setup() {
    const fileInfo = ref<any>(null)
    const fileUrl = ref<any>(null)
    const getUrl = () => {
      fileUrl.value = URL.createObjectURL(fileInfo.value);
    };
    return {
      close,
      fileInfo,
      fileUrl,
      getUrl
    }
  },
  mounted() {
    this.generatePdf();
  },
});
</script>

<style scoped>
.container {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 100%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
}
.responsive-iframe {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
</style>
