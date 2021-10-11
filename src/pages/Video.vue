<template>
  <v-container fluid class="down-top-padding">
    <div class="player-container">

      <vue-core-video-player
        :src="require('@/assets/sample_960x400_ocean_with_audio.mp4')"
      ></vue-core-video-player>
      <!--vue-core-video-player
        :src="require('@/assets/sparkle_your_name_am360p.mp4')"
      ></vue-core-video-player-->
    </div>
  </v-container>
</template>
<script src="./dist/vue-core-vide-player.umd.min.js"></script>
<script>
/* Colocamos no main.js
import Vue from "vue";
import VueCoreVideoPlayer from "vue-core-video-player";

Vue.use(VueCoreVideoPlayer);*/

export default {
  data() {
    return {
      name: "Home",
      content: "",
    };
  },
};
</script>
