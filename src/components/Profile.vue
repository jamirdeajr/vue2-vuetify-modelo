<template>
  <v-card class="mx-auto" v-if="currentUser">
    <v-card-title>
      <span class="text-h5">Perfil</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <p><strong>Usuário:</strong>{{ currentUser.username }}</p>
        <p>
          <strong>Token:</strong>
          {{ currentUser.token.substring(0, 20) }} ...
          {{ currentUser.token.substr(currentUser.token.length - 20) }}
        </p>
        <p>
          <strong>Id:</strong>
          {{ currentUser.id }}
        </p>

        <strong>Propriedades adicionais:</strong>
        <ul>
          <li v-for="(prop, i) in currentUser.addicionalProperties" :key="i">
            {{ StringProp(prop) }}
          </li>
        </ul>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click.prevent="fechaDialogPerfil">
        Cancelar
      </v-btn>
      <v-btn color="error" @click.prevent="logOut">
        Sair
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Perfil",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
  methods: {
    //Avisa o parent para fechar a janela, ver ref= e @ no dialog
    fechaDialogPerfil() {
      this.$emit("fechaDialogPerfil", "parent");
    },
    logOut() {
      this.$emit("logOut", "parent");
    },

    StringProp(prop) {
      try {
        let perfil = prop.perfil;

        return "Perfil:" + perfil;
      } catch (e) {
        alert(e.message);
      }
    },
  },
};
</script>
