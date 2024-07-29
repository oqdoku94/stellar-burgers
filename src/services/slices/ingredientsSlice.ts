import { TIngredient } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';
import { loadIngredients } from '../thunks/ingredientsThunks';

interface TIngredientState {
  isLoading: boolean;
  ingredients: TIngredient[];
}

export const initialState: TIngredientState = {
  ingredients: [],
  isLoading: true
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: initialState,
  selectors: {
    isLoading: (state) => state.isLoading,
    getAllIngredients: (state) => state.ingredients,
    getIngredientById: (state, id: string | undefined) => {
      if (id) {
        return state.ingredients.find((item) => item._id === id);
      }

      return null;
    }
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadIngredients.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(loadIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isLoading = false;
      });
  }
});

export const { getAllIngredients, isLoading, getIngredientById } =
  ingredientsSlice.selectors;

export default ingredientsSlice;
