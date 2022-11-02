<template>
  <div class="mr-6">
    <ion-thumbnail>
      <img :src="imageUrl" :alt="alt" />
    </ion-thumbnail>
  </div>
</template>
<script lang="ts">
import { supabase } from "@/supabase/supabase.config";
import { IonThumbnail } from "@ionic/vue";
import { defineComponent, ref } from "vue";
import missingImage from "@/assets/img/no_image_available.jpeg";

export default defineComponent({
  name: "thumbnailPart",
  components: {
    IonThumbnail,
  },
  props: {
    image: String,
    alt: String,
  },
  setup() {
    const imageUrl = ref('');
    /**
     *
     */
    const downloadImage = async (path: any) => {
      if (!path) {
        imageUrl.value = missingImage;
        return;
      }
      const { data, error } = await supabase.storage
        .from("products-photo")
        .download(path);
      if (error) throw error;
      imageUrl.value = URL.createObjectURL(data);
    };

    return {
      imageUrl,
      downloadImage
    };
  },
  mounted() {
    this.downloadImage(this.image)
    
  }
});
</script>
