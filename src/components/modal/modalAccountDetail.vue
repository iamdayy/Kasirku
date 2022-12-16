<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Account</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="cancel()" slot="icon-only"
          ><ion-icon :icon="close"></ion-icon
        ></ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>

  <ion-content>
    <avatar v-model:path="getProfile.avatar_url"></avatar>
    <ion-card>
      <ion-card-header>
        <ion-card-title>Data Pribadi Anda</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <form @submit.prevent="handleUpdateProfile">
          <ion-item>
            <ion-label>
              <p>Email</p>
              <p v-if="Session">{{ Session.data?.session?.user?.email }}</p>
            </ion-label>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Name</ion-label>
            <ion-input
              type="text"
              name="username"
              v-model="getProfile.username"
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Website</ion-label>
            <ion-input
              type="url"
              name="website"
              v-model="getProfile.website"
            ></ion-input>
          </ion-item>
            <ion-item>
              <ion-button @click="handleSignOut">Log Out</ion-button>
              <ion-buttons slot="end">
              <ion-button color="success" type="submit"><ion-icon :icon="save" name="save"></ion-icon></ion-button>
            </ion-buttons>
          </ion-item>
        </form>
      </ion-card-content>
    </ion-card>
  </ion-content>
</template>

<script lang="ts">
import { store } from "@/store/store";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  toastController,
  loadingController,
  IonInput,
  IonItem,
  IonButtons,
  IonButton,
  IonLabel,
  IonIcon,
  IonCard,
  IonCardTitle,
  IonCardHeader,
  IonCardContent,
  modalController,
} from "@ionic/vue";
import { close, save } from "ionicons/icons";
import { User } from "@supabase/supabase-js";
import { defineComponent } from "vue";
import router from "@/router";
import Avatar from "@/components/Avatar.vue";
import { mapActions, mapGetters } from "vuex";
export default defineComponent({
  name: "modalAccountDetail",
  components: {
    IonCard,
    IonCardTitle,
    IonCardHeader,
    IonCardContent,
    Avatar,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonInput,
    IonItem,
    IonButtons,
    IonButton,
    IonLabel,
    IonIcon,
  },
  computed: {
    ...mapGetters("auth", ["getProfile", "Session"]),
  },
  methods: {
    ...mapActions("auth", [
      "fetchProfile",
      "getSession",
      "logout",
      "updateProfile",
    ]),
    async handleSignOut() {
      const toast = await toastController.create({ duration: 4000 });
      const loader = await loadingController.create({});
      //kita login plus tampilin loading dan toast
      try {
        loader.present();
        await this.logout();
      } finally {
        toast.message = "Anda Telah keluar... Login lagi dong...";
        await toast.present();
        await loader.dismiss();
        this.cancel();
        router.push({ name: "Login" });
      }
    },
    async handleUpdateProfile() {
      const loader = await loadingController.create({});
      const toast = await toastController.create({ duration: 5000 });
      try {
        await loader.present();
        const profile = {
          id: this.user.id,
          ...this.getProfile,
        };
        const { error } = await this.updateProfile(profile);
        if (error) throw error;
      } catch (error: any) {
        toast.message = error.message;
        await toast.present();
      } finally {
        toast.message = "Yeeyy... Profil Anda terupdate...";
        await toast.present();
        await loader.dismiss();
      }
    },
    async loadProfile() {
      await this.fetchProfile(this.user);
      await this.getSession();
    },
    cancel() {
      return modalController.dismiss(null, "cancel");
    },
    ionViewWillEnter() {
      this.loadProfile();
    },
  },
  mounted() {
    this.loadProfile();
  },
  setup() {
    const user = store.user as User;
    return { user, close, save };
  },
});
</script>
