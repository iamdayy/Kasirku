<template>
  <div class="py-2">
    <ion-card>
      <ion-card-header>
        <ion-card-subtitle>Riwayat</ion-card-subtitle>
        <ion-card-title>Pesanan</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <StatsCardPart :TotalOrders="getOrdersData"/>
      </ion-card-content>
    </ion-card>
    <!-- <ion-card>
      <ion-card-header>
        <ion-card-subtitle>Riwayat</ion-card-subtitle>
        <ion-card-title>Pesanan</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <LineChart :data="getOrdersData" />
      </ion-card-content>
    </ion-card> -->
    <ion-card>
      <ion-card-header>
        <ion-card-subtitle>Daftar</ion-card-subtitle>
        <ion-card-title>Pesanan</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-list>
          <ion-item
            v-for="orderData in getOrdersData.filter((x: any, y: number) => y < 3)"
            :key="orderData.id"
          >
            <ion-label
              ><h3>{{ orderData.invoice_id }}</h3>
              <p>{{ orderData.table }}</p></ion-label
            >
            <ion-note slot="end"
              ><h4>Idr {{ orderData.amount }}</h4></ion-note
            >
            <!-- <ion-buttons
        slot="end"
          ><ion-button @click="openOrderDetail(orderData)" slot="icon-only"
            ><ion-icon :icon="open"></ion-icon></ion-button
        ></ion-buttons> -->
          </ion-item>
        </ion-list>
      </ion-card-content>
      <ion-button expand="block" @click="openAllOrdersListModal"
        >Tampilkan lainnya</ion-button
      >
    </ion-card>

    <ion-card>
      <ion-card-header>
        <ion-card-subtitle>Daftar</ion-card-subtitle>
        <ion-card-title>Produk</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-item>
          <ion-button
            color="primary"
            expand="block"
            size="default"
            @click="openAddProductModal()"
            >Tambah Produk</ion-button
          >
        </ion-item>
        <ion-list>
          <ion-item
            v-for="productData in getProductsData.filter((x: any, y: number) => y < 3)"
            :key="productData.id"
          >
            <thumbnailPart
              :image="productData.image"
              :alt="productData.title"
            />
            <ion-label>
              <h1>{{ productData.title }}</h1>
              <p>{{ productData.category.title }}</p>
              <ion-note
                ><p>Idr {{ productData.price }}</p></ion-note
              >
            </ion-label>
          </ion-item>
        </ion-list>
      </ion-card-content>
      <ion-button expand="block" @click="openAllProductsListModal"
        >Tampilkan lainnya</ion-button
      >
    </ion-card>
  </div>
</template>
<script lang="ts">
import StatsCardPart from "@/components/part/StatsCardPart.vue"
// import LineChart from "@/components/LineChart.vue"
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
  IonButton,
  modalController,
} from "@ionic/vue";
import { open } from "ionicons/icons";
import thumbnailPart from "../../../components/part/thumbnailPart.vue";
import ModalAllProductList from "@/components/modal/modalAllProductList.vue";
import ModalAddProduct from "@/components/modal/modalAddProduct.vue";
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
    IonButton,
    thumbnailPart,
    // LineChart,
    StatsCardPart
  },
  setup() {
    return {
      open,
    };
  },
  computed: {
    ...mapGetters("order", ["getOrdersData"]),
    ...mapGetters("product", ["getProductsData"])
  },
  methods: {
    async openAllProductsListModal() {
      const modal = await modalController.create({
        component: ModalAllProductList,
      });
      modal.present();
    },
    async openAllOrdersListModal() {
      const modal = await modalController.create({
        component: ModalAllOrdersList,
      });
      modal.present();
    },
    async openAddProductModal() {
      const modal = await modalController.create({
        component: ModalAddProduct,
      });
      modal.present();
    },
  },
});
</script>
