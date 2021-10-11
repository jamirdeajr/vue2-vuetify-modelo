<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">Notificação</span>
    </v-card-title>

    <v-container v-if="currentUser">
      <p><strong>Id da Notificação:</strong>{{ notificacaoId }}</p>

      
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click.prevent="fechaDialogNotificacao">
          Fechar
        </v-btn>
      </v-card-actions>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "Notificacao",
  props: ['notificacaoId'],//Vem na declaracao do componente no parent
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
    fechaDialogNotificacao() {
      this.$emit("fechaDialogNotificacao", "parent");
    },


  },
};
</script>
