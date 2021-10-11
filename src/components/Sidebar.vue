<template>
  
  <v-navigation-drawer
    v-if="currentUser"
    v-model="Sidebar_drawer"
    :dark="SidebarColor !== 'white'"
    :mini-variant.sync="mini"
    mobile-breakpoint="960"
    clipped
    :right="$vuetify.rtl"
    mini-variant-width="70"
    :expand-on-hover="expandOnHover"
    app
    id="main-sidebar"
  ><!-- :color="SidebarColor"   :dark="SidebarColor !== 'white'"-->
    <v-list class="v-breadcrumbs">
      <v-list-item>
        <v-list-item-content >
          <v-list-item-title v-if="!mini" class="title">Menu</v-list-item-title>
          <v-list-item-title v-if="mini" class="title">.</v-list-item-title>
        </v-list-item-content>
        <v-spacer/>
        <v-list-item-content >
          <v-btn
            icon
            v-if="!mini"
            @click="toggleTheme()"
          >
            <v-icon small v-if="!$vuetify.theme.dark" class="mr-1" color="blue-grey darken-4"
              >mdi-moon-waxing-crescent</v-icon
            >
            <v-icon small v-if="$vuetify.theme.dark" class="mr-1" color="white darken-3">mdi-white-balance-sunny</v-icon>

            
          </v-btn>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  
    <v-divider></v-divider>
    <v-list dense nav>
      <v-list-item
        v-for="link in links"
        :key="link.title"
        router
        :to="link.route"
        :active-class="`info white--text`"
      >
        <v-list-item-icon>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ link.title }}</v-list-item-title>

        <v-list-item-action> </v-list-item-action>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>
    <!-- Menu dinamico -->

    <v-list dense nav>
      <template v-for="(linkDin,i) in linksDinamicos">
        <v-list-group
          v-if="linkDin.tipo == 'SM' && linkDin.nivel == 1"
          :key="i"
          :prepend-icon="
            linkDin.icon && linkDin.tipo == 'SM' && linkDin.nivel == 1
              ? 'mdi-' + linkDin.icon
              : ''
          "
          no-action
          :active-class="`info white--text`"
        >
          <template v-slot:activator>
            <v-list-item-content
              v-if="linkDin.tipo == 'SM' && linkDin.nivel == 1"
            >
              <v-list-item-title v-text="linkDin.titulo" />
            </v-list-item-content>
          </template>

          <template v-for="(linkDin2,i) in linksDinamicos">
            <v-list-item
              :key="i"
              v-if="
                linkDin2.tipo == 'C' &&
                  linkDin2.nivel == 2 &&
                  linkDin2.seqgrp == linkDin.seqopc
              "
              @click="menuActionClick(linkDin2.route)"
              :active-class="`info white--text`"
            >
              <v-list-item-title v-text="linkDin2.titulo" />
              <v-list-item-icon v-if="linkDin2.icon">
                <v-icon>mdi-{{ linkDin2.icon }}</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </template>
        </v-list-group>

        <v-list-item
          :key="linkDin.id"
          v-if="
            linkDin.tipo == 'C' &&
              linkDin.nivel == 1 &&
              linkDin.seqgrp == linkDin.seqopc
          "
          @click="menuActionClick(linkDin.route)"
          :active-class="`info white--text`"
        >
          <template v-if="linkDin.tipo == 'C' && linkDin.nivel == 1">
            <v-list-item-icon v-if="linkDin.icon">
              <v-icon>mdi-{{ linkDin.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-title v-text="linkDin.titulo" />
          </template>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";
//import APIService from "@/services/api.service";

export default {
  name: "Sidebar",
  props: {
    expandOnHover: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      carregando: true,
      mini: false,//Ver como identificar o mini deste tema, declarado só para não dar erro!
      linksDinamicos: [], //Carrega API
      links: [
        { title: "Dashboard", icon: "mdi-view-dashboard", route: "/dashboard" },
        { title: "Video", icon: "mdi-movie", route: "/video" },
        /*{ title: "Gráficos", icon: "mdi-chart-bar", route: "/chart" },
        { title: "Calendário", icon: "mdi-calendar", route: "/calendario" },
        { title: "Usuários", icon: "mdi-account-multiple", route: "/usuarios" },
        { title: "Perfis", icon: "mdi-face-man-profile", route: "/perfis" },
        { title: "Módulos", icon: "mdi-view-module", route: "/modulos" },
        { title: "Módulos maxiNET - Configurações", icon: "mdi-cog", route: "/fn109bs" },
        { title: "Autoridades", icon: "mdi-folder-lock", route: "/fn140us" },
        { title: "Bases de Dados", icon: "mdi-database", route: "/fn096us" },*/
        /*
        { title: "fn142us", icon: "mdi-view-module", route: "/fn142us" },
        { title: "fn109as", icon: "mdi-view-module", route: "/fn109as" },
        { title: "fn005us", icon: "mdi-view-module", route: "/fn005us" },*/
        
        /*{
          title: "Modelo Data Table",
          icon: "mdi-grid",
          route: "/modeloDataTable",
        },*/
      ],
      right: null,
      dark: true,
      dialogPerfil: false,
    };
  },
  computed: {
    ...mapState(["SidebarColor", "SidebarBg"]),
    Sidebar_drawer: {
      get() {
        return this.$store.state.Sidebar_drawer;
      },
      set(val) {
        this.$store.commit("SET_SIDEBAR_DRAWER", val);
      },
    },
    currentUser() {

      return this.$store.state.auth.user;
    },
  },
  watch: {
    "$vuetify.breakpoint.smAndDown"(val) {
      this.$emit("update:expandOnHover", !val);
    },
  },

  methods: {
    async carregaMenuDinamico() {
      this.carregando = true
      await this.$apiservice.getMenu().then(
        (response) => {

        

          this.linksDinamicos = response.data.itens
          
        },
        (error) => {
          this.content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      ).finally(() => { this.carregando = false
      })

      
    },
    toggleTheme() {
      
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      localStorage.setItem(
        "theme", this.$vuetify.theme.dark ? "dark" : "light"
      );
    },
    menuActionClick(action) {
      this.$router.push(action);
    },
    
  },
  mounted() {
    this.carregaMenuDinamico();
  },
};
</script>
<style lang="scss">
#main-sidebar {
  box-shadow: 1px 0 20px rgba(0, 0, 0, 0.08);
  -webkit-box-shadow: 1px 0 20px rgba(0, 0, 0, 0.08);
  .v-navigation-drawer__border {
    display: none;
  }
  .v-list {
    padding: 8px 15px;
  }
  .v-list-item {
    &__icon--text,
    &__icon:first-child {
      justify-content: center;
      text-align: "center";
      width: 20px;
    }
  }
}
</style>
