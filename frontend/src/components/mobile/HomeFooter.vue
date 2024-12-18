<template>
  <footer class="flex justify-around q-pa-sm">
    <div
      class="icon"
      @click="navigateTo('home')"
    >
      <q-icon
        name="home"
        size="60px"
        :class="{ active: pageActive === 'home' }"
        color="grey-6"
      />
    </div>
    <div
      class="icon"
      @click="navigateTo('minhas-consultas')"
    >
      <q-icon
        name="event"
        size="60px"
        :class="{ active: pageActive === 'minhas-consultas' }"
        color="grey-6"
      />
    </div>
    <div class="icon">
      <q-icon
        name="person"
        size="60px"
        color="grey-6"
        :class="{ active: pageActive === 'meu-perfil' }"
        @click="navigateTo('meu-perfil')"
      />
    </div>
  </footer>
</template>

<script setup>
  import { defineOptions, defineProps } from 'vue';
  import { useRouter, useRoute } from 'vue-router';

  const router = useRouter();
  defineOptions({
    name: 'HomeFooter',
  });

  defineProps({
    pageActive: {
      type: String,
      default: 'home',
    },
  });

  //metodos

  const navigateTo = (routeName) => {
    router.push(routeName);
  };

  //LIFECYCLE HOOKS
</script>

<style lang="scss" scoped>
  @import 'src/css/quasar.variables.scss';

  .active {
    color: $primary !important;
  }
  footer {
    border-top: 1px solid gray;
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #fff;
  }


</style>
