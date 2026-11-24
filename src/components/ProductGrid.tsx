import { Box } from '@mui/material';
import type { Product } from '../types';
import ProductCard from './ProductCard';

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 2 }}>
      {products.map((p) => <ProductCard key={p.id} product={p} />)}
    </Box>
  );
}
