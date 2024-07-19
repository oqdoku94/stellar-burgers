import { feedResponse } from '../__jest__/constants';
import feedSlice, { initialState } from '../src/services/slices/feedSlice';
import { loadFeed } from '../src/services/thunks/feedThunks';

describe('feedSlice', () => {
  test('При успешном получении ленты заказов', () => {
    const { orders, total, totalToday } = feedSlice.reducer(initialState, {
      type: loadFeed.fulfilled.type,
      payload: feedResponse
    });
    expect(orders).toEqual(feedResponse.orders);
    expect(total).toBe(feedResponse.total);
    expect(totalToday).toBe(feedResponse.totalToday);
  });
});
