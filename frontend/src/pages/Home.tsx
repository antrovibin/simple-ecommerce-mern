import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
}

const Home: React.FC = () => {
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/latest');
        setLatestProducts(response.data);
      } catch (error) {
        console.error('Error fetching latest products:', error);
      }
    };
    fetchLatestProducts();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Latest Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {latestProducts.map((product) => (
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

export default Home;

