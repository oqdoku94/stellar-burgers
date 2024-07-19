import { TConstructorIngredient, TIngredient } from '@utils-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export interface TConstructorState {
  bun?: TConstructorIngredient;
  ingredients: TConstructorIngredient[];
}

interface TMovableConstructorIngredient {
  index: number;
  move: 'up' | 'down';
}

export const initialState: TConstructorState = {
  ingredients: []
};

export const constructorSlice = createSlice({
  name: '_constructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (
        state: TConstructorState,
        action: PayloadAction<TConstructorIngredient>
      ) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuidv4() }
      })
    },
    moveIngredient: (
      state,
      action: PayloadAction<TMovableConstructorIngredient>
    ) => {
      [
        state.ingredients[action.payload.index],
        state.ingredients[
          action.payload.index + (action.payload.move == 'up' ? -1 : 1)
        ]
      ] = [
        state.ingredients[
          action.payload.index + (action.payload.move == 'up' ? -1 : 1)
        ],
        state.ingredients[action.payload.index]
      ];
    },
    removeIngredient: (
      state,
      action: PayloadAction<Pick<TConstructorIngredient, 'id'>>
    ) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload.id
      );
    },
    clearConstructor: (state) => initialState
  },
  selectors: {
    getConstructor: (state) => state
  }
});

export const { getConstructor } = constructorSlice.selectors;

export const {
  addIngredient,
  moveIngredient,
  removeIngredient,
  clearConstructor
} = constructorSlice.actions;
export default constructorSlice;
