import axios from 'axios';
import config from '../config';
import { PropsCar } from '../types/interfaces';

export const fetchCars = async (): Promise<PropsCar[]> => {
  try {
    const response = await axios.get<PropsCar[]>(`${config.apiUrl}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cars:', error);
    throw error;
  }
};
