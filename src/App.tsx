import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Container } from '@mui/material';
import Header from './components/Header';
import Catalog from './pages/Catalog';
import ProductPage from './pages/ProductPage';
import Cart from './pages/Cart';
import Favorites from './pages/Favorites';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import { loadProducts } from './store';
import { useAppDispatch, useAppSelector } from './store/hooks';

function RequireAuth({ children }: { children: JSX.Element }) {
  const token = useAppSelector((s) => s.auth.token);
  const location = useLocation();
  return token ? children : <Navigate to="/login" state={{ from: location.pathname }} replace />;
}

export default function App() {
  const dispatch = useAppDispatch();
  useEffect(() => { dispatch(loadProducts()); }, [dispatch]);
  return (
    <>
      <Header />
      <Container sx={{ py: 3 }}>
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/checkout" element={<RequireAuth><Checkout /></RequireAuth>} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Container>
    </>
  );
}
