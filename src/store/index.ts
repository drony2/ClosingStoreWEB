import { configureStore, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProducts } from '../api';
import type { CartItem, Product } from '../types';

export const loadProducts = createAsyncThunk('products/load', fetchProducts);

const products = createSlice({
  name: 'products',
  initialState: { items: [] as Product[], status: 'idle' as 'idle' | 'loading' | 'ok' | 'error' },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(loadProducts.pending, (s) => { s.status = 'loading'; });
    b.addCase(loadProducts.fulfilled, (s, a) => { s.items = a.payload; s.status = 'ok'; });
    b.addCase(loadProducts.rejected, (s) => { s.status = 'error'; });
  },
});

const load = <T,>(key: string, def: T): T => {
  try { return JSON.parse(localStorage.getItem(key) || '') ?? def; } catch { return def; }
};

const cart = createSlice({
  name: 'cart',
  initialState: { items: load<CartItem[]>('cs_cart', []) },
  reducers: {
    addToCart(s, a: PayloadAction<Product>) {
      const it = s.items.find((i) => i.product.id === a.payload.id);
      if (it) it.qty += 1; else s.items.push({ product: a.payload, qty: 1 });
    },
    setQty(s, a: PayloadAction<{ id: number; qty: number }>) {
      const it = s.items.find((i) => i.product.id === a.payload.id);
      if (it) it.qty = Math.max(1, a.payload.qty);
    },
    removeFromCart(s, a: PayloadAction<number>) {
      s.items = s.items.filter((i) => i.product.id !== a.payload);
    },
    clearCart(s) { s.items = []; },
  },
});

const favorites = createSlice({
  name: 'favorites',
  initialState: { ids: load<number[]>('cs_fav', []) },
  reducers: {
    toggleFavorite(s, a: PayloadAction<number>) {
      s.ids = s.ids.includes(a.payload) ? s.ids.filter((i) => i !== a.payload) : [...s.ids, a.payload];
    },
  },
});

const auth = createSlice({
  name: 'auth',
  initialState: load<{ token: string | null; username: string | null }>('cs_auth', { token: null, username: null }),
  reducers: {
    setAuth: (_s, a: PayloadAction<{ token: string; username: string }>) => a.payload,
    logout: () => ({ token: null, username: null }),
  },
});

export const { addToCart, setQty, removeFromCart, clearCart } = cart.actions;
export const { toggleFavorite } = favorites.actions;
export const { setAuth, logout } = auth.actions;

export const store = configureStore({
  reducer: { products: products.reducer, cart: cart.reducer, favorites: favorites.reducer, auth: auth.reducer },
});

store.subscribe(() => {
  const s = store.getState();
  localStorage.setItem('cs_cart', JSON.stringify(s.cart.items));
  localStorage.setItem('cs_fav', JSON.stringify(s.favorites.ids));
  localStorage.setItem('cs_auth', JSON.stringify(s.auth));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
