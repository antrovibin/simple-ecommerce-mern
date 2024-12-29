import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      const searchParams = new URLSearchParams(location.search);
      const search = searchParams.get('search') || '';
      try {
        const response = await axios.get(`http://localhost:5000/api/products?search=${search}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [location.search, category, minPrice, maxPrice]);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <div className="flex mb-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mr-2 px-2 py-1 border rounded"
        >
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="books">Books</option>
        </select>
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="mr-2 px-2 py-1 border rounded"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="mr-2 px-2 py-1 border rounded"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Link key={product._id} to={`/products/${product._id}`} className="border p-4 rounded hover:shadow-lg">
            <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover mb-2" />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">${product.price.toFixed(2)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

