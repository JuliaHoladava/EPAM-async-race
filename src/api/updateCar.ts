import axios from 'axios';
import config from '../config';
import { PropsCar } from '../types/interfaces';

export const updateCar = async (carData: PropsCar): Promise<PropsCar> => {
  try {
    const response = await axios.put(`${config.apiUrl}/${carData.id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to update car: ', error);
    throw error;
  }
};
