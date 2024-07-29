import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { loadOrders } from '../thunks/ordersThunks';

interface TOrdersState {
  orders: TOrder[];
  isLoading: boolean;
}

export const initialState: TOrdersState = {
  orders: [],
  isLoading: false
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState: initialState,
  selectors: {
    getOrders: (state) => state.orders,
    isLoading: (state) => state.isLoading
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadOrders.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(loadOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      });
  }
});

export const { getOrders, isLoading } = ordersSlice.selectors;

export default ordersSlice;
