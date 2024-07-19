import {
  addIngredient,
  clearConstructor,
  constructorSlice,
  initialState,
  moveIngredient,
  removeIngredient
} from '../src/services/slices/constructorSlice';
import {
  ingredientStateAfterClear,
  ingredientStateAfterRemove,
  ingredientStateBeforeClear,
  ingredientStateBeforeRemove,
  moveIngredientFirstState,
  moveIngredientSecondState,
  newBun,
  newFilling,
  uniqueidentifier
} from '../__jest__/constants';
import { after } from 'node:test';

jest.mock('uuid', () => ({ v4: () => uniqueidentifier }));

describe('constructorSlice', () => {
  test('Добавление и изменение ингредиента (булка)', () => {
    const { bun } = constructorSlice.reducer(
      initialState,
      addIngredient(newBun)
    );
    expect(bun).toEqual({ ...newBun, id: uniqueidentifier });
  });

  test('Добавление ингредиента (начинка)', () => {
    const { ingredients } = constructorSlice.reducer(
      initialState,
      addIngredient(newFilling)
    );
    expect(ingredients).toEqual([{ ...newFilling, id: uniqueidentifier }]);
  });

  test('Перемещение ингредиента вниз', () => {
    const state = constructorSlice.reducer(
      moveIngredientFirstState,
      moveIngredient({ index: 0, move: 'down' })
    );

    expect(state).toEqual(moveIngredientSecondState);
  });

  test('Перемещение ингредиента вверх', () => {
    const state = constructorSlice.reducer(
      moveIngredientSecondState,
      moveIngredient({ index: 1, move: 'up' })
    );

    expect(state).toEqual(moveIngredientFirstState);
  });

  test('Удаление ингредиента по уникальному идентификатору', () => {
    const state = constructorSlice.reducer(
      ingredientStateBeforeRemove,
      removeIngredient({ id: '6adfcfcd-9050-4aa5-9840-ea407a93c472' })
    );

    expect(state).toEqual(ingredientStateAfterRemove);
  });

  test('Очистка конструктора', () => {
    const state = constructorSlice.reducer(
      ingredientStateBeforeClear,
      clearConstructor()
    );
    expect(state).toEqual(ingredientStateAfterClear);
  });
});

after(() => {
  jest.clearAllMocks();
});
