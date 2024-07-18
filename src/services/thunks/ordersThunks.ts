import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';

export const loadOrders = createAsyncThunk('orders/load', async () =>
  getOrdersApi()
);
