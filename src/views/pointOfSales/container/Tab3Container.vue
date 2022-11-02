<template>
  <div class="py-2">
    <ion-card>
      <ion-card-header>
        <ion-card-title>Daftar Produk</ion-card-title>
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
          <ion-buttons slot="end">
            <ion-button @click="openCartModal()"
              ><ion-icon slot="icon-only" :icon="cart"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-item>
        <ion-searchbar placeholder="Cari..." v-model="search"></ion-searchbar>
        <ion-grid>
          <ion-row>
            <ion-radio-group value="" v-model="filter">
              <ion-col>
                <ion-label>Semua</ion-label>
                <ion-radio value=""></ion-radio>
              </ion-col>
              <ion-col>
                <ion-label>Bakaran</ion-label>
                <ion-radio value="bakaran"></ion-radio>
              </ion-col>
              <ion-col>
                <ion-label>Minuman</ion-label>
                <ion-radio value="minuman"></ion-radio>
              </ion-col>
            </ion-radio-group>
          </ion-row>
        </ion-grid>
        <ion-list>
          <ion-item v-for="productData in products" :key="productData.id">
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
            <ion-buttons slot="end">
              <ion-button slot="icon-only" size="small" @click="addToCart(productData)"><ion-icon :icon="bagAdd"></ion-icon></ion-button>
            </ion-buttons>
          </ion-item>
        </ion-list>
      </ion-card-content>
    </ion-card>
  </div>
</template>

<script lang="ts">
import {
  IonButton,
  IonButtons,
  IonIcon,
  IonCard,
  IonList,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonSearchbar,
  modalController,
  IonLabel,
  IonRadio,
  IonRadioGroup,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/vue";
import { logOut, bagAdd, cart } from "ionicons/icons";
import { computed, defineComponent } from "vue";
import { mapActions, mapMutations } from "vuex";
import modalAddProduct from "@/components/modal/modalAddProduct.vue";
import modalEditProduct from "@/components/modal/modalEditProduct.vue";
import modalCart from "@/components/modal/modalCart.vue";
import thumbnailPart from "@/components/part/thumbnailPart.vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Tab3Container",
  components: {
    IonButton,
    IonButtons,
    IonIcon,
    IonCard,
    IonList,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonSearchbar,

    thumbnailPart,
    IonLabel,
    IonRadio,
    IonRadioGroup,
    IonGrid,
    IonRow,
    IonCol,
  },
  setup() {
    const store = useStore();
    const getData = computed(() => store.getters["product/getProductsData"]);

    return {
      logOut,
      bagAdd,
      cart,
      getData,
    };
  },
  data() {
    return {
      search: "",
      filter: "",
    };
  },
  computed: {
    products() {
      if (this.search && this.filter) {
        return this.getData.filter(
          (product: { title: string; category: { title: string } }) => {
            return (
              product.title.toLowerCase().includes(this.search.toLowerCase()) &&
              product.category.title.toLowerCase() === this.filter.toLowerCase()
            );
          }
        );
      } else {
        if (this.search && !this.filter) {
          return this.getData.filter((product: { title: string }) => {
            return product.title
              .toLowerCase()
              .includes(this.search.toLowerCase());
          });
        } else {
          if (!this.search && this.filter) {
            return this.getData.filter(
              (product: { category: { title: string } }) => {
                return (
                  product.category.title.toLowerCase() ===
                  this.filter.toLowerCase()
                );
              }
            );
          } else {
            return this.getData;
          }
        }
      }
    },
  },
  methods: {
    ...mapActions("product", ["addNewProduct", "deleteProduct"]),
    ...mapMutations("cart", ["addToCart"]),
    async openAddProductModal() {
      const modal = await modalController.create({
        component: modalAddProduct,
      });
      modal.present();
    },
    async openEditProductModal(product: any) {
      const modal = await modalController.create({
        component: modalEditProduct,
        componentProps: { prod: product },
      });
      modal.present();
    },
    async openCartModal() {
      const modal = await modalController.create({
        component: modalCart,
      });
      modal.present();
    },
  },
});
</script>

<style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
