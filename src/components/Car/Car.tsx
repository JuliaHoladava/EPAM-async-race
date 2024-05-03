import React, { ReactElement } from 'react';
import Button from '../Button/Button';
import './Car.css';
import sprite from '../../assets/icons/sprite.svg';
import { useDispatch } from 'react-redux';
import { removeCar as apiRemoveCar } from '../../api/removeCar';
import { removeCar, setEditingCar } from '../../redux/reducers/carDetailsSlice';
import { PropsCar } from '../../types/interfaces';
import { updateCar as apiUpdateCar } from '../../api/updateCar';

const Car = ({ id, name, color }: PropsCar): ReactElement => {
  const dispatch = useDispatch();

  const handleDelete = async (carId: number): Promise<void> => {
    try {
      await apiRemoveCar(carId);
      dispatch(removeCar(carId));
    } catch (error) {
      console.error('Error deleting car: ', error);
    }
  };

  const handleUpdate = async (carData: PropsCar): Promise<void> => {
    try {
      const updatedCar = await apiUpdateCar(carData);
      dispatch(setEditingCar({ ...carData, id: updatedCar.id }));
    } catch (error) {
      console.error('Error updating car: ', error);
    }
  };

  return (
    <div className="car-container">
      <div className="car-container__heading">
        <Button
          type="button"
          className="car-container__button"
          onClick={(): Promise<void> => handleUpdate({ id, name, color })}
        >
          Update
        </Button>
        <Button
          type="button"
          className="car-container__button"
          onClick={(): Promise<void> => handleDelete(id)}
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
