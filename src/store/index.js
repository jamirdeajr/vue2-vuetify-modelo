import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from "./auth.module";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Sidebar_drawer: null,
        Customizer_drawer: true,
        SidebarColor: 'white',
        SidebarBg: '',

        UsuarioBuscaPerfil:'',
        UsuarioBuscaNome:'',
        UsuarioBuscaStatus:''
  },
  mutations: {
    //Guardar parametros sidebar 
    SET_SIDEBAR_DRAWER (state, payload) {
        state.Sidebar_drawer = payload
    },
    SET_CUSTOMIZER_DRAWER (state, payload) {
      
        state.Customizer_drawer = payload
    },
    SET_SIDEBAR_COLOR (state, payload) {
        state.SidebarColor = payload
    },
    
    //Guardar ultimo filtro utilizado 
    USUARIO_BUSCA_PERFIL (state, payload) {
      state.UsuarioBuscaPerfil = payload;
    },
    USUARIO_BUSCA_NOME (state, payload) {
      state.UsuarioBuscaNome = payload;
    },
    USUARIO_BUSCA_STATUS (state, payload) {
      state.UsuarioBuscaStatus = payload;
    }
  },
  actions: {
  },
  modules: {
    auth
  }
})

