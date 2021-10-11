import Vue from "vue";
import Router from "vue-router";
//import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
// lazy-loaded
const Profile = () => import("../components/Profile.vue");

//Usuarios
//const Usuarios = () => import("../pages/usuarios/Index.vue");
//const UsuarioEdit = () => import("../pages/usuarios/EditPage.vue");
//const UsuarioEditCards = () => import("../pages/usuarios/EditPageCards.vue");

//Dashboard
const Dashboard = () => import("./../pages/Dashboard.vue");
//Charts
const Chart = () => import("./../pages/Chart.vue");
//Calendario
const Calendario = () => import("./../pages/Calendario.vue");
//Video
const Video = () => import("./../pages/Video.vue");


Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "home",
    component: Dashboard,
    meta: {
      breadcrumb: [{ name: "Home" }],
    },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: {
      breadcrumb: [{ name: "Home" }],
    },
  },
  {
    path: "/video",
    name: "video",
    component: Video,
    meta: {
      breadcrumb: [{ name: "Home" }],
    },
  },
  {
    path: "/home",
    component: Dashboard,
    meta: {
      breadcrumb: [{ name: "Home" }],
    },
  },
  {
    path: "/chart",
    component: Chart,
    meta: {
      breadcrumb: [{ name: "Home", link: "/home" }, { name: "Chart" }],
    },
  },
  {
    path: "/calendario",
    component: Calendario,
    meta: {
      breadcrumb: [{ name: "Home", link: "/home" }, { name: "Calendário" }],
    },
  },
  {
    path: "/login",
    component: Login,
    meta: {
      breadcrumb: [{ name: "Login" }],
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: {
      breadcrumb: [{ name: "Home", link: "/home" }, { name: "Perfil" }],
    },
  },

  /*
  //Usuarios
  {
    path: "/usuarios",
    name: "usuarios",
    component: Usuarios,
    meta: {
      breadcrumb: [{ name: "Home", link: "/home" }, { name: "Usuários" }],
    },
  },
  
  {
    path: "/usuarios/edit/:id",
    name: "usuario_edit",
    component: UsuarioEdit,
    meta: {
      breadcrumb: [
        { name: "Home", link: "/home" },
        { name: "Usuários", link: "/usuarios" },
        { name: "Editar Usuário" },
      ],
    },
  },
  {
    path: "/usuarios/editcards/:id",
    name: "usuario_editcards",
    component: UsuarioEditCards,
    meta: {
      breadcrumb: [
        { name: "Home", link: "/home" },
        { name: "Usuários", link: "/usuarios" },
        { name: "Editar Usuário (Cards)" },
      ],
    },
  },
  //Modulos
  {
    path: "/modulos",
    name: "modulos",
    component: Modulos,
    meta: {
      breadcrumb: [{ name: "Home", link: "/home" }, { name: "Módulos" }],
    },
  },
  {
    path: "/modulos/edit/:id",
    name: "modulo_edit",
    component: ModuloEdit,
    meta: {
      breadcrumb: [
        { name: "Home", link: "/home" },
        { name: "Módulos", link: "/modulos" },
        { name: "Editar Módulo" },
      ],
    },
  },
  
  */
];

const router = new Router({
  routes,
  mode: "history", // Para não fazer append /#/
});

//Verifica sempre se autorizado o acesso
router.beforeEach((to, from, next) => {
  // Fase de teste, liberadas as rotas comuns
  const publicPages = ["/login", "/home"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;
