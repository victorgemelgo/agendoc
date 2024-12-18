<template>
  <header class="flex flex-center">
    <strong class="text-white">{{titulo}}</strong>
  </header>
</template>

<script setup>
  import { defineOptions, defineProps } from 'vue';
  defineOptions({
    name: 'HomeHeader',
  });

  defineProps({
    titulo: {
        type: String,
        default: ''
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/css/quasar.variables.scss';
  header {
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #bebebe;
    font-size: large;
    background-color: $primary;
  }
</style>
