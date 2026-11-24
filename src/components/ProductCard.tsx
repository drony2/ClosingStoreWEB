import { Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { addToCart, toggleFavorite } from '../store';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const isFav = useAppSelector((s) => s.favorites.ids.includes(product.id));
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Link to={`/product/${product.id}`}>
        <CardMedia component="img" image={product.image} alt={product.title} sx={{ height: 220, objectFit: 'contain', p: 2 }} />
      </Link>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="body2" color="text.secondary">{product.category}</Typography>
        <Typography variant="subtitle1" sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {product.title}
        </Typography>
        <Typography variant="h6">${product.price.toFixed(2)}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" onClick={() => dispatch(addToCart(product))}>В корзину</Button>
        <IconButton color="secondary" onClick={() => dispatch(toggleFavorite(product.id))} sx={{ ml: 'auto' }}>
          {isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </CardActions>
    </Card>
  );
}
