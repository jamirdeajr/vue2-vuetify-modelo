<template>
<v-card elevation="0">
  <v-breadcrumbs :items="breadcrumbList"
    ><!-- divider=">"-->
    <template v-slot:divider>
      <v-icon>mdi-forward</v-icon>
    </template>
    <template v-slot:item="props">
      <router-link :to="props.item.link" v-if="props.item.link">
        <v-breadcrumbs-item>
          {{ props.item.name }}
        </v-breadcrumbs-item>
      </router-link>
      <v-breadcrumbs-item v-if="!props.item.link">
        {{ props.item.name }}
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</v-card>
</template>

<script>
export default {
  data() {
    return {
      breadcrumbList: [{}],
    };
  },

  watch: {
    $route() {
      this.breadcrumbList = this.$route.meta.breadcrumb;
    },
  },

  /**
   * @see https://medium.com/@pratheekhegde/displaying-application-breadcrumbs-in-vue-js-85456dc8a370
   */
  /*
    computed: {
    breadCrumbs() {
      let pathArray = this.$route.path.split("/");
      pathArray.shift();
      const breadCrumbs = [];
      // needed to handle the intermediary entries for nested vue routes
      let breadcrumb = "";
      let lastIndexFound = 0;
      for (let i = 0; i < pathArray.length; ++i) {
        breadcrumb = `${breadcrumb}${"/"}${pathArray[i]}`;
        if (
          this.$route.matched[i] &&
          Object.hasOwnProperty.call(this.$route.matched[i], "meta") &&
          Object.hasOwnProperty.call(this.$route.matched[i].meta, "breadCrumb")
        ) {
          breadCrumbs.push({
            href:
              i !== 0 && pathArray[i - (i - lastIndexFound)]
                ? "/" + pathArray[i - (i - lastIndexFound)] + breadcrumb
                : breadcrumb,
            disabled: i + 1 === pathArray.length,
            text: this.$route.matched[i].meta.breadCrumb || pathArray[i],
          });
          lastIndexFound = i;
          breadcrumb = "";
        }
      }
      return breadCrumbs;
    },},*/
};
</script>

<style>
.breadcrumbs .link {
  text-decoration: none;
  color: #737373;
  font: bold 24px Sans-Serif;
  letter-spacing: -1px;
  white-space: nowrap;
  display: inline-block;
  position: relative;
}
</style>
