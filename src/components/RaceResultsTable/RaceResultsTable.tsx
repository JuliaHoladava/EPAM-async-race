import React, { ReactElement } from 'react';
import sprite from '../../assets/icons/sprite.svg';
import './RaceResultsTable.css';

interface PropsResultsTable {
  color: string;
  name: string;
  wins: number;
  time: number;
  index: number;
}

const RaceResultsTable = ({
  color,
  name,
  wins,
  time,
  index,
}: PropsResultsTable): ReactElement => {
  return (
    <tr>
      <td className="table__row">{index}</td>
      <td className="table__row">
        <div className="car-icon">
          <svg width="100%" height="100%">
            <use xlinkHref={`${sprite}#svgviewer-output`} fill={color} />
          </svg>
        </div>
      </td>
      <td className="table__row">{name}</td>
      <td className="table__row">{wins}</td>
      <td className="table__row">{time}</td>
    </tr>
  );
};

export default RaceResultsTable;
