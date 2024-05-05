import axios from 'axios';
import config from '../config';
import { PropsCar, PropsWinners } from '../types/interfaces';

interface Winner {
  id: number;
  wins: number;
  time: number;
}

export const fetchWinners = async (): Promise<PropsWinners[]> => {
  try {
    const { data: winners }: { data: Winner[] } = await axios.get(
      `${config.apiWinners}`,
    );
    const winnersDetails = await Promise.all(
      winners.map(async (winner) => {
        const { data: car } = await axios.get<PropsCar>(
          `${config.apiUrl}/${winner.id}`,
        );
        return {
          id: winner.id,
          wins: winner.wins,
          time: winner.time,
          name: car.name,
          color: car.color,
        };
      }),
    );

    return winnersDetails;
  } catch (error) {
    console.error('Error fetching winners:', error);
    throw error;
  }
};
