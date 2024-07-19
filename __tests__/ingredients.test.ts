import ingredientsSlice, {
  initialState
} from '../src/services/slices/ingredientsSlice';
import { loadIngredients } from '../src/services/thunks/ingredientsThunks';
import { loadedIngredients } from '../__jest__/constants';

describe('ingredientsSlice', () => {
  test('При ожидании получения ингредиентов', () => {
    const { isLoading } = ingredientsSlice.reducer(initialState, {
      type: loadIngredients.pending.type
    });
    expect(isLoading).toBe(true);
  });
  test('При ошибке в получении ингредиентов', () => {
    const { isLoading } = ingredientsSlice.reducer(initialState, {
      type: loadIngredients.rejected.type
    });
    expect(isLoading).toBe(false);
  });
  test('При успешном получении ингредиентов', () => {
    const { isLoading, ingredients } = ingredientsSlice.reducer(initialState, {
      type: loadIngredients.fulfilled.type,
      payload: loadedIngredients
    });
    expect(isLoading).toBe(false);
    expect(ingredients).toEqual(loadedIngredients);
  });
});
