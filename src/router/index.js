// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Home",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
      },
      {
        path: "/reportes/:reportType",
        name: "Report",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Report.vue"),
      },
      {
        path: "/userform",
        name: "UserForm",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/UserForm.vue"),
      },
      {
        path: "/img-viewer/:imgUrl",
        name: "ViewImg",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/ImgView.vue"),
      },
    ],
    meta: { requiresAuth: true }, // Add meta field for authentication requirement
  },
  {
    path: "/login",
    component: () => import(/* webpackChunkName: "home" */ "@/views/Login.vue"),
    meta: { requiresAuth: false }, // Set requiresAuth to false for the login route
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
// Navigation guard
router.beforeEach((to, from, next) => {
  const pToken = localStorage.getItem("token");
  const isAuthenticated = pToken !== null;
  console.log(to.meta.requiresAuth);
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login"); // Redirect to the login page if the route requires authentication and the user is not authenticated
  } else {
    next(); // Proceed to the next route
  }
});
export default router;
