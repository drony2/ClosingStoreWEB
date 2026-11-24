import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Box, Button, CircularProgress, Rating, Typography } from '@mui/material';
import { fetchProduct } from '../api';
import type { Product } from '../types';
import { addToCart } from '../store';
import { useAppDispatch } from '../store/hooks';

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    setProduct(null); setError(false);
    fetchProduct(Number(id)).then(setProduct).catch(() => setError(true));
  }, [id]);

  if (error) return <Alert severity="error">Товар не найден</Alert>;
  if (!product) return <CircularProgress />;
  return (
    <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
      <Box component="img" src={product.image} alt={product.title} sx={{ width: 320, maxWidth: '100%', objectFit: 'contain' }} />
      <Box sx={{ flex: 1, minWidth: 280 }}>
        <Typography variant="overline">{product.category}</Typography>
        <Typography variant="h4" gutterBottom>{product.title}</Typography>
        <Rating value={product.rating.rate} precision={0.1} readOnly />
        <Typography variant="h5" sx={{ my: 2 }}>${product.price.toFixed(2)}</Typography>
        <Typography sx={{ mb: 3 }}>{product.description}</Typography>
        <Button variant="contained" size="large" onClick={() => dispatch(addToCart(product))}>В корзину</Button>
      </Box>
    </Box>
  );
}
