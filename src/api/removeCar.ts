import axios from 'axios';
import config from '../config';

export const removeCar = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${config.apiUrl}/${id}`);
  } catch (error) {
    console.error('Failed to delete car: ', error);
    throw error;
  }
};
