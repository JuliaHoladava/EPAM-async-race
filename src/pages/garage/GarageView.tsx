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
import pagination from '../../utils/pagination';
import Pagination from '../../components/Pagination/Pagination';

const GarageView = (): ReactElement => {
  const dispatch = useDispatch();
  const cars: PropsCar[] = useSelector((state: RootState) => state.car.cars);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  const paginatedCars = pagination({
    items: cars,
    pageNumber: currentPage,
    pageSize,
  });

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

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="heading-block">
        <h2 className="heading">Garage ({cars.length} cars)</h2>
        <Pagination
          total={cars.length}
          current={currentPage}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />
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
          paginatedCars.map((car) => <Car key={car.id} {...car} />)
        ) : (
          <p>No cars found</p>
        )}
      </div>
    </>
  );
};

export default GarageView;
