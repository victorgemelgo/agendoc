<template>
  <q-select
    outlined
    :label="label"
    dense
    :options="options"
    style="margin-top: 10px"
    transition-show="flip-up"
    transition-hide="flip-down"
  />
</template>

<script setup>
  defineOptions({
    name: 'SelectForm',
  });

  defineProps({
    options: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
    },
  });
</script>
