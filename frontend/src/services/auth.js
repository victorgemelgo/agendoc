import axios from 'axios';
import { LocalStorage } from 'quasar';
import { Notify, Loading } from 'quasar';
import { useRouter } from 'vue-router';

const API_URL = 'http://localhost:3000';

export const login = async (getEmail, getPassword) => {
  Loading.show();
  try {
    const response = await axios.post(
      'http://localhost:3000/paciente/login',
      {
        email: getEmail,
        password: getPassword,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    // Armazena o token no LocalStorage
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('usuario', JSON.stringify(response.data.paciente));

    // Configura o token para ser usado nas futuras requisições
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${response.data.token}`;

    if (response.status === 200) {
      Notify.create({
        message: response.data.msg,
        color: 'positive',
        position: 'top',
      });

      if (
        response.data.paciente.bairro == 'nao-informado' ||
        response.data.paciente.cep == 'nao-informado'
      ) {
        return '/primeiro-acesso';
      }else{
        return '/home';
      }
    }
  } catch (error) {
    Notify.create({
      message: error.response.data.error,
      color: 'negative',
      position: 'top',
    });
    return error.response;
  } finally{
    Loading.hide();
  }
};

export const logout = () => {
  LocalStorage.remove('token');
  LocalStorage.remove('usuario');
  delete axios.defaults.headers.common['Authorization'];
  Notify.create({
    message: 'Logout realizado com sucesso!',
    color: 'positive',
    position: 'top',
  });
  return true;
};

export const getToken = () => {
  return LocalStorage.getItem('token');
};

export const verifyFirstAccess = () => {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  if (usuario.bairro === 'nao-informado' || usuario.cep === 'nao-informado') {
    return true;
  } else {
    return false;
  }
};
