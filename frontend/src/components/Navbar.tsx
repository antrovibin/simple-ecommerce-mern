import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const history = useHistory();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    history.push(`/products?search=${searchTerm}`);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">E-Commerce</Link>
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-2 py-1 rounded-l"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded-r">Search</button>
        </form>
        <div>
          <Link to="/signup" className="text-white mr-4">Sign Up</Link>
          <Link to="/login" className="text-white">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

