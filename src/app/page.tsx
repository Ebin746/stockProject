// pages/page.js
"use client"
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';

export interface Iproducts {
  productName: string;
  quantity: string;
  price: string;
  category: string; // Add category to products
}

const Page = () => {
  const [products, setProducts] = useState<Iproducts[]>([]);
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Category 1'); // New state for category

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(''); // State for search filter

  const handleSubmit = (e) => {
    e.preventDefault();
    if (productName && quantity && price && category) {
      setProducts([
        ...products,
        { productName, quantity, price, category }
      ]);
      setProductName('');
      setQuantity('');
      setPrice('');
      setCategory('Category 1');
    } else {
      alert("Please fill in all fields");
    }
  };

  // Filtered products based on search and category
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesSearch = product.productName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Header />
      <div className="container mx-auto p-5">
        <h2 className="text-2xl font-semibold mb-5">Add Product</h2>
        
        {/* Search bar and category filter */}
        <div className="mb-5">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">All Categories</option>
            <option value="Category 1">Category 1</option>
            <option value="Category 2">Category 2</option>
          </select>
        </div>

        {/* Form for adding products */}
        <form onSubmit={handleSubmit} className="mb-5">
          <div className="mb-4">
            <label htmlFor="productName" className="block text-gray-700">Product Name</label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-gray-700">Quantity</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700">Price</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="Category 1">Category 1</option>
              <option value="Category 2">Category 2</option>
            </select>
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Product</button>
        </form>

        {/* Table to display products */}
        <h3 className="text-xl font-semibold mb-4">Available Products</h3>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-gray-300">Product Name</th>
              <th className="px-4 py-2 border border-gray-300">Quantity</th>
              <th className="px-4 py-2 border border-gray-300">Price</th>
              <th className="px-4 py-2 border border-gray-300">Category</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border border-gray-300">{product.productName}</td>
                  <td className="px-4 py-2 border border-gray-300">{product.quantity}</td>
                  <td className="px-4 py-2 border border-gray-300">{product.price}</td>
                  <td className="px-4 py-2 border border-gray-300">{product.category}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td  className="px-4 py-2 text-center border border-gray-300">No products available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Page;
