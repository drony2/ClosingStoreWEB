import { useMemo, useState } from 'react';
import { Alert, Box, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useAppSelector } from '../store/hooks';
import ProductGrid from '../components/ProductGrid';

export default function Catalog() {
  const { items, status } = useAppSelector((s) => s.products);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('none');

  const categories = useMemo(() => Array.from(new Set(items.map((p) => p.category))), [items]);
  const filtered = useMemo(() => {
    let list = items.filter(
      (p) => (category === 'all' || p.category === category) && p.title.toLowerCase().includes(search.toLowerCase())
    );
    if (sort === 'asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'desc') list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [items, search, category, sort]);

  return (
    <>
      <Typography variant="h4" gutterBottom>Каталог</Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
        <TextField label="Поиск" size="small" value={search} onChange={(e) => setSearch(e.target.value)} />
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Категория</InputLabel>
          <Select label="Категория" value={category} onChange={(e) => setCategory(e.target.value)}>
            <MenuItem value="all">Все</MenuItem>
            {categories.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Сортировка</InputLabel>
          <Select label="Сортировка" value={sort} onChange={(e) => setSort(e.target.value)}>
            <MenuItem value="none">По умолчанию</MenuItem>
            <MenuItem value="asc">Цена: по возрастанию</MenuItem>
            <MenuItem value="desc">Цена: по убыванию</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {status === 'loading' && <CircularProgress />}
      {status === 'error' && <Alert severity="error">Не удалось загрузить товары</Alert>}
      {status === 'ok' && (filtered.length ? <ProductGrid products={filtered} /> : <Typography>Ничего не найдено</Typography>)}
    </>
  );
}
