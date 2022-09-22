import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('E-COMMERCE/FETCH-PRODUCTS', async () => {
  const response = await axios.get('https://dummyjson.com/products');
  return response.data;
});

export const fetchCategories = createAsyncThunk('E-COMMERCE/FETCH_CATEGORIES', async () => {
  const response = await axios.get('https://dummyjson.com/products/categories');
  return response.data;
});

export const searchProducts = createAsyncThunk('E-COMMERCE/SEARCH_PRODUCTS', async (search) => {
  const response = await axios.get(`https://dummyjson.com/products/search?q=${search}`);
  return response.data;
});

export const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    categories: [],
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder.addCase(searchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export default productSlice.reducer;
