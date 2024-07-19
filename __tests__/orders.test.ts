import ordersSlice, { initialState } from '../src/services/slices/ordersSlice';
import { loadOrders } from '../src/services/thunks/ordersThunks';
import { ordersResponse } from '../__jest__/constants';

describe('ordersSlice', () => {
  test('При ожидании получения списка заказов', () => {
    const { isLoading } = ordersSlice.reducer(initialState, {
      type: loadOrders.pending.type
    });
    expect(isLoading).toBe(true);
  });
  test('При ошибке в получении списка заказов', () => {
    const { isLoading } = ordersSlice.reducer(initialState, {
      type: loadOrders.rejected.type
    });
    expect(isLoading).toBe(false);
  });
  test('При успешном получении списка заказов', () => {
    const { isLoading, orders } = ordersSlice.reducer(initialState, {
      type: loadOrders.fulfilled.type,
      payload: ordersResponse.orders
    });
    expect(orders).toEqual(ordersResponse.orders);
    expect(isLoading).toBe(false);
  });
});
