import { FormEvent, useState } from 'react';
import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { clearCart } from '../store';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export default function Checkout() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.cart.items);
  const total = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const [form, setForm] = useState({ name: '', phone: '', address: '' });
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setDone(true);
    dispatch(clearCart());
  };

  if (done) return <Alert severity="success">Заказ оформлен! Спасибо за покупку. <Link to="/">В каталог</Link></Alert>;
  if (!items.length) return <Typography>Корзина пуста. <Link to="/">В каталог</Link></Typography>;
  return (
    <Box component="form" onSubmit={submit} sx={{ maxWidth: 480, display: 'grid', gap: 2 }}>
      <Typography variant="h4">Оформление заказа</Typography>
      <TextField required label="Имя" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <TextField required label="Телефон" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      <TextField required label="Адрес доставки" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
      <Typography variant="h6">К оплате: ${total.toFixed(2)}</Typography>
      <Button type="submit" variant="contained" size="large">Подтвердить заказ</Button>
    </Box>
  );
}
