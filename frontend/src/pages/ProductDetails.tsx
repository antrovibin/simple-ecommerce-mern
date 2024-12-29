import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
}

const ProductDetails: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <div className="flex flex-col md:flex-row">
        <img src={product.imageUrl} alt={product.name} className="w-full md:w-1/2 h-64 object-cover mb-4 md:mb-0 md:mr-4" />
        <div>
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
          <p className="text-gray-800 mb-4">{product.description}</p>
          <p className="text-gray-600">Category: {product.category}</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

