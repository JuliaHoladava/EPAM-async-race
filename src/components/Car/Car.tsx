import React, { ReactElement } from 'react';
import Button from '../Button/Button';
import './Car.css';
import sprite from '../../assets/icons/sprite.svg';

interface PropsCar {
  id: number;
  name?: string;
  color?: string;
}

const Car = ({ id, name, color }: PropsCar): ReactElement => {
  return (
    <div className="car-container">
      <div className="car-container__heading">
        <Button
          type="button"
          className="car-container__button"
          onClick={(): void => {}}
        >
          Update
        </Button>
        <Button
          type="button"
          className="car-container__button"
          onClick={(): void => {}}
        >
          Remove
        </Button>
        <p className="car-container__name">
          {name}, {id}
        </p>
      </div>
      <div className="car-container__body">
        <Button type="button" className="car-container__icon-button">
          ▶
        </Button>
        <Button type="button" className="car-container__icon-button">
          ||
        </Button>
        <div className="car-icon">
          <svg width="100%" height="100%">
            <use xlinkHref={`${sprite}#svgviewer-output`} fill={color} />
          </svg>
        </div>
        <div className="finish-flag">🚩</div>
      </div>
    </div>
  );
};

export default Car;
