import axios from 'axios';
import { LocalStorage } from 'quasar';
import { Notify } from 'quasar';

export const atualizaPaciente = async (id, dados) => {
  try {
    const response = await axios.patch(
      `http://localhost:3000/paciente/atualizar/${id}`,
      dados,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${LocalStorage.getItem('token')}`,
        },
      }
    );

    if (response.status === 200) {
      Notify.create({
        message: response.data.msg,
        color: 'positive',
        position: 'top',
        icon: 'check',
        timeout: 2000,
      });
      return response;
    } else {
      Notify.create({
        message: response.data.msg,
        color: 'negative',
        position: 'top',
        icon: 'error',
        timeout: 2000,
      });
      return response;
    }
  } catch (error) {
    return error.data;
  }
};
