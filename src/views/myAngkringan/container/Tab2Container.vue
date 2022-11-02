<template>
  <div class="py-4">
    <ion-card>
      <ion-card-header>
        <ion-card-title>Pesanan</ion-card-title>
        <ion-card-subtitle>Daftar</ion-card-subtitle>
      </ion-card-header>
      <ion-card-content>
        <ion-list>
          <ion-item
            v-for="orderData in getMinimalOrdersData"
            :key="orderData.id"
          >
            <ion-title>{{ orderData.invoice_id }}</ion-title>
            <ion-note slot="end">{{ orderData.created_at }}</ion-note> <br />
            <ion-label> {{ orderData.table }}</ion-label>
            <ion-label> {{ orderData.amount }}</ion-label>
          </ion-item>
        </ion-list>
      </ion-card-content>
      <ion-button expand="block" @click="openAllOrdersListModal">Tampilkan lainnya</ion-button>
    </ion-card>

    <ion-card>
      <ion-card-header>
        <ion-card-title>Produk</ion-card-title>
        <ion-card-subtitle>Daftar</ion-card-subtitle>
      </ion-card-header>
      <ion-card-content>
        <ion-list>
          <ion-item
            v-for="productData in getMinimalProductsData"
            :key="productData.id"
          >
            <ion-grid>
              <ion-row>
                <ion-col><thumbnailPart /></ion-col>
                <ion-col
                  ><ion-title>{{ productData.title }}</ion-title></ion-col
                >
                <ion-col
                  ><ion-note slot="end">{{
                    productData.category.title
                  }}</ion-note>
                  <br
                /></ion-col>
                <ion-col
                  ><ion-label>Idr {{ productData.price }}</ion-label></ion-col
                >
                <ion-col
                  ><ion-label> {{ productData.stock }}</ion-label></ion-col
                >
                <ion-col
                  ><ion-buttons
                    ><ion-button slot="icon-only"
                      ><ion-icon
                        :icon="open"
                      ></ion-icon></ion-button></ion-buttons
                ></ion-col>
              </ion-row>
            </ion-grid>
          </ion-item>
        </ion-list>
      </ion-card-content>
      <ion-button expand="block" @click="openAllProductsListModal">Tampilkan lainnya</ion-button>
    </ion-card>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import {
  IonItem,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonLabel,
  IonList,
  IonNote,
  IonTitle,
  IonButtons,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  modalController
} from "@ionic/vue";
import { open } from "ionicons/icons";
import thumbnailPart from "../../../components/part/thumbnailPart.vue";
import ModalAllProductList from "@/components/modal/modalAllProductList.vue";
import ModalAllOrdersList from "@/components/modal/modalAllOrdersList.vue";
export default defineComponent({
  name: "Tab2Container",
  components: {
    IonItem,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonLabel,
    IonList,
    IonNote,
    IonTitle,
    IonButtons,
    IonButton,
    thumbnailPart,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
  },
  setup() {
    return {
      open,
    };
  },
  computed: {
    ...mapGetters("order", ["getMinimalOrdersData"]),
    ...mapGetters("product", ["getMinimalProductsData"]),
  },
  methods: {
    async openAllProductsListModal() {
      const modal = await modalController.create({
        component: ModalAllProductList
      });
      modal.present();
    },
    async openAllOrdersListModal() {
      const modal = await modalController.create({
        component: ModalAllOrdersList
      });
      modal.present();
    },
  }
});
</script>
