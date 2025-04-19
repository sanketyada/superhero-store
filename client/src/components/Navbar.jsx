import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">Superhero Store</Link>
        <div>
          <Link to="/products" className="text-white mr-4">Products</Link>
          <Link to="/cart" className="text-white mr-4">Cart</Link>
          <Link to="/profile" className="text-white">Profile</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
