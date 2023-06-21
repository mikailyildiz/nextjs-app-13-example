import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type ProductsState = {
  list: any | null
}

const slice = createSlice({
  name: 'products',
  initialState: {
    list: []
  } as ProductsState,
  reducers: {
    setProducts: (
      state, 
      { payload: { 
        list 
      } }: PayloadAction<{ 
        list: any
      }>
    ) => {
      state.list = list
    }
  }
})

export const {setProducts} = slice.actions

export default slice.reducer

export const selectProducts = (state: RootState) => state.products