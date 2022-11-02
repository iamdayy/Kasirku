<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button color="medium" @click="cancel">Cancel</ion-button>
      </ion-buttons>
      <ion-title>Modal</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="confirm()">Confirm</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-item>
      <ion-label position="stacked">Titel</ion-label>
      <ion-input
        v-model="product.title"
        :placeholder="prod?.title"
      ></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="stacked">Kategori</ion-label>
      <ion-select interface="popover" :placeholder="prod?.category_id" v-model="product.category_id">
        <ion-select-option value="1">Makanan</ion-select-option>
        <ion-select-option value="2">Minuman Dingin</ion-select-option>
        <ion-select-option value="3">Minuman Hangat</ion-select-option>
      </ion-select>
    </ion-item>
    <ion-item>
      <ion-label position="stacked">Gambar</ion-label>
      <input type="file" @change="getFile" />
      <ion-thumbnail v-if="fileInfo">
        <ion-img :src="fileUrl" alt="" />
      </ion-thumbnail>
    </ion-item>
    <ion-item>
      <ion-label position="stacked">Harga</ion-label>
      <ion-input
        type="number"
        v-model="product.price"
        :placeholder="prod?.price"
      ></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="stacked">Stok</ion-label>
      <ion-input
        type="number"
        v-model="product.stock"
        placeholder="Your product stock"
      ></ion-input>
    </ion-item>
    <ion-button @click="saveProduct" expand="block" size="large"
      >Simpan Produk</ion-button
    >
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
  IonThumbnail,
  IonImg,
  IonSelect,
  IonSelectOption,
} from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { mapActions } from "vuex";

export default defineComponent({
  name: "editproductModal",
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
    IonThumbnail,
    IonImg,
    IonSelect,
    IonSelectOption,
  },
  props: {
    prod: Object
  },
  data() {
    return {
      product: {
        title: this.prod?.title,
        category_id: this.prod?.category_id,
        image: this.prod?.image,
        price: this.prod?.price,
        stock: this.prod?.stock,
        imagePath: ''
      },
    };
  },
  setup() {
    const fileInfo = ref<any>(null);
    const fileUrl = ref<any>(null);
    const getFile = (event: any) => {
      fileInfo.value = event.target.files[0];
      fileUrl.value = URL.createObjectURL(fileInfo.value);
    };
    return { getFile, fileInfo, fileUrl };
  },
  methods: {
    ...mapActions("product", ["editProduct"]),
    cancel() {
      return modalController.dismiss(null, "cancel");
    },
    async saveProduct() {
      this.product.image = this.fileInfo;
      this.product.imagePath = this.prod?.image
      await this.editProduct(this.product);
    },
    confirm() {
      return modalController.dismiss("confirm");
    },
  },
});
</script>
