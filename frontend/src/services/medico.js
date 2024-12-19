import axios from 'axios';
import { Notify, LocalStorage } from 'quasar';

export const listaMedico = async (especialista) => {
  console.log(especialista);
  try {
    const response = await axios.post(
      'http://localhost:3000/medico/listar',
      {
        especialista: especialista,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${LocalStorage.getItem('token')}`,
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      return "Nenhum especialista encontrado!";
    }
    console.log(response);
  } catch (error) {
    return error.data;
  } finally {
    console.log('Finalizado');
  }
};
