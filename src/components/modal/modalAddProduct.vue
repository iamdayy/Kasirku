<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Tambah Produk</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="confirm()" slot="icon-only"><ion-icon :icon="close"></ion-icon></ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-item>
      <ion-label position="stacked">Titel</ion-label>
      <ion-input
        v-model="product.title"
        placeholder="Your product name"
      ></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="stacked">Kategori</ion-label>
      <ion-select interface="popover" placeholder="Select fruit" v-model="product.category_id">
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
        placeholder="Your product price"
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
  toastController,
  IonIcon
} from "@ionic/vue";
import { close } from "ionicons/icons";
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
    IonIcon
  },
  data() {
    return {
      close,
      product: {
        title: "",
        category_id: 0,
        image: null,
        price: "",
        stock: "",
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
    ...mapActions("product", ["addNewProduct"]),
    cancel() {
      return modalController.dismiss(null, "cancel");
    },
    async presentToast(position: 'top' | 'middle' | 'bottom') {
        const toast = await toastController.create({
          message: 'Save Success',
          duration: 1500,
          position: position
        });

        await toast.present();
      },
    async saveProduct() {
      this.product.image = this.fileInfo;
      await this.addNewProduct(this.product);
      this.presentToast('top');
      this.confirm()
    },
    confirm() {
      return modalController.dismiss("confirm");
    },
  },
});
</script>
