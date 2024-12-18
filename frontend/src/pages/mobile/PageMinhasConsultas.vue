<template>
    <q-page class="column justify-between">
        <h1>Minhas consultas</h1>
        <HomeFooter page-active="minhas-consultas" />
    </q-page>
</template>

<script setup>

import { defineOptions } from 'vue';

import HomeFooter from 'src/components/mobile/HomeFooter.vue';
defineOptions({
    name: 'PageMinhasConsultas',
});

</script>