import { AppBar, Badge, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export default function Header() {
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector((s) => s.cart.items.reduce((n, i) => n + i.qty, 0));
  const favCount = useAppSelector((s) => s.favorites.ids.length);
  const username = useAppSelector((s) => s.auth.username);
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ color: 'inherit', textDecoration: 'none', fontWeight: 700 }}>
          ClosingStore
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton color="inherit" component={Link} to="/favorites">
          <Badge badgeContent={favCount} color="secondary"><FavoriteIcon /></Badge>
        </IconButton>
        <IconButton color="inherit" component={Link} to="/cart">
          <Badge badgeContent={cartCount} color="secondary"><ShoppingCartIcon /></Badge>
        </IconButton>
        {username ? (
          <Button color="inherit" onClick={() => dispatch(logout())}>Выйти ({username})</Button>
        ) : (
          <Button color="inherit" component={Link} to="/login">Войти</Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
