import { getToken } from 'src/services/auth';

const routes = [
  {
    path: '/admin',
    component: () => import('layouts/LayoutWeb.vue'),
    children: [
      { path: '', component: () => import('pages/web/PageDashboard.vue') },
    ],
    meta: {
      mode: 'web',
    },
  },

  {
    path: '/',
    component: () => import('layouts/LayoutMobile.vue'),
    children: [
      {
        path: 'home',
        component: () => import('pages/mobile/PageHome.vue'),
        meta: { requiresAuth: true },
      },
      { path: '', component: () => import('pages/mobile/PageLogin.vue') },
      {
        path: 'cadastro',
        component: () => import('pages/mobile/PageCadastro.vue'),
      },
      {
        path: 'primeiro-acesso',
        component: () => import('pages/mobile/PagePrimeiroAcesso.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'minhas-consultas',
        component: () => import('pages/mobile/PageMinhasConsultas.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'meu-perfil',
        component: () => import('pages/mobile/PageMeuPerfil.vue'),
        meta: { requiresAuth: true },
      }
    ],
    meta: {
      mode: 'mobile',
    },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
