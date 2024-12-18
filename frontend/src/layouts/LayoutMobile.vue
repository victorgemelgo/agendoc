<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
  import { ref } from 'vue';

  export default {
    name: 'LayoutMobile',
    setup() {
      const leftDrawerOpen = ref(false);

      return {
        leftDrawerOpen,
        toggleLeftDrawer() {
          leftDrawerOpen.value = !leftDrawerOpen.value;
        },
      };
    },
  };
</script>

<style scoped>
  .q-toolbar {
    min-height: 50px;
  }
</style>
