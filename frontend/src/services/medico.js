import axios from 'axios';
import { Notify, LocalStorage } from 'quasar';

export const listaMedico = async (dados) => {
  try {
    const response = await axios.get(
      'http://localhost:3000/medico/listar',
      dados,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${LocalStorage.getItem('token')}`,
        },
      }
    );

    if (response.status === 200) {
      return response;
    } else {
      Notify.create({
        message: response.data.msg,
        color: 'negative',
        position: 'top',
        icon: 'error',
        timeout: 2000,
      });
      console.log(response);
      return response;
    }
  } catch (error) {
    return error.data;
  }
  finally {
    console.log('Finalizado');
  }
};

export const notifica = (valor) => {
  Notify.create({
    message: `${valor}`,
    color: 'positive',
    position: 'top',
    icon: 'check',
    timeout: 2000,
  });

  console.log(valor)
};