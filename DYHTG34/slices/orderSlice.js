import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: null,
  customers: null,
  products: null,
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducer: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setCustomers: (state, action) => {
      state.customers = action.payload;
    },
    setProducts: (state, action) => {
      state.Products = action.payload;
    },
    
  }
})

export const { setOrders, setCustomers, setProducts } = orderSlice.actions;

// Selectors 
export const selectOrders = (state) => state.orders.orders;
export const selectCustomers = (state) => state.orders.customers;
export const selectProducts = (state) => state.orders.products;

export default orderSlice.reducer;
