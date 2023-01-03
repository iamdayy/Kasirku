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
              class="text-slate-900 dark:text-white text-xl text-center my-5 font-bold"
            >
              <img :src="logoOnly" alt="logo" class="w-6/12 mx-auto my-3" />
              <small>Masuk untuk dapat menggunakan aplikasi</small>
            </div>
            <ion-item>
              <ion-label position="floating" required>Email</ion-label>
              <ion-input type="email" v-model="user.email" />
            </ion-item>
            <ion-item>
              <ion-label position="floating" required>Password</ion-label>
              <ion-input type="password" v-model="user.password" />
            </ion-item>
            <ion-button expand="block" size="large" @click="handleLogin(user)">
              Login
            </ion-button>
            <p>
              <a href="/auth/forgot-password" class="text-sm"
                >lupa password ?</a
              >
              / <a href="/auth/register" class="text-sm">Daftar</a>
            </p>
            <p><span>email : sabdatama1100@gmail.com</span> <span>pass: admin123</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { IonButton, IonItem, IonInput, IonLabel, loadingController, toastController } from "@ionic/vue";
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import router from "@/router";


import illHeader from "@/assets/img/ill_header.png";
import logoOnly from "@/assets/img/logo_only.png";

export default defineComponent({
  name: "HomePage",
  components: {
    IonButton,
    IonItem,
    IonInput,
    IonLabel,
  },
  data() {
    return {
      illHeader,
      logoOnly,
      user: {
        email: "",
        password: "",
      },
      showLoading: false,
    };
  },
  methods: {
    ...mapActions("auth", ["login"]),
    async handleLogin(user: any) {
      const loader = await loadingController.create({})
      const toast = await toastController.create({ duration: 3000 })
      try {
        await loader.present();
        const { error } = await this.login(user);
        
        if (error) throw error;

        toast.message = 'Berhasil dong... Login nya'
        await toast.present()
      } catch (error: any) {
        toast.message = 'Sepertinya ada yang salah... coba deh ulangi...'
        await toast.present();
      } finally {
        await loader.dismiss();
        router.push({name: 'My-Angkringan'});
      }
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
