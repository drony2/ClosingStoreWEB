import { Typography } from '@mui/material';
import { useAppSelector } from '../store/hooks';
import ProductGrid from '../components/ProductGrid';

export default function Favorites() {
  const items = useAppSelector((s) => s.products.items);
  const ids = useAppSelector((s) => s.favorites.ids);
  const list = items.filter((p) => ids.includes(p.id));
  return (
    <>
      <Typography variant="h4" gutterBottom>Избранное</Typography>
      {list.length ? <ProductGrid products={list} /> : <Typography>Пока пусто</Typography>}
    </>
  );
}
