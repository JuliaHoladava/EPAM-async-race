import React, { ReactElement, useEffect, useState } from 'react';
import Car from '../../components/Car/Car';
import CarCreateForm from '../../components/CarForm/CarForm';
import './GarageView.css';
import { PropsCar } from '../../types/interfaces';
import Button from '../../components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { RootState } from '../../redux/store';
import { setCars } from '../../redux/reducers/carDetailsSlice';

const GarageView = (): ReactElement => {
  const dispatch = useDispatch();
  const cars: PropsCar[] = useSelector((state: RootState) => state.car.cars);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const response = await axios.get<PropsCar[]>(
          'http://localhost:3000/garage',
        );
        const data = response.data;
        dispatch(setCars(data));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching cars:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="heading-block">
        <h2 className="heading">Garage ({cars.length} cars)</h2>
        <div>Pagination...</div>
      </div>
      <div className="control-block">
        <div className="control-race">
          <Button type="button">Race</Button>
          <Button type="button">Reset</Button>
        </div>
        <div className="control-create">
          <CarCreateForm type={'create'} />
          <CarCreateForm type={'update'} />
          <Button type="button">Generate 100 cars</Button>
        </div>
      </div>
      <div className="car-race-block">
        {isLoading ? (
          <p>Loading cars...</p>
        ) : cars.length > 0 ? (
          cars.map((car: PropsCar) => <Car key={car.id} {...car} />)
        ) : (
          <p>No cars found</p>
        )}
      </div>
    </>
  );
};

export default GarageView;
