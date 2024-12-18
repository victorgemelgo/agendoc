<template>
  <q-btn
    color="primary"
    :label="label"
    type="button"
  />
</template>

<script setup>

    defineOptions({
        name: 'BtnForm'
    })

    defineProps({
        label: {
            type: String,
            required: true
        }
    })
</script>

<style scoped>

    .q-btn {
        width: 100%;
        margin-top: 20px;
    }

</style>