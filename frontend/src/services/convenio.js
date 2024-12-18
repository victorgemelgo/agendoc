import axios from 'axios';
import { LocalStorage, Loading } from 'quasar';


export const getConvenios = async () => {
  Loading.show();
  try {
    const response = await axios.get('http://localhost:3000/convenio/listar', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LocalStorage.getItem('token')}`
      },
    });

    if (response.status === 200) {
      return response;
    }

    return response;
  } catch (error) {
    console.error(error.data);
    return [];
  } finally {
    Loading.hide();
  }
};
