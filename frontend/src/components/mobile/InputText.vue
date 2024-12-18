<template>
  <q-input
    outlined
    :placeholder="placeholder"
    dense
  ></q-input>
</template>

<script setup>
  defineOptions({
    name: 'InputText',
  });

  const props = defineProps({
    placeholder: {
      type: String,
      required: true,
    },
  });
</script>

<style scoped>
  .q-input {
    margin-top: 20px;
  }

  .input-error {
    border: 1px solid red !important;
  }
</style>
