<template>
  <v-app-bar app clipped-left clipped-right color="primary" dark>
    <v-toolbar-title class="align-center d-flex">
      <span class="logo-text ml-2">
        <v-img src="@/assets/logo_100.png" class="ma-2" width="130px"/>
      </span>
      <!--span class="logo-text ml-2">
        <img src="../../assets/logo-light-text.png" class="mt-2" />
      </span-->
    </v-toolbar-title>
    <v-app-bar-nav-icon
      @click="
        $vuetify.breakpoint.smAndDown
          ? setSidebarDrawer(!Sidebar_drawer)
          : $emit('input', !value)
      "
    />
    <v-dialog v-model="dialogPerfil" max-width="500px">
      <profile-page @fechaDialogPerfil="closePerfil" @logOut="logOut">
      </profile-page>
    </v-dialog>

    <v-dialog v-model="dialogNotificacao" max-width="500px">
      <notificacao-page
        ref="notificacaoref"
        @fechaDialogNotificacao="closeNotificacao"
        @logout="logOut"
        :notificacao-id="notificacaoId" 
      >
      </notificacao-page>
    </v-dialog>

    <v-spacer />
    <!---lado direito -->
    <v-menu bottom left transition="scale-transition">
      <template v-slot:activator="{ on }">
        <v-btn dark icon v-on="on">
          <v-badge
            :color="numeroNotificacoes > 0 ? 'deep-purple accent-4' : 'transparent'"
            overlap
            :content="numeroNotificacoes"
            
          >
            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-btn>
      </template>
      <v-list>
        <template v-for="(item, i) in notificacoes">
          <v-list-item
            :key="i"
            @click.prevent="notificacaoActionClick(item.a109codreg)"
          >
            <v-list-item-icon
              ><v-icon>mdi-bell-ring</v-icon></v-list-item-icon
            >
            <v-list-item-title>{{ item.a109titmod }}</v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
    </v-menu>

    <v-menu bottom left transition="scale-transition">
      <template v-slot:activator="{ on }">
        <v-btn dark icon v-on="on">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>

      <v-list>
        <template v-for="(item, i) in userprofile">
          <v-list-item
            :key="i"
            @click.prevent="headerActionClick(item.onClick)"
          >
            <v-list-item-icon
              ><v-icon>{{ item.icon }}</v-icon></v-list-item-icon
            >
            <v-list-item-title>{{ item.titulo }}</v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
<script>
// Imports
import { mapState, mapMutations } from "vuex";
import ProfilePage from "./Profile";
import NotificacaoPage from "./Notificacao";
//import APIService from "../services/api.service";
export default {
  name: "Header",

  components: {
    "profile-page": ProfilePage,
    "notificacao-page": NotificacaoPage,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    //Notificacoes
    dialogNotificacao: false,
    notificacaoId: 0,
    notificacoes: [],
    numnot: 0,
    
    //Perfil
    dialogPerfil: false,

    userprofile: [
      {
        titulo: "Meu Perfil",
        icon: "mdi-account",
        onClick: "meu-perfil",
      },
      {
        titulo: "Preferências",
        icon: "settings",
        onClick: "preferencias",
      },

      {
        titulo: "Logout",
        icon: "logout",
        onClick: "logout",
      },
    ],
    href() {
      return undefined;
    },
  }),

  computed: {
    ...mapState(["Sidebar_drawer"]),
    currentUser() {
      return this.$store.state.auth.user;
    },

    numeroNotificacoes() {
      return this.numnot
    }
  },

  methods: {
    logOut() {
      try {
        this.dialogPerfil = false;
        this.dialogNotificacao = false;
        this.mini = false;

        if (this.currentUser) this.$store.dispatch("auth/logout");
      } catch (e) {
        alert(e.message)
      }

      this.$router.push("/login");
    },
    closePerfil() {
      this.dialogPerfil = false;
    },
    closeNotificacao() {
      this.dialogNotificacao = false;
    },
    async carregaNotificacoes() {
      this.carregando = true;
      //this.order = null;
      //this.parametrosQry = null;
  //this.parametrosQry = `usuario%&parametrosQry=${this.busca}&parametrosQry=string`;
      
      /*
//TO-DO ler da API
      {
        titulo: "Doação Recebida ",
        icon: "mdi-bell-ring",
        id: 1,
      },
      {
        titulo: "Meta atingida",
        icon: "mdi-bell-ring",
        id: 2,
      },

*/
      
      /*
      await this.$apiservice.getApiContent("fn109as", 0, "", "").then(
        (response) => {
          this.notificacoes = response.data.itens
          this.numnot =response.data.itens.length
          this.carregando = false
        },
        (error) => {
          this.content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.carregando = false;
        }
      );*/
      this.carregando = false;
    },

    ...mapMutations({
      setSidebarDrawer: "SET_SIDEBAR_DRAWER",
    }),

    headerActionClick(action) {
      switch (action) {
        case "logout":
          this.logOut();
          break;
        case "preferencias":
          this.$router.push("/preferencias");
          break;
        case "meu-perfil":
          this.dialogPerfil = true;
          break;
      }
    },

    notificacaoActionClick(id) {
      this.notificacaoId = id;
      this.dialogNotificacao = true;
    },
  },
  watch: {
    dialogPerfil(val) {
      val || this.closePerfil();
    },
    dialogNotificacao(val) {
      val || this.closeNotificacao();
    },

    "$vuetify.breakpoint.smAndDown"(val) {
      this.$emit("update:expandOnHover", !val);
    },
  },
  mounted() {
    this.carregaNotificacoes();
  },
};
</script>
