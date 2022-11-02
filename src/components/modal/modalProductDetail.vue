<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Detail Menu</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="cancel()" slot="icon-only"
          ><ion-icon :icon="close"></ion-icon
        ></ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-card>
      <img class="product_detail_img" :src="imageUrl" />
      <ion-card-header>
        <div class="metaInfo">
          <ion-card-subtitle>{{ product?.category.title }}</ion-card-subtitle>
          <ion-card-title>{{ product?.title }}</ion-card-title>
          
        </div>
      </ion-card-header>
      <ion-card-content>
        <ion-item>
          <h3>Harga :</h3>
          <ion-label slot="end"><h3>Stok :</h3></ion-label>
        </ion-item>
        <ion-item>
          <h3>{{ product?.price }}</h3>
          <ion-label slot="end"><h3>{{ product?.stock }}</h3></ion-label>
        </ion-item>
      </ion-card-content>
      <ion-footer>
        <ion-item>
          <ion-button slot="start" @click="openEditProductModal">
            <ion-icon :icon="create"></ion-icon>
            <div>Edit</div>
          </ion-button>
          <ion-button slot="end" @click="deleteProduct(product)">
            <ion-icon :icon="trash"></ion-icon>
            <div>Hapus</div>
          </ion-button>
        </ion-item>
      </ion-footer>
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
  modalController,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonFooter,
  IonItem,
  IonLabel
} from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { close, open, trash, create } from "ionicons/icons";
import noImage from "@/assets/img/no_image_available.jpeg";
import { supabase } from "@/supabase/supabase.config";
import { mapActions } from "vuex";
import modalEditProduct from "./modalEditProduct.vue";
export default defineComponent({
  name: "productDetailModal",
  components: {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonFooter,
    IonItem,
    IonLabel
  },
  setup() {
    const imageUrl = ref("");
    /**
     *
     */
    const downloadImage = async (path: any) => {
      if (!path) {
        imageUrl.value = noImage;
        return;
      }
      const { data, error } = await supabase.storage
        .from("products-photo")
        .download(path);
      if (error) throw error;
      imageUrl.value = URL.createObjectURL(data);
    };
    return {
      close,
      open,
      trash,
      create,
      downloadImage,
      imageUrl,
    };
  },
  props: {
    product: Object,
  },
  data() {
    return {
      noImage,
    };
  },
  methods: {
    ...mapActions("product", ["deleteProduct"]),
    cancel() {
      return modalController.dismiss(null, "cancel");
    },
    async openEditProductModal() {
      const modal = await modalController.create({
        component: modalEditProduct,
        componentProps: { prod: this.product },
      });
      modal.present();
    },
  },
  mounted() {
    this.downloadImage(this.product?.image);
  },
});
</script>

<style scoped>
.product_detail_img {
  width: 100vh;
  object-fit: cover;
}

@media (prefers-color-scheme: light) {
  h3 {
    color: black;
  }
}

h3 {
  font-weight: bold;
}

.button {
  margin-top: 1em;
}

.metaInfo {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
</style>
