import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import update from 'react-addons-update';

const sortData = (data) => {
  const newData = [];
  Object.entries(data).forEach((item) => {
    const newObj = {}
    newObj.id = item[1].id;
    newObj.name = item[1].title;
    newObj.brand = item[1].brand;
    newObj.stock = item[1].stock;
    newObj.price = item[1].price;
    newObj.image = item[1].images[0];
    newObj.quantity = 1;
    newData.push(newObj);
  });
  return newData;
}

export const fetchProducts = createAsyncThunk('E-COMMERCE/FETCH-PRODUCTS', async () => {
  const response = await axios.get('https://dummyjson.com/products');
  return sortData(response.data.products);
});

export const fetchCategories = createAsyncThunk('E-COMMERCE/FETCH_CATEGORIES', async () => {
  const response = await axios.get('https://dummyjson.com/products/categories');
  return response.data;
});

export const searchProducts = createAsyncThunk('E-COMMERCE/SEARCH_PRODUCTS', async (search) => {
  const response = await axios.get(`https://dummyjson.com/products/search?q=${search}`);
  return sortData(response.data.products);
});

export const searchCategories = createAsyncThunk('E-COMMERCE/PRODUCTS_BY_CATEGORY', async (value) => {
  const response = await axios.get(`https://dummyjson.com/products/category/${value}`);
  return(sortData(response.data.products));
});

export const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    categories: [],
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const cart = [];
      cart.push(action.payload)
      return { ...state, cart: [...state.cart, action.payload] }
    },
    productQuantity: (state, action) => {
      const index = state.products.findIndex((item) => item.id === action.payload.item.id)
      const updatedArray = update(state, {
        products: {
          [index]: {
            quantity: {$set: action.payload.value}
          }
        }
      })
      return updatedArray;
    },
    cartProductQuantity: (state, action) => {
      const index = state.products.findIndex((item) => item.id === action.payload.item.id)
      const updatedArray = update(state, {
        products: {
          [index]: {
            quantity: {$set: state.products[index].quantity + action.payload.num}
          }
        }
      })
      return updatedArray;
    }
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
    builder.addCase(searchCategories.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export const { addToCart, productQuantity, cartProductQuantity } = productSlice.actions;

export default productSlice.reducer;
