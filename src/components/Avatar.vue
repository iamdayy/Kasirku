<template>
  <div class="avatar">
    <div class="avatar_wrapper" @click="uploadAvatar">
      <img v-if="avatarUrl" :src="avatarUrl" />
      <ion-icon v-else :icon="person" class="no-avatar"></ion-icon>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { supabase } from '@/supabase/supabase.config';
import { Camera, CameraResultType } from '@capacitor/camera';
import { IonIcon } from '@ionic/vue';
import { person } from 'ionicons/icons';
export default defineComponent({
  name: 'AppAvatar',
  props: { path: String },
  emits: ['upload', 'update:path'],
  components: { IonIcon },
  methods: {
  async  downloadImage() {
      try {
        const { data, error } = await supabase.storage
          .from('avatars')
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          .download(this.path!);
        if (error) throw error;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.avatarUrl = URL.createObjectURL(data!);
      } catch (error: any) {
        console.error('Error downloading image: ', error.message);
      }
    }
  },
  setup(prop, { emit }) {
    const avatarUrl = ref('');
    const uploadAvatar = async () => {
      try {
        const photo = await Camera.getPhoto({
          resultType: CameraResultType.DataUrl,
        });

        if (photo.dataUrl) {
          const file = await fetch(photo.dataUrl)
            .then((res) => res.blob())
            .then(
              (blob) =>
                new File([blob], 'my-file', { type: `image/${photo.format}` })
            );

          const fileName = `${Math.random()}-${new Date().getTime()}.${
            photo.format
          }`;
          let { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(fileName, file);
          if (uploadError) {
            throw uploadError;
          }
          emit('update:path', fileName);
          emit('upload');
        }
      } catch (error) {
        console.log(error);
      }
    };
    return { avatarUrl, uploadAvatar, person };
  },
  mounted() {
    this.downloadImage();
  },
});
</script>
<style>
.avatar {
  display: block;
  margin: auto;
  min-height: 150px;
}
.avatar .avatar_wrapper {
  margin: 16px auto 16px;
  border-radius: 50%;
  overflow: hidden;
  height: 150px;
  aspect-ratio: 1;
  background: var(--ion-color-step-50);
  border: thick solid var(--ion-color-step-200);
}
.avatar .avatar_wrapper:hover {
  cursor: pointer;
}
.avatar .avatar_wrapper ion-icon.no-avatar {
  width: 100%;
  height: 115%;
}
.avatar img {
  display: block;
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>