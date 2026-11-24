import { Box, Button, Divider, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Link } from 'react-router-dom';
import { removeFromCart, setQty } from '../store';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export default function Cart() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.cart.items);
  const total = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);

  if (!items.length) return <Typography variant="h5">Корзина пуста. <Link to="/">В каталог</Link></Typography>;
  return (
    <>
      <Typography variant="h4" gutterBottom>Корзина</Typography>
      {items.map(({ product, qty }) => (
        <Box key={product.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1.5, borderBottom: '1px solid #eee' }}>
          <Box component="img" src={product.image} alt="" sx={{ width: 64, height: 64, objectFit: 'contain' }} />
          <Typography sx={{ flex: 1 }}>{product.title}</Typography>
          <IconButton onClick={() => dispatch(setQty({ id: product.id, qty: qty - 1 }))}><RemoveIcon /></IconButton>
          <Typography>{qty}</Typography>
          <IconButton onClick={() => dispatch(setQty({ id: product.id, qty: qty + 1 }))}><AddIcon /></IconButton>
          <Typography sx={{ width: 90, textAlign: 'right' }}>${(product.price * qty).toFixed(2)}</Typography>
          <IconButton color="error" onClick={() => dispatch(removeFromCart(product.id))}><DeleteIcon /></IconButton>
        </Box>
      ))}
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Итого: ${total.toFixed(2)}</Typography>
        <Button variant="contained" size="large" component={Link} to="/checkout">Оформить заказ</Button>
      </Box>
    </>
  );
}
