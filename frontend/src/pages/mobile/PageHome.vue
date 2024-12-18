<template>
  <q-page class="column justify-between">
    <HomeHeader titulo="Home" />
    <div style="flex: 1">
      <div class="row flex-center q-mt-lg">
        
      </div>

      <div class="row flex-center q-mt-sm">
        <div class="col-11">
          <span class="inline-block q-ml-sm">Selecione o Estado</span>
          <SelectForm
            label="Selecione o Estado"
            :options="estados"
            v-model="estado"
          />

          <span class="inline-block q-ml-sm q-mt-md">Selecione a Cidade</span>
          <SelectForm
            label="Selecione a Cidade"
            :options="estados"
            v-model="estado"
          />

          <span class="inline-block q-ml-sm q-mt-md"
            >Encontrar um especialista</span
          >
          <InputText
            placeholder="Busque por nome ou especialidade"
            style="margin-top: 10px"
            v-model="especialidade"
            @keyup="listaMedico(especialidade)"
          />
        </div>
      </div>

      <div class="row flex-center q-mt-sm">
        <div class="col-11 cards-section">
          <CardList
            card-name="Dra Dollitle1"
            card-description="Cardiologista"
          />
          <CardList
            card-name="Dra Dollitle1"
            card-description="Cardiologista"
          />
          <CardList
            card-name="Dra Dollitle1"
            card-description="Cardiologista"
          />
          <CardList
            card-name="Dra Dollitle1"
            card-description="Cardiologista"
          />
          <CardList
            card-name="Dra Dollitle1"
            card-description="Cardiologista"
          />
          <CardList
            card-name="Dra Dollitle1"
            card-description="Cardiologista"
          />
          <CardList
            card-name="Dra Dollitle1"
            card-description="Cardiologista"
          />
          <CardList
            card-name="Dra Dollitle1"
            card-description="Cardiologista"
          />
          <CardList
            card-name="Dra Dollitle44"
            card-description="Cardiologista"
          />
          <br><br>
        </div>
      </div>
    </div>

    <home-footer page-active="home" />
  </q-page>
</template>

<script setup>
  import { defineOptions, onMounted, ref } from 'vue';
  import { useUsuarioStore } from 'src/stores/usuario-store';
  import { verifyFirstAccess, logout } from 'src/services/auth';
  import { listaMedico, notifica } from 'src/services/medico';
  import { useRouter } from 'vue-router';
  import { route } from 'quasar/wrappers';
  const router = useRouter();
  const usuarioStore = useUsuarioStore();

  //COMPONENTS
  import LogoAzul from 'src/components/mobile/LogoAzul.vue';
  import SelectForm from 'src/components/mobile/SelectForm.vue';
  import InputText from 'src/components/mobile/InputText.vue';
  import HomeFooter from 'src/components/mobile/HomeFooter.vue';
  import HomeHeader from 'src/components/mobile/HomeHeader.vue';
  import CardList from 'src/components/mobile/CardList.vue';
  defineOptions({
    name: 'PageHome',
  });

  //DATA
  const especialidade = ref('');

  const usuario = usuarioStore.usuario;

  const logoff = () => {
    if (logout()) router.push('/');
  };

  onMounted(() => {
    verifyFirstAccess() ? router.push('/primeiro-acesso') : '';
    notifica();
  });
</script>

<style scoped>
  .q-page {
    height: 100vh; /* Ocupa toda a altura da janela */
    overflow: hidden; /* Remove o scroll vertical */
  }
  .cards-section {
    max-height: calc(60vh - 60px); /* Ajuste para deixar espaço para o footer */
    overflow-y: auto; /* Permite scroll interno se necessário */
  }
</style>
