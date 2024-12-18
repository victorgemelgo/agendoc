<template>
    <header class="">
        <h5>{{title}}</h5>
        <img :src="image" alt="">
        <p class="subtitle">{{subtitle}}</p>
        <p class="subtitle-small">{{subtitleSmall}}</p>
    </header>
</template>

<script setup>

    import { defineOptions } from 'vue';
    defineOptions({
        name: 'InfoHeader',
    });

    defineProps({
        title: {
            type: String,
            default: 'Titulo',
        },
        image:{
            type: String,
            default: 'src/assets/img/logo-branco.png',
        },
        subtitle: {
            type: String,
            default: 'Subtitulo',
        },
        subtitleSmall: {
            type: String,
            default: 'Small Subtitulo',
        },
    });

</script>

<style lang="scss" scoped>
@import 'src/css/quasar.variables.scss';
    header {
        background-color: $primary;
        height: 200px;
        color: #fff;
        padding: 10px;
        text-align: center;
    }

    h5{
        margin-top: 10px;
        margin-bottom: 1px;
    }

    .subtitle{
        margin-top: -10px;
    }
    .subtitle-small{
        margin-top: -15px;
        font-size: 10px;
        color: $text-dark-grey;
    }
    img{
        width: 100px;
    }
</style>