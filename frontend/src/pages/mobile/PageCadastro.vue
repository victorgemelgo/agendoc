<template>
  <q-page class="column justify-evenly">
    <div class="row flex-center q-mt-lg">
      <LogoAzul />
    </div>
    <div class="row flex-center">
      <div class="col-10">
        <form>
          <InputText
            placeholder="Nome *"
            v-model="nome"
          />

          <InputText
            placeholder="Sobrenome *"
            v-model="sobrenome"
          />

          <InputText
            placeholder="Email *"
            type="email"
            v-model="email"
          />
          <InputText
            placeholder="Celular *"
            v-model="celular"
            mask="(##)#####-####"
          />
          <InputText
            placeholder="CPF *"
            v-model="cpf"
            mask="###.###.###-##"
          />
          <InputText
            placeholder="Password *"
            type="password"
            v-model="password"
          />

          <SelectForm
            v-model="sexo"
            label="Sexo"
            :options="sexoOptions"
          />

          <BtnForm
            label="Cadastrar"
            icon="login"
            @click="cadastrar"
          />
        </form>
      </div>
    </div>

    <div class="row flex-center q-mt-lg">
      <div class="col10">
        <p>
          Já possui conta?
          <span
            @click="goLogin"
            class="text-primary"
            >Entre aqui</span
          >
        </p>
      </div>
    </div>
  </q-page>
</template>

<script setup>
  import InputText from '../../components/mobile/InputText.vue';
  import BtnForm from '../../components/mobile/BtnForm.vue';
  import LogoAzul from '../../components/mobile/LogoAzul.vue';
  import SelectForm from 'src/components/mobile/SelectForm.vue';
  import { ref } from 'vue';
  import { useQuasar } from 'quasar';
  import { useRouter } from 'vue-router';
  const $q = useQuasar();
  const router = useRouter();
  defineOptions({
    name: 'PageCadastro',
  });

  //DATA
  const nome = ref('');
  const sobrenome = ref('');
  const email = ref('');
  const celular = ref('');
  const cpf = ref('');
  const password = ref('');
  const sexo = ref('');
  const data = new Date();
  const dataFormatada = data.toISOString();
  //ERRORS
  const msgError = ref('');

  const sexoOptions = [
    {
      label: 'Masculino',
      value: 'M',
    },
    {
      label: 'Feminino',
      value: 'F',
    },
    {
      label: 'Outro',
      value: 'O',
    },
  ];

  //METHODS

  function goLogin() {
    router.push('/');
  }

  //VALIDATIONS
  function validaCampos() {
    if (nome.value.length < 3) {
      msgError.value = 'Preencha o nome';
      return false;
    }

    if (sobrenome.value.length < 3) {
      msgError.value = 'Preencha o sobrenome';
      return false;
    }

    if (email.value.length < 3) {
      msgError.value = 'Preencha o email';
      return false;
    }

    if (email.value.indexOf('@') == -1) {
      msgError.value = 'Preencha um email válido';
      return false;
    }

    if (celular.value.length < 13) {
      msgError.value = 'Preencha o celular com um número válido';
      return false;
    }

    if (cpf.value.length < 14) {
      msgError.value = 'Preencha o cpf';
      return false;
    }

    if (password.value.length < 8) {
      msgError.value = 'Preencha a senha (Mínimo 8 caracteres)';
      return false;
    }

    if (sexo.value.length < 1) {
      msgError.value = 'Preencha o sexo';
      return false;
    }

    return true;
  }

  function cadastrar() {
    if (!validaCampos()) {
      $q.notify({
        message: msgError.value,
        color: 'negative',
        position: 'top',
      });
      return;
    }

    fetch('http://localhost:3000/paciente/cadastrar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome: `${nome.value} ${sobrenome.value}`,
        email: email.value,
        celular: celular.value,
        cpf: cpf.value,
        nascimento: dataFormatada,
        sexo: 'M',
        password: password.value,
        hasConvenio: false,
        convenios: ['nao-informado'],
        cep: 'nao-informado',
        endereco: 'nao-informado',
        numero: 'nao-informado',
        bairro: 'nao-informado',
        cidade: 'nao-informado',
        estado: 'nao-informado',
        createdBy: nome.value,
        updatedBy: nome.value,
      }),
    })
      .then((response) => {
        if (response.status == 201) {
          $q.notify({
            message: 'Cadastro realizado com sucesso',
            color: 'positive',
            position: 'top',
          });
          router.push('/');
        }
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          $q.notify({
            message: data.error,
            color: 'negative',
            position: 'top',
          });
        }
      });
  }
</script>

<style scoped>
  span {
    cursor: pointer;
  }

  border-red {
    border: 1px solid red;
  }
</style>
