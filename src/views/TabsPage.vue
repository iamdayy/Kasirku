<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <!-- <ion-tab-button tab="tab1" href="/tabs/home">
          <ion-icon :icon="home" />
          <ion-label>Tab 1</ion-label>
        </ion-tab-button> -->
          
        <ion-tab-button tab="tab2" href="/tabs/my-angkringan">
          <ion-icon :icon="storefront" />
          <ion-label>My Angkringan</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="tab3" href="/tabs/pos">
          <ion-icon :icon="calculator" />
          <ion-label>Kasir</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { calculator, home, storefront } from 'ionicons/icons';

export default defineComponent({
  name: 'TabsPage',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet },
  setup() {
    return{
      storefront,
      calculator, 
      home,
    }
  }
});
</script>
