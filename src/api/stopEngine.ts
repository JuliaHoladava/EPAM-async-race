import axios from 'axios';
import config from '../config';

export const stopEngine = async (
  id: number,
): Promise<{ status: string; velocity: number }> => {
  try {
    const response = await axios.patch(
      `${config.apiEngine}${id}&status=stopped`,
    );
    return response.data;
  } catch (error) {
    throw new Error();
  }
};
