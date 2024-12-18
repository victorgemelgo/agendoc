import { defineStore } from 'pinia';

export const useUsuarioStore = defineStore('usuario', {
  state: () => ({
    usuario: null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.usuario,
  },
  actions: {
    login(usuario) {
      this.usuario = usuario;
    },
    logout() {
      this.usuario = null;
    },
  },
});