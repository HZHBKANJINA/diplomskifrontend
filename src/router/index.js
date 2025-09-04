import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ClubView from '../views/ClubView.vue'
import MatchView from '../views/MatchView.vue'
import TableView from '../views/TableView.vue'

const routes = [
  {
    path:'/',
    name:'LoginView',
    component:LoginView,
    meta: { public: true }
  },
  {
    path: '/pocetna',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/onama',
    name: 'AboutView',
    component:AboutView
  },
  {
    path:'/registracija',
    name:'RegisterView',
    component:RegisterView,
    meta: { public: true }
  },
  {
    path:'/klubovi',
    name:'ClubView',
    component:ClubView
  },
  {
    path:'/susreti',
    name:'MatchView',
    component:MatchView
  },
  {
    path:'/tablica',
    name:'TableView',
    component:TableView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const publicRoutes = ['/', '/registracija'];

  if (!token && !publicRoutes.includes(to.path)) {
    // nije prijavljen i pokušava do zaštićene rute
    return next('/');
  }

  if (token && publicRoutes.includes(to.path)) {
    // već je prijavljen pa ga preusmjeri sa login/registracija na pocetnu
    return next('/pocetna');
  }

  // sve ostalo je dozvoljeno
  next();
});


export default router
