import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/contatos",
      name: "contatos",
      component: () => import("./components/ContatosList"),
    },
    {
      path: "/contatos/:id",
      name: "contato-details",
      component: () => import("./components/Contato"),
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddContato"),
    },
  ],
});
