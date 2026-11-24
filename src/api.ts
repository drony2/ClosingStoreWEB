import axios from 'axios'
import type { Product } from './types'

const api = axios.create({ baseURL: 'https://fakestoreapi.com' })

export const fetchProducts = () =>
	api.get<Product[]>('/products').then((r) => r.data)
export const fetchProduct = (id: number) =>
	api.get<Product>(`/products/${id}`).then((r) => r.data)
export const loginRequest = (username: string, password: string) =>
	api
		.post<{ token: string }>('/auth/login', { username, password })
		.then((r) => r.data.token)
