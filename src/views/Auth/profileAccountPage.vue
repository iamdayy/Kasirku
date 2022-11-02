<template>
    <div class="container mx-auto px-4 my-12 h-full">
       <form @submit.prevent="updateProfile">
        <ion-item>
          <ion-label>
            <p>Email</p>
            <p>{{ session }}</p>
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Name</ion-label>
          <ion-input
            type="text"
            name="username"
            v-model="profile.username"
          ></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Website</ion-label>
          <ion-input
            type="url"
            name="website"
            v-model="profile.website"
          ></ion-input>
        </ion-item>
        <div class="ion-text-center">
          <ion-button fill="clear" type="submit">Update Profile</ion-button>
        </div>
      </form>

      <div class="ion-text-center">
        <ion-button fill="clear" @click="signOut">Log Out</ion-button>
      </div> 
    </div>
</template>

<script lang="ts">
  import { supabase } from '@/supabase/supabase.config'
  import {
    toastController,
    loadingController,
    IonInput,
    IonItem,
    IonButton,
    IonLabel,
  } from '@ionic/vue'
  import { defineComponent, onMounted, ref } from 'vue'
  export default defineComponent({
    name: 'AccountPage',
    components: {
      IonInput,
      IonItem,
      IonButton,
      IonLabel,
    },
    setup() {
      const session = ref(supabase.auth.getSession())
      const profile = ref({
        username: '',
        website: '',
        avatar_url: '',
      })
      const userInfo = localStorage.getItem("user")
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const user = JSON.parse(userInfo!)
      async function getProfile() {
        const loader = await loadingController.create({})
        const toast = await toastController.create({ duration: 5000 })
        await loader.present()
        try {
            console.log(user);
          let { data, error, status } = await supabase
            .from('profiles')
            .select(`username, website, avatar_url`)
            .eq('id', user?.id)
            .single()

          if (error && status !== 406) throw error

          if (data) {
            console.log(data)
            profile.value = {
              username: data.username,
              website: data.website,
              avatar_url: data.avatar_url,
            }
          }
        } catch (error: any) {
          toast.message = error.message
          await toast.present()
        } finally {
          await loader.dismiss()
        }
      }

      const updateProfile = async () => {
        const loader = await loadingController.create({})
        const toast = await toastController.create({ duration: 5000 })
        try {
          await loader.present()
          const updates = {
            id: user.id,
            ...profile.value,
            updated_at: new Date(),
          }
          //
          let { error } = await supabase.from('profiles').upsert(updates)
          //
          if (error) throw error
        } catch (error: any) {
          toast.message = error.message
          await toast.present()
        } finally {
          await loader.dismiss()
        }
      }

      async function signOut() {
        const loader = await loadingController.create({})
        const toast = await toastController.create({ duration: 5000 })
        await loader.present()
        try {
          let { error } = await supabase.auth.signOut()
          if (error) throw error
        } catch (error: any) {
          toast.message = error.message
          await toast.present()
        } finally {
          await loader.dismiss()
        }
      }

      onMounted(() => {
        getProfile()
      })
      return { signOut, profile, session, updateProfile }
    },
  })
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