<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-fab vertical="bottom" horizontal="center" slot="fixed">
        <ion-fab-button>
          <ion-icon :icon="home"></ion-icon>
        </ion-fab-button>
        <ion-fab-list side="top"
          ><ion-fab-button
            ><ion-icon :icon="personCircle"></ion-icon></ion-fab-button
          ><ion-fab-button @click="handleSignOut"
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
  modalController
} from "@ionic/vue";
import {
  calculator,
  storefront,
  logOut,
  close,
  home,
  personCircle,
} from "ionicons/icons";
import { mapActions } from "vuex";
import modalAccountDetail from "@/components/modal/modalAccountDetail.vue"

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
    };
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    async handleSignOut() {
      await this.logout();
    },
    async openModalAccount() {
      const modal = await modalController.create({
        component: modalAccountDetail,
      });
      modal.present()
    }
  },
});
</script>
