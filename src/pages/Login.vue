<template>
  <v-dialog v-model="dialogLogin" max-width="500px">
    <v-card>
      <validation-observer ref="observer" v-slot="{ invalid }">
        <form @submit.prevent="login">
          <v-card>
            <v-app-bar flat color="info">
              <!--v-card-title >
              <span class="text-h5">Login</span>
            </v-card-title-->

              <v-toolbar-title class="text-h6 white--text pl-0">
                Login
              </v-toolbar-title>
            </v-app-bar>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <validation-provider
                      v-slot="{ errors }"
                      name="Usuário"
                      rules="required|max:20"
                    >
                      <v-text-field
                        ref="usernameLogin"
                        v-model="user.username"
                        :counter="20"
                        :error-messages="errors"
                        label="Usuário"
                        required
                        prependIcon="mdi-account"
                        :autofocus="true"
                      ></v-text-field>
                    </validation-provider>
                  </v-col>
                  <v-col cols="12">
                    <validation-provider
                      v-slot="{ errors }"
                      name="Senha"
                      rules="required|max:20"
                    >
                      <v-text-field
                        v-model="user.password"
                        label="Senha"
                        :error-messages="errors"
                        :counter="20"
                        required
                        prependIcon="mdi-key"
                        v-on:keyup.enter="login"
                        :append-icon="showpass ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showpass ? 'text' : 'password'"
                        @click:append="showpass = !showpass"
                      ></v-text-field>
                    </validation-provider>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <!--div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>-->

                    <v-alert v-if="message" dense type="warning">{{
                      message
                    }}</v-alert>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="clear">
                Limpar
              </v-btn>
              <v-btn color="success" @click="login" :disabled="invalid">
                Login
              </v-btn>
            </v-card-actions>
          </v-card>
        </form>
      </validation-observer>
    </v-card>
  </v-dialog>
</template>

<script>
import { required, digits, email, max, regex } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("digits", {
  ...digits,
  _message: "{_field_} precisa ter ao menos {length} caracteres. ({_value_})",
  get message() {
    return this._message;
  },
  set message(value) {
    this._message = value;
  },
});
extend("required", {
  ...required,
  message: "{_field_} não pode ser vazio",
});
extend("max", {
  ...max,
  message: "{_field_} não pode ser maior que {length} caracteres",
});
extend("regex", {
  ...regex,
  message: "{_field_} {_value_} não atende padrão {regex}",
});
extend("email", {
  ...email,
  message: "e-mail precisa ser válido",
});

export default {
  name: "Login",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      loading: false,
      message: "",
      dialogLogin: true,
      errors: {},
      showpass: false,

      user: {
        username: "",
        password: "",
      },
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/dashboard");
    }
  },
  methods: {
    clear() {
      this.message = "";
      this.user.username = "";
      this.user.password = "";
      this.$refs.observer.reset();
      this.$refs["usernameLogin"].focus();
    },

    login() {
      this.message = "";
      this.$refs.observer.validate();
      this.handleLogin(this.user);
    },

    handleLogin(user) {
      this.loading = true;

      this.$store.dispatch("auth/login", user).then(
        () => {
          //Ao logar vai para pagina...
          this.$router.push("/dashboard");
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.errors = this.message;
        }
      );
    },
  },
};
</script>
