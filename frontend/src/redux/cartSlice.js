import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
};

const cartSlice = createSlice({
  name: 'cart',

  initialState,

  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      // Check if product already exists
      const existingItem = state.cartItems.find(
        (x) => x.productId === item.productId
      );

      if (existingItem) {
        // Update quantity
        existingItem.qty += item.qty || 1;
      } else {
        // Add new product
        state.cartItems.push({
          productId: item.productId,
          name: item.name,
          price: item.price,
          image: item.image,
          qty: item.qty || 1,
        });
      }

      localStorage.setItem(
        'cartItems',
        JSON.stringify(state.cartItems)
      );
    },

    removeFromCart: (state, action) => {
      const productId = action.payload;

      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== productId
      );

      localStorage.setItem(
        'cartItems',
        JSON.stringify(state.cartItems)
      );
    },

    updateQuantity: (state, action) => {
      const { productId, qty } = action.payload;

      const item = state.cartItems.find(
        (item) => item.productId === productId
      );

      if (item && qty > 0) {
        item.qty = qty;
      }

      localStorage.setItem(
        'cartItems',
        JSON.stringify(state.cartItems)
      );
    },

    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem('cartItems');
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;