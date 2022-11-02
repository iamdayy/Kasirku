<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Checkout</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="cancel()" slot="icon-only"><ion-icon :icon="close"></ion-icon></ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
      <ion-item>
        <ion-label position="stacked">Nama</ion-label>
        <ion-input v-model="order.name" placeholder="Nama Pembeli"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">Meja</ion-label>
        <ion-input
          v-model="order.table"
          type="number"
          placeholder="Meja..."
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">Catatan</ion-label>
        <ion-textarea
          placeholder="Catatan..."
          :auto-grow="true"
          v-model="order.message"
        ></ion-textarea>
      </ion-item>
      <ion-item>
        <ion-label>Sudah Bayar ?</ion-label>
        <ion-toggle slot="end" v-model="order.status"></ion-toggle>
      </ion-item>
      <ion-list v-if="cart.length">
        <ion-item>
          <ion-label>List Produk</ion-label>
        </ion-item>
        <ion-item v-for="product in cart" :key="product.id">
          <ion-label> {{ product.title }} </ion-label
          ><ion-text>Qty {{ product.quantity }}</ion-text
          ><ion-button slot="end"
            ><ion-icon
              slot="icon-only"
              :icon="close"
              @click.prevent="removeFromCart(product)"
            ></ion-icon></ion-button
        ></ion-item>
        <ion-item>
          <ion-label>Total</ion-label>
          <ion-text>{{ cartTotalPrice }}</ion-text>
        </ion-item>
      </ion-list>
      <ion-item v-else color="danger">
        <ion-label>Keranjangnya kosong dong !!!</ion-label>
      </ion-item>
      <ion-button
        :disabled="!cart.length"
        expand="block"
        size="large"
        @click="handleCheckout()"
        >Proses Pesanan</ion-button
      >
      <!-- <ion-item v-if="success">
        <ion-button>Simpan</ion-button>
        <ion-button @click="openInvoiceModal">Simpan & Buka</ion-button>
      </ion-item> -->
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
  IonInput,
  modalController,
  IonText,
  IonTextarea,
  IonList,
  IonIcon,
  IonToggle
} from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import { close } from "ionicons/icons";
import modalInvoice from "./modalInvoice.vue";
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

export default defineComponent({
  name: "checkoutModal",
  components: {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    IonText,
    IonTextarea,
    IonList,
    IonIcon,
    IonToggle
  },
  setup() {
    const fileInfo = ref<any>(null);
    const fileUrl = ref<any>(null);
    return {
      close,
      fileInfo,
      fileUrl
    };
  },
  data() {
    return {
        success: true,
      order: {
        transaction_num: "0",
        name: "",
        table: 0,
        message: "",
        status: false,
        amount: "",
        products: [],
        invoice: null
      },
      Response: null
    };
  },
  computed: {
    ...mapState("cart", ["cart"]),
    ...mapGetters("cart", ["cartTotalPrice"]),
    ...mapGetters("order", ["getOrderData"]),
  },
  methods: {
    ...mapActions("product", ["editProduct"]),
    cancel() {
      return modalController.dismiss(null, "cancel");
    },
    ...mapActions("order", ["checkout"]),
    ...mapMutations("cart", ["updateCartFromLocalStorage", "removeFromCart"]),
    async handleCheckout() {
      try {
          this.generatePdf()
      this.order.amount = this.cartTotalPrice;
      this.order.products = this.cart;
      this.order.invoice = this.fileInfo;
await this.checkout(this.order);
      this.success = true
        } catch (error) {
            console.log(error);
            
        }
    },
    async openInvoiceModal() {
        const modal = await modalController.create({
        component: modalInvoice,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
        componentProps: { invoicePath: this.getOrderData.dbData[0].invoice_pdf }
      });
      modal.present();
    },
    generatePdf() {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "in",
        format: "letter",
      });
      let info: any[] = []
 
        this.cart.forEach((element: any) => {
            info.push([element.title,element.price,element.quantity])
        });
      autoTable(doc, {
        head: [["Title", "Harga", "Qty"]],
        body: info,
        margin: { left: 0.5, top: 1.25 },
      });
      // text is placed using x, y coordinates
      doc.setFontSize(16).text("Nota " + this.order.transaction_num, 0.5, 1.0);
      // create a line under heading
      doc.setLineWidth(0.01).line(0.5, 1.1, 8.0, 1.1);
      // Using array of sentences
      doc
        .setFont("helvetica")
        .setFontSize(12)
        .text(this.order.message, 0.5, 3.5, { align: "left", maxWidth: 7.5 });

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
    },
    loadProductData() {
      this.updateCartFromLocalStorage();
    },
    ionViewWillEnter() {
      this.loadProductData();
    },
  },
});
</script>
