import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  addCar,
  setEditingCar,
  updateCar,
} from '../../redux/reducers/carDetailsSlice';
import Input from '../Input/Input';
import Button from '../Button/Button';
import './CarForm.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import config from '../../config';

interface CarFormProps {
  type: 'create' | 'update';
  id?: number;
  initialName?: string;
  initialColor?: string;
}

const CarForm = ({
  type,
  initialName = '',
  initialColor = '#e02bc8',
}: CarFormProps): ReactElement => {
  const [name, setName] = useState(initialName);
  const [color, setColor] = useState(initialColor);
  const dispatch = useDispatch();
  const editingCar = useSelector((state: RootState) =>
    type === 'update' ? state.car.editingCar : null,
  );

  useEffect(() => {
    if (editingCar && type === 'update') {
      setName(editingCar.name);
      setColor(editingCar.color);
    }
  }, [editingCar, type]);

  const handleSubmit = async (): Promise<void> => {
    if (type === 'update' && (!editingCar || !editingCar.id)) {
      console.error('Update operation requires an ID and editing car data');
      return;
    }

    const url =
      type === 'update' && editingCar && editingCar.id
        ? `${config.apiUrl}/${editingCar.id}`
        : `${config.apiUrl}`;
    const method = type === 'create' ? 'POST' : 'PUT';

    try {
      const response = await axios({
        method: method,
        url: url,
        data: { name, color },
      });

      if (type === 'create') {
        dispatch(addCar(response.data));
      }

      if (type === 'update') {
        dispatch(updateCar(response.data));
        dispatch(setEditingCar(null));
      }

      setName('');
      setColor('#e02bc8');
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
