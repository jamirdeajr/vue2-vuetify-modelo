<template>
  <v-app >
    <q-header v-model="expandOnHover"></q-header>
    <q-sidebar :expand-on-hover.sync="expandOnHover"></q-sidebar>
    <v-main>
      <breadcrumbs></breadcrumbs>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex"

export default {
  name: "Layout",
  props: {
    //source: String,
  },
  data() {
    return {
      expandOnHover: false,
      
      mini: false,
      linksDinamicos: [], //Carrega API
      links: [
        { title: "Dashboard", icon: "mdi-view-dashboard", route: "/dashboard" },
        { title: "Video", icon: "mdi-movie", route: "/video" },
        /*{ title: "Chart", icon: "mdi-chart-bar", route: "/chart" },
        { title: "Usuarios", icon: "mdi-account-multiple", route: "/usuarios" },
        {
          title: "Modelo Data Table",
          icon: "mdi-grid",
          route: "/modeloDataTable",
        },*/
      ],
      right: null,
      dark: true,
    };
  },

  computed: {
    ...mapState(["Customizer_drawer"]),

    currentUser() {
      return this.$store.state.auth.user;
    },
  },

  methods: {
    ...mapMutations({
      setCustomizerDrawer: "SET_CUSTOMIZER_DRAWER",
    }),
  },

};
</script>
