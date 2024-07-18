import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi, orderBurgerApi } from '@api';

export const loadOrderByNumber = createAsyncThunk(
  'order/loadByNumber',
  async (number: number) => getOrderByNumberApi(number)
);

export const createOrder = createAsyncThunk(
  'order/create',
  async (ids: string[]) => orderBurgerApi(ids)
);
