<template>
  <q-page class="column justify-between">
    <h1>Meu perfil</h1>
    <HomeFooter page-active="meu-perfil" />
  </q-page>
</template>

<script setup>
  import { defineOptions } from 'vue';
  import HomeFooter from 'src/components/mobile/HomeFooter.vue';
  defineOptions({
    name: 'PageMeuPerfil',
  });
</script>
