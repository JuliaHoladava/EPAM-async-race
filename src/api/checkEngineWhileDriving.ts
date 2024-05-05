import axios from 'axios';
import config from '../config';

const SUCCESS_ANSWER_FROM_SERVER = 200;

export const checkEngineWhileDriving = async (
  id: number,
): Promise<{ status: number; velocity: number }> => {
  try {
    const response = await axios.patch(`${config.apiEngine}${id}&status=drive`);
    if (response.status !== SUCCESS_ANSWER_FROM_SERVER) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};
