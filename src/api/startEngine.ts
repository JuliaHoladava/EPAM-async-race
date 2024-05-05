import axios from 'axios';
import config from '../config';

export const startEngine = async (
  id: number,
): Promise<{ status: string; velocity: number }> => {
  try {
    const response = await axios.patch(
      `${config.apiEngine}${id}&status=started`,
    );
    return response.data;
  } catch (error) {
    throw new Error();
  }
};
