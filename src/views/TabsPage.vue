<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-fab vertical="bottom" horizontal="center" slot="fixed">
        <ion-fab-button>
          <ion-icon :icon="home"></ion-icon>
        </ion-fab-button>
        <ion-fab-list side="top">
          <ion-fab-button @click="openModalNotifications"
            ><ion-icon :icon="notifications"></ion-icon
          ></ion-fab-button>
          <ion-fab-button @click="openModalAccount"
            ><ion-icon :icon="personCircle"></ion-icon
          ></ion-fab-button>
          <ion-fab-button @click="handleSignOut"
            ><ion-icon :icon="logOut"></ion-icon></ion-fab-button
        ></ion-fab-list>
      </ion-fab>
      <ion-tab-bar slot="bottom">
        <!-- <ion-tab-button tab="tab1" href="/tabs/home">
          <ion-icon :icon="home" />
          <ion-label>Tab 1</ion-label>
        </ion-tab-button> -->

        <ion-tab-button tab="tab2" href="/tabs/my-angkringan">
          <ion-icon :icon="storefront" />
          <!-- <ion-label>My Angkringan</ion-label> -->
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/tabs/pos">
          <ion-icon :icon="calculator" />
          <!-- <ion-label>Kasir</ion-label> -->
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  // IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
  IonFab,
  IonFabButton,
  IonFabList,
  modalController,
  toastController,
  loadingController,
} from "@ionic/vue";
import {
  calculator,
  storefront,
  logOut,
  close,
  home,
  personCircle,
  notifications,
} from "ionicons/icons";
import { mapActions } from "vuex";
import modalAccountDetail from "@/components/modal/modalAccountDetail.vue";
import modalNotifications from "@/components/modal/modalNotifications.vue";
import router from "@/router/";
export default defineComponent({
  name: "TabsPage",
  components: {
    // IonLabel,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonPage,
    IonRouterOutlet,
    IonFab,
    IonFabButton,
    IonFabList,
  },
  setup() {
    return {
      storefront,
      calculator,
      home,
      logOut,
      close,
      personCircle,
      notifications,
    };
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    //login handle
    async handleSignOut() {
      const toast = await toastController.create({ duration: 4000 });
      const loader = await loadingController.create({});
      //kita login plus tampilin loading dan toast
      try {
        loader.present();
        await this.logout();
        toast.message = "Anda Telah keluar... Login lagi dong...";
        await toast.present();
      } finally {
        await loader.dismiss();
        router.push({ name: "Login" });
      }
    },
    async openModalAccount() {
      const modal = await modalController.create({
        component: modalAccountDetail,
      });
      modal.present();
    },
    async openModalNotifications() {
      const modal = await modalController.create({
        component: modalNotifications,
      });
      modal.present();
    },
  },
});
</script>
