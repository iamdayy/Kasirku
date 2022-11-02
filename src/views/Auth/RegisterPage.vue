<template>
  <div class="container mx-auto px-4 h-full">
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full lg:w-4/12 px-4">
        <div
          class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 border border-gray-200"
          :style="`background-image: url('${illHeader}');`"
        >
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <div
              class="text-slate-800 dark:text-slate-200 text-xl text-center my-5 font-bold"
            >
            <img :src="logoOnly" alt="logo" class="w-6/12 mx-auto my-3" />
              <small
                >Silahkan masukan email dan password untuk membuat akun</small
              >
            </div>
            <ion-item>
              <ion-label position="floating" required>Email</ion-label>
              <ion-input type="email" v-model="user.email" />
            </ion-item>
            <ion-item>
              <ion-label position="floating" required>Password</ion-label>
              <ion-input type="password" v-model="user.password" />
            </ion-item>
            <ion-item>
              <ion-label position="floating" required
                >Password Confirmation</ion-label
              >
              <ion-input type="password" v-model="user.passwordConfirmation" />
              <ion-note color="danger" slot="end" v-show="!validPassword"
                >Password Tidak Cocok</ion-note
              >
            </ion-item>
            <ion-button
              expand="block"
              size="large"
              @click="handleRegister(user)"
              >Daftar <ion-spinner v-if="isShow"></ion-spinner
            ></ion-button>

            <a href="/auth/login" class="text-sm">sudah punya akun?</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  IonButton,
  IonSpinner,
  IonItem,
  IonLabel,
  IonInput,
  IonNote,
  toastController,
} from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { mapActions } from "vuex";
import router from '@/router/'

import illHeader from "@/assets/img/ill_header.png"
import logoOnly from "@/assets/img/logo_only.png";

export default defineComponent({
  name: "HomePage",
  components: {
    IonButton,
    IonSpinner,
    IonItem,
    IonLabel,
    IonInput,
    IonNote,
  },
  setup() {
    const isShow = ref(false);
    const setShow = (state: boolean) => (isShow.value = state);
    return { isShow, setShow };
  },
  data() {
    return {
        illHeader,
        logoOnly,
      user: {
        email: "",
        password: "",
        passwordConfirmation: "",
      },
      validPassword: true,
      showModalSuccess: false,
    };
  },
  methods: {
    ...mapActions("auth", ["register"]),
    async handleRegister(user: any) {
      if (user.passwordConfirmation === user.password) {
        try {
          this.setShow(true);
          this.validPassword = true;
          await this.register(user);
          router.push('/tabs/home')
        } catch (error: any) {
          console.log(error.message);
        } finally {
          this.setShow(false);
          this.presentToast();
        }
      } else {
        this.validPassword = false;
      }
    },
    async presentToast() {
      const toast = await toastController.create({
        message: "Anda telah terdaftar silahkan cek email anda",
        duration: 1500,
        position: "middle",
      });

      await toast.present();
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
