import React, { ReactElement, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCar, setCarDetails } from '../../redux/reducers/carDetailsSlice';
import Input from '../Input/Input';
import Button from '../Button/Button';
import './CarForm.css';
import axios from 'axios';

interface CarFormProps {
  type: 'create' | 'update';
  id?: number;
  initialName?: string;
  initialColor?: string;
}

const CarForm = ({
  type,
  id,
  initialName = '',
  initialColor = '#e02bc8',
}: CarFormProps): ReactElement => {
  const [name, setName] = useState(initialName);
  const [color, setColor] = useState(initialColor);
  const dispatch = useDispatch();

  const handleSubmit = async (): Promise<void> => {
    dispatch(setCarDetails({ name, color }));

    const url =
      type === 'update' && id
        ? `http://localhost:3000/garage/${id}`
        : `http://localhost:3000/garage`;
    const method = type === 'create' ? 'POST' : 'PUT';

    try {
      const response = await axios({
        method: method,
        url: url,
        data: { name, color },
      });

      setName('');
      setColor('#e02bc8');

      if (type === 'create') {
        dispatch(addCar(response.data));
      }

      if (type === 'update') {
        dispatch(setCarDetails(response.data));
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error message:', error.message);

        if (axios.isAxiosError(error) && error.response) {
          console.error('Error response data:', error.response.data);
        }
      }
    }
  };

  return (
    <div className="input-container">
      <Input
        type="text"
        className="input"
        placeholder="Enter car name"
        value={name}
        onChange={(e): void => setName((e?.target as HTMLInputElement).value)}
      />
      <Input
        type="color"
        className="color-input"
        value={color}
        onChange={(e): void => setColor((e?.target as HTMLInputElement).value)}
      />
      <Button type="button" className="input-button" onClick={handleSubmit}>
        {type}
      </Button>
    </div>
  );
};

export default CarForm;
