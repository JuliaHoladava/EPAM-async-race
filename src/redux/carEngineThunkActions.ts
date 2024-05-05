import { createAsyncThunk } from '@reduxjs/toolkit';
import { startEngine } from '../api/startEngine';
import { stopEngine } from '../api/stopEngine';

export const startCarEngine = createAsyncThunk(
  'car/startEngine',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await startEngine(id);
      if (response) {
        return { id, status: 'started', velocity: response.velocity };
      }
      return rejectWithValue({
        status: 'error',
        message: 'Engine did not start correctly',
      });
    } catch (error) {
      return rejectWithValue({
        status: 'error',
        message: 'Failed to start the engine',
      });
    }
  },
);

export const stopCarEngine = createAsyncThunk(
  'car/stopEngine',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await stopEngine(id);
      if (response) {
        return { id, status: 'stopped', velocity: 0 };
      }
      return rejectWithValue({
        status: 'error',
        message: 'Engine did not stop correctly',
      });
    } catch (error) {
      return rejectWithValue({
        status: 'error',
        message: 'Failed to start the engine',
      });
    }
  },
);
