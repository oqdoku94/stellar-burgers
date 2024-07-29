import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { createOrder, loadOrderByNumber } from '../thunks/orderThunks';

export interface TOrderState {
  order: TOrder | null;
  isLoading: boolean;
}

export const initialState: TOrderState = {
  order: null,
  isLoading: false
};

const orderSlice = createSlice({
  name: 'order',
  initialState: initialState,
  selectors: {
    getOrder: (state) => state.order,
    isLoading: (state) => state.isLoading
  },
  reducers: {
    clearOrder: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.order = null;
      })
      .addCase(loadOrderByNumber.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(loadOrderByNumber.fulfilled, (state, action) => {
        state.order = action.payload.orders[0];
        state.isLoading = false;
      })
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.order = null;
      })
      .addCase(createOrder.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.order = action.payload.order;
        state.isLoading = false;
      });
  }
});

export const { clearOrder } = orderSlice.actions;

export const { getOrder, isLoading } = orderSlice.selectors;

export default orderSlice;
