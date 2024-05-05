import React, { ReactElement, useEffect, useRef } from 'react';
import Button from '../Button/Button';
import './Car.css';
import sprite from '../../assets/icons/sprite.svg';
import { useDispatch, useSelector } from 'react-redux';
import { removeCar as apiRemoveCar } from '../../api/removeCar';
import { removeCar, setEditingCar } from '../../redux/reducers/carDetailsSlice';
import { PropsCar } from '../../types/interfaces';
import { updateCar as apiUpdateCar } from '../../api/updateCar';
import { RootState, AppDispatch } from '../../redux/store';
import {
  checkEngineStatus,
  startCarEngine,
  stopCarEngine,
} from '../../redux/carEngineThunkActions';

const DISTANCE = 500000;

const Car = ({ id, name, color }: PropsCar): ReactElement => {
  const dispatch: AppDispatch = useDispatch();
  const car = useSelector((state: RootState) =>
    state.car.cars.find((item) => item.id === id),
  );
  const engineStatus = car?.engineStatus;
  const velocity = car?.velocity;

  const carIconRef = useRef<HTMLDivElement>(null);

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

  const handleStart = (): void => {
    dispatch(startCarEngine(id));
  };

  const handleStop = (): void => {
    dispatch(stopCarEngine(id));
  };

  const calculateAnimationDuration = (carVelocity: number): string => {
    return `${DISTANCE / carVelocity}ms`;
  };

  useEffect(() => {
    const carIcon = carIconRef.current;
    if (carIcon) {
      switch (engineStatus) {
        case 'started':
          if (velocity) {
            carIcon.classList.add('car-driving');
            carIcon.style.setProperty(
              'animation-duration',
              calculateAnimationDuration(velocity),
            );
          }
          break;
        case 'stopped':
          carIcon.classList.remove('car-driving');
          carIcon.classList.add('car-stopped');
          break;
        case 'error':
          const computedStyle = window.getComputedStyle(carIcon);
          const matrix = new WebKitCSSMatrix(computedStyle.transform);
          carIcon.style.setProperty('--stopped-position', `${matrix.m41}px`);
          carIcon.classList.add('car-broken');
          break;
      }
    }
  }, [id, engineStatus, velocity]);

  useEffect(() => {
    if (engineStatus === 'started' && velocity) {
      dispatch(checkEngineStatus(id));
    }
  }, [engineStatus, id, dispatch, velocity]);

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
        <Button
          type="button"
          className="car-container__icon-button"
          onClick={(): void => handleStart()}
        >
          ▶
        </Button>
        <Button
          type="button"
          className="car-container__icon-button"
          onClick={(): void => handleStop()}
        >
          ||
        </Button>
        <div className="car-icon" ref={carIconRef}>
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
