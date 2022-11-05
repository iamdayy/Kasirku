<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet, useIonRouter } from '@ionic/vue';
import { defineComponent } from 'vue';
import { supabase } from "@/supabase/supabase.config";
import { store } from './store/store';
export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  },
  setup(){
    const router = useIonRouter();
    const getUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      store.user = user ?? {};
    }
    supabase.auth.onAuthStateChange((_, session) => {
      store.user = session?.user ?? {}
      if(session?.user) {
        router.replace({name: 'My-Angkringan'});
      }
    });
    return {
      getUserData
    }
  },
  mounted() {
    this.getUserData()
  },
});
</script>