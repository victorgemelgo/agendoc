<template>
  <div class="card row items-center">
    <div class="card-avatar col-3">
      <img
        src="../../assets/img/medico-mulher.png"
        alt=""
      />
    </div>
    <div class="card-info col-8">
      <div class="card-info-name">
        <Strong>{{ cardName }}</Strong>
      </div>
      <div class="card-info-description text-secondary">
        <span>{{ cardDescription }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { defineOptions, defineProps } from 'vue';
  defineOptions({
    name: 'CardList',
  });

  defineProps({
    cardName: {
      type: String,
      default: '',
    },
    cardDescription: {
      type: String,
      default: '',
    },
  });
</script>

<style scoped>
  .card {
    border: 1px solid #bebebe;
    height: 71px;
    border-radius: 5px;
    margin-top: 10px;
  }

  .card-info-name {
    font-size: 14pt;
  }

  img {
    width: 64px;
    height: 56px;
  }
</style>
