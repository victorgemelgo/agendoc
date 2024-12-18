<template>
  <q-page class="column justify-evenly">
    <div class="row flex-center q-mt-lg">
      <LogoAzul />
    </div>
    <div class="row flex-center">
      <div class="col-10">
        <form>
          <InputText
            placeholder="Email"
            type="email"
            v-model="email"
          />
          <InputText
            placeholder="Password"
            type="password"
            v-model="password"
          />

          <BtnForm
            label="Entrar"
            icon="login"
            @click="logar()"
          />
        </form>
      </div>
    </div>

    <div class="row flex-center q-mt-lg">
      <div class="col10">
        <p>
          Não tem conta?
          <span
            @click="goCadastro"
            class="text-primary"
            >Cadastre-se agora</span
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
  import { onUnmounted, ref } from 'vue';
  import { useRouter } from 'vue-router';

  import { useQuasar } from 'quasar';
  import { defineOptions, onMounted } from 'vue';
  import { useUsuarioStore } from 'src/stores/usuario-store';
  import axios from 'axios';
  import { login } from 'src/services/auth';

  const $q = useQuasar();
  const router = useRouter();
  const usuarioStore = useUsuarioStore();
  defineOptions({
    name: 'PageLogin',
  });

  function goCadastro() {
    router.push('/cadastro');
  }

  //DATA
  const email = ref('');
  const password = ref('');
  const msgError = ref('');

  function validaCampos() {
    if (email.value.length < 3) {
      msgError.value = 'Preencha o email';
      return false;
    }

    if (password.value.length < 1) {
      msgError.value = 'Preencha a senha';
      return false;
    }

    return true;
  }

  const logar = async () => {
    if (!validaCampos()) {
      $q.notify({
        message: msgError.value,
        color: 'negative',
        position: 'top',
      });
      return;
    }

    const res = await login(email.value, password.value);
    router.push(res);
  };

  //LIFECYCLE HOOKS

  onMounted(() => {
    //verifica se tem token no localstorage, caso tenha redireciona para home
    localStorage.getItem('token') ? router.push('/home') : '';
  });
</script>

<style scoped>


  span {
    cursor: pointer;
  }
</style>
