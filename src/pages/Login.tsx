import { FormEvent, useState } from 'react';
import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginRequest } from '../api';
import { setAuth } from '../store';
import { useAppDispatch } from '../store/hooks';

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const from = (useLocation().state as { from?: string } | null)?.from ?? '/';
  const [username, setUsername] = useState('mor_2314');
  const [password, setPassword] = useState('83r5^_');
  const [error, setError] = useState('');

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const token = await loginRequest(username, password);
      dispatch(setAuth({ token, username }));
      navigate(from, { replace: true });
    } catch {
      setError('Неверный логин или пароль');
    }
  };

  return (
    <Box component="form" onSubmit={submit} sx={{ maxWidth: 360, display: 'grid', gap: 2 }}>
      <Typography variant="h4">Вход</Typography>
      <Alert severity="info">Тестовый аккаунт Fake API подставлен автоматически</Alert>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField label="Логин" value={username} onChange={(e) => setUsername(e.target.value)} />
      <TextField label="Пароль" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button type="submit" variant="contained" size="large">Войти</Button>
    </Box>
  );
}
