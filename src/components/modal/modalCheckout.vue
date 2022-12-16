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
  IonToggle,
} from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import { close } from "ionicons/icons";
import modalOrderDetail from "./modalOrderDetail.vue";
import { usePdf } from "@/service/pdf-service"
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
const { createPdf } = usePdf()
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
    IonToggle,
  },
  setup() {
    const fileInfo = ref<any>(null);
    const fileUrl = ref<any>(null);
    return {
      close,
      fileInfo,
      fileUrl,
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
        invoice: null,
      },
      Response: null,
    };
  },
  computed: {
    ...mapState("cart", ["cart"]),
    ...mapState("order",["response"]),
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
        this.order.products = this.cart;
        this.order.amount = this.cartTotalPrice;
        const pdf = await createPdf(this.order);
        this.fileInfo = pdf;
        this.order.invoice = this.fileInfo;
        console.log(this.order);
        await this.checkout(this.order);
        this.success = true;
        if (this.success) {
        this.openDetailOrderModal(this.response);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async openDetailOrderModal(payload: any) {
      const modal = await modalController.create({
        component: modalOrderDetail,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
        componentProps: {
          order: payload
        },
      });
      modal.present();
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
