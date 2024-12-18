<template>
  <InfoHeader
    title="Primeiro acesso"
    subtitle="Precisamos de algumas informações"
    subtitleSmall="Você pode alterar no perfil posteriormente"
  />

  <div class="row flex-center">
    <div class="col-11 q-mt-md">
      <label class="q-ml-sm">Possuí Convênio?</label>
      <div id="radio-convenio">
        <q-radio
          v-model="hasConvenio"
          val="true"
          label="Sim"
          class="q-mr-lg"
        />
        <q-radio
          v-model="hasConvenio"
          val="false"
          label="Não"
        />
      </div>
    </div>
  </div>

  <div class="row flex-center">
    <div class="col-11 q-mt-md">
      <label class="q-ml-sm">Selecione os convênios</label>
      <SelectForm
        v-model="selectedConvenio"
        multiple
        :options="convenios"
        label="Selecione os convênios"
        emit-value
        map-options
        :disable="hasConvenio == 'false'"
      />
    </div>
  </div>

  <div class="row flex-center">
    <div class="col-11 q-mt-md">
      <label class="q-ml-sm">Preencha o seu endereço</label>
      <InputText
        placeholder="CEP"
        v-model="cep"
        mask="#####-###"
        @blur="listarEstados(cep)"
      />
      <InputText
        placeholder="Endereco"
        v-model="endereco"
        :disable="cep.length < 9"
      />
      <InputText
        placeholder="Numero"
        v-model="numero"
        type="number"
        :disable="cep.length < 9"
      />
      <InputText
        placeholder="Bairro"
        v-model="bairro"
        :disable="cep.length < 9"
      />
      <InputText
        placeholder="Cidade"
        v-model="cidade"
        :disable="cep.length < 9"
      />
      <SelectForm
        v-model="estado"
        :options="listaEstados"
        label="Estado"
        :disable="cep.length < 9"
        style="margin-top: 20px;"
      />

      <BtnForm
        label="Salvar"
        icon="save"
        @click="salvar"
      />
    </div>
  </div>
</template>

<script setup>
  import { ref, defineOptions, onMounted } from 'vue';
  import { getConvenios } from 'src/services/convenio';
  import { atualizaPaciente } from 'src/services/paciente';
  import { verifyFirstAccess } from 'src/services/auth';
  import axios from 'axios';
  import { useQuasar } from 'quasar';
  import { useRouter } from 'vue-router';
  const $q = useQuasar();
  const router = useRouter();

  //components
  import InputText from '../../components/mobile/InputText.vue';
  import BtnForm from '../../components/mobile/BtnForm.vue';
  import SelectForm from 'src/components/mobile/SelectForm.vue';
  import InfoHeader from 'src/components/mobile/InfoHeader.vue';
  import { estados } from 'src/assets/js/estados';

  defineOptions({
    name: 'PagePrimeiroAcesso',
  });

  //DATA
  const usuario = {};
  const hasConvenio = ref('true');
  const inputDisabled = ref(false);
  const selectedConvenio = ref(null);
  const convenios = ref([]);
  const cep = ref('');
  const endereco = ref('');
  const numero = ref('');
  const bairro = ref('');
  const cidade = ref('');
  const estado = ref('');
  const listaEstados = estados;

  //METODOS

  const listarInfoPac = () => {
    const localUser = JSON.parse(localStorage.getItem('usuario'));
    usuario.value = localUser;
  };

  const listarConvenios = async () => {
    const res = await getConvenios();
    convenios.value = res.data.map((convenio) => ({
      label: convenio.nome,
      value: convenio.nome,
    }));
  };

  const listarEstados = async (cep) => {
    $q.loading.show();
    try {
      const res = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      endereco.value = res.data.logradouro;
      bairro.value = res.data.bairro;
      cidade.value = res.data.localidade;
      estado.value = res.data.uf;
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      $q.loading.hide();
    }
  };

  const salvar = async () => {
    if (!validaCampos()) {
      $q.notify({
        message: 'Preencha todos os campos',
        color: 'negative',
        position: 'top',
      });
      return;
    }

    if (hasConvenio.value == 'false') selectedConvenio.value = 'N';

    const dadosAtualizar = {
      convenios: JSON.stringify(selectedConvenio.value),
      cep: cep.value,
      endereco: endereco.value,
      numero: numero.value,
      bairro: bairro.value,
      cidade: cidade.value,
      estado: estado.value,
      hasConvenio: JSON.parse(hasConvenio.value),
    };

    const res = await atualizaPaciente(usuario.value.id, dadosAtualizar);
    if (res.status === 200) {
      localStorage.setItem('usuario', JSON.stringify(res.data.paciente));
      router.push('/home');
    }
  };

  const validaCampos = () => {
    if (hasConvenio.value == 'true' && selectedConvenio.value == '') {
      return false;
    }

    if (
      cep.value.length < 9 ||
      endereco.value.length < 1 ||
      numero.value.length < 1 ||
      bairro.value.length < 1 ||
      cidade.value.length < 1 ||
      estado.value.length < 1
    ) {
      return false;
    }
    return true;
  };
  //LIFECYCLE HOOKS
  onMounted(() => {
    listarInfoPac();
    listarConvenios();
    !verifyFirstAccess() ? router.push('/home') : '';
  });
</script>
