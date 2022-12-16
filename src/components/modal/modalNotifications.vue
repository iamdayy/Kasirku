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
    <ion-list v-if="notifications.length" >
      <ion-item button :detail="true" @click="openOrderDetail(notification)" v-for="notification in notifications" :key="notification.id">
        <ion-label>
          <h3>Pesanan baru !!!</h3>
          <p>{{ JSON.stringify(notification) }}</p>
        </ion-label>
      </ion-item>
    </ion-list>
    <ion-item v-else color="success">
      <ion-label><h1>sepertinya tidak ada notifikasi kali ini</h1></ion-label>
    </ion-item>
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
  modalController,
  IonList,
  IonIcon,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import { close, open } from "ionicons/icons";
import ModalOrderDetail from "@/components/modal/modalOrderDetail.vue";
import { supabase } from "@/supabase/supabase.config";
import { RealtimeChannel } from "@supabase/realtime-js";
export default defineComponent({
  name: "allProductsListModal",
  components: {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonItem,
    IonLabel,
    IonList,
    IonIcon,
  },
  setup() {
    return {
      close,
      open,
    };
  },
  data() {
    return {
      filter: "",
      search: "",
      notifications: [] as any,
      subsOrders:  undefined as unknown as RealtimeChannel
    };
  },
  computed: {
    ...mapGetters("order", ["getOrdersData"]),
    // notifications() {
    //   const notifications: any[] = [];
    //   return notifications;
    // }
  },
  methods: {
    cancel() {
      return modalController.dismiss(null, "cancel");
    },
    async openOrderDetail(orderData: any) {
      const modal = await modalController.create({
        component: ModalOrderDetail,
        componentProps: { order: orderData },
      });
      modal.present();
    },
    subscribes() {
     this.subsOrders = supabase
        .channel("public:order")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "order" },
          (payload) => {
            if (payload.new) {
              this.notifications?.push(payload.new)
            }
            console.log("Change received!", payload);
          }
        )
        .subscribe();
    },
  },
  mounted() {
    this.subscribes();
  },
});
</script>
