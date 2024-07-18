import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { loadFeed } from '../thunks/feedThunks';

interface TFeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
}

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0
};

const feedSlice = createSlice({
  name: 'feed',
  initialState: initialState,
  selectors: {
    getFeedState: (state) => state,
    getFeedOrders: (state) => state.orders,
    getFeedTotal: (state) => state.total,
    getFeedTotalToday: (state) => state.totalToday
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadFeed.pending, (state) => (state = initialState))
      .addCase(loadFeed.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  }
});

export const { getFeedState, getFeedOrders, getFeedTotal, getFeedTotalToday } =
  feedSlice.selectors;

export default feedSlice;
