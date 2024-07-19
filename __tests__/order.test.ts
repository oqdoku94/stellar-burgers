import orderSlice, {
  clearOrder,
  initialState
} from '../src/services/slices/orderSlice';
import {
  expectOrderByNumber,
  orderByNumberResponse,
  orderBeforeClearState,
  newOrderResponse
} from '../__jest__/constants';
import {
  createOrder,
  loadOrderByNumber
} from '../src/services/thunks/orderThunks';

describe('orderSlice', () => {
  test('Очистить заказ', () => {
    const { order } = orderSlice.reducer(orderBeforeClearState, clearOrder());
    expect(order).toBe(null);
  });
  test('При ожидании получения заказа по номеру', () => {
    const { order, isLoading } = orderSlice.reducer(initialState, {
      type: loadOrderByNumber.pending.type
    });
    expect(isLoading).toBe(true);
    expect(order).toBe(null);
  });
  test('При ошибке в получении заказа по номеру', () => {
    const { order, isLoading } = orderSlice.reducer(initialState, {
      type: loadOrderByNumber.rejected.type
    });
    expect(isLoading).toBe(false);
    expect(order).toBe(null);
  });
  test('При успешном получении заказа по номеру', () => {
    const { order, isLoading } = orderSlice.reducer(initialState, {
      type: loadOrderByNumber.fulfilled.type,
      payload: orderByNumberResponse
    });
    expect(order).toEqual(expectOrderByNumber);
    expect(isLoading).toBe(false);
  });

  test('При ожидании оформления заказа', () => {
    const { order, isLoading } = orderSlice.reducer(initialState, {
      type: createOrder.pending.type
    });
    expect(isLoading).toBe(true);
    expect(order).toBe(null);
  });
  test('При ошибке в оформлении заказа', () => {
    const { order, isLoading } = orderSlice.reducer(initialState, {
      type: createOrder.rejected.type
    });
    expect(isLoading).toBe(false);
    expect(order).toBe(null);
  });
  test('При успешном оформлении заказа', () => {
    const { order, isLoading } = orderSlice.reducer(initialState, {
      type: createOrder.fulfilled.type,
      payload: newOrderResponse
    });
    expect(order).toEqual(newOrderResponse.order);
    expect(isLoading).toBe(false);
  });
});
