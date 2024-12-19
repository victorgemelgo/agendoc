<template>
  <q-page class="column justify-between">
    <HomeHeader titulo="Home" />
    <div style="flex: 1">
      <div class="row flex-center q-mt-lg"></div>

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
            :options="listaCidades"
            v-model="cidade"
          />

          <span class="inline-block q-ml-sm q-mt-md"
            >Encontrar um especialista</span
          >
          <InputText
            placeholder="Busque por nome ou especialidade"
            style="margin-top: 10px"
            v-model="especialista"
            @keyup="buscarEspecialista"
          />
        </div>
      </div>

      <q-btn label="Buscar cidades" @click="buscarCidade"></q-btn>

      <div class="row flex-center q-mt-sm">
        <div class="col-11 cards-section">
          <CardList
            v-for="especialista in listaDeEspecialistas"
            :key="especialista.id"
            :card-name="especialista.nome"
            :card-description="especialista.especialidades"
          />
          <br /><br />
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
  import { listaMedico } from 'src/services/medico';
  import { useRouter } from 'vue-router';
  import { route } from 'quasar/wrappers';
  import axios from 'axios';
  const router = useRouter();
  const usuarioStore = useUsuarioStore();

  //COMPONENTS
  import LogoAzul from 'src/components/mobile/LogoAzul.vue';
  import SelectForm from 'src/components/mobile/SelectForm.vue';
  import InputText from 'src/components/mobile/InputText.vue';
  import HomeFooter from 'src/components/mobile/HomeFooter.vue';
  import HomeHeader from 'src/components/mobile/HomeHeader.vue';
  import CardList from 'src/components/mobile/CardList.vue';
  import { estados } from 'src/assets/js/estados';
  defineOptions({
    name: 'PageHome',
  });

  //DATA
  const estado = ref('');
  const cidade = ref('');
  const listaCidades = ref([]);
  const especialista = ref('');
  const listaDeEspecialistas = ref([]);

  const usuario = usuarioStore.usuario;

  const buscarEspecialista = async () => {
    if (especialista.value.length > 3) {
      const response = await listaMedico(especialista.value);
      listaDeEspecialistas.value = response;
      //O BLOCO ABAIXO REMOVE OS COLCHETES E ASPAS DO JSON NA PARTE DE ESPECIALIDADES
      for (let i = 0; i < listaDeEspecialistas.value.length; i++) {
        listaDeEspecialistas.value[i].especialidades =
          listaDeEspecialistas.value[i].especialidades.replace(/[\[\]"]+/g, '');
      }
      //===================================================
    }
  };

  //====================================================
  //O Metodo abaixo busca as cidades
  const buscarCidade = async () => {
    try {
      const response = await axios.get(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados/SP/municipios'
      );
      
      response.data.forEach(cidade => {
        listaCidades.value.push(cidade.nome);
      });

    } catch (error) {
      console.log(error);
    }
  };

  const logoff = () => {
    if (logout()) router.push('/');
  };

  onMounted(() => {
    verifyFirstAccess() ? router.push('/primeiro-acesso') : '';
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
