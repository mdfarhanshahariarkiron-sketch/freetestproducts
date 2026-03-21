import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Gift } from 'lucide-react';
import { products, CATEGORIES } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    if (categoryParam && CATEGORIES.includes(categoryParam)) {
      setActiveCategory(categoryParam);
    }
  }, [location]);

  const filteredProducts = products.filter(p => {
    const pCategory = p.product_category || '';
    
    let matchesCategory = false;
    if (activeCategory === 'All') {
      matchesCategory = true;
    } else if (activeCategory === 'Elections') {
      matchesCategory = pCategory.includes('Elections');
    } else if (activeCategory === 'Home & Kitchen') {
      matchesCategory = pCategory.includes('Home & Kitchen');
    } else if (activeCategory === 'Beauty & Personal Care') {
      matchesCategory = pCategory.includes('Beauty & Personal Care') || pCategory.includes('Beauty');
    } else if (activeCategory === 'Gadgets') {
      matchesCategory = pCategory.includes('Electronics') || pCategory.includes('Cell Phones');
    } else if (activeCategory === 'Health Products' || activeCategory === 'Health & Household') {
      matchesCategory = pCategory.includes('Health');
    } else if (activeCategory === 'Office Products') {
      matchesCategory = pCategory.includes('Office');
    } else if (activeCategory === 'Outdoor Products') {
      matchesCategory = pCategory.includes('Patio') || pCategory.includes('Outdoor');
    } else if (activeCategory === 'Fitness' || activeCategory === 'Sports & Outdoors') {
      matchesCategory = pCategory.includes('Fitness') || pCategory.includes('Sports');
    } else if (activeCategory === 'Tools & Home Improvement') {
      matchesCategory = pCategory.includes('Tools');
    } else if (activeCategory === 'Pet Supplies') {
      matchesCategory = pCategory.includes('Pet');
    } else if (activeCategory === 'Toy & Games') {
      matchesCategory = pCategory.includes('Toys & Games') || pCategory.includes('Toy');
    } else if (activeCategory === 'Automotive') {
      matchesCategory = pCategory.includes('Automotive');
    } else if (activeCategory === 'Baby Products') {
      matchesCategory = pCategory.includes('Baby');
    } else if (activeCategory === 'Clothing, Shoes & Jewelry') {
      matchesCategory = pCategory.includes('Clothing') || pCategory.includes('Shoes') || pCategory.includes('Jewelry');
    } else if (activeCategory === 'Others') {
      // If it doesn't match any of the main categories
      const mainCategories = ['Home & Kitchen', 'Beauty', 'Electronics', 'Cell Phones', 'Health', 'Office', 'Patio', 'Outdoor', 'Fitness', 'Sports', 'Tools', 'Pet', 'Toy', 'Automotive', 'Baby', 'Clothing', 'Shoes', 'Jewelry'];
      matchesCategory = !mainCategories.some(c => pCategory.includes(c));
    } else {
      matchesCategory = pCategory.includes(activeCategory);
    }

    const pName = p.Title || '';
    const pReview = p.reviews?.[0]?.review || '';
    const matchesSearch = pName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          pReview.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900">All Products</h1>
          <p className="mt-2 text-slate-500">Browse our complete catalog of free products.</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8 border border-slate-200 flex flex-col md:flex-row gap-4 items-center justify-between sticky top-20 z-30">
          
          {/* Categories */}
          <div className="flex overflow-x-auto hide-scrollbar w-full md:w-auto">
            <div className="flex space-x-2">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72 flex-shrink-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg leading-5 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 sm:text-sm transition-colors"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <Gift className="mx-auto h-16 w-16 text-slate-300 mb-4" />
            <h3 className="text-xl font-bold text-slate-900">No products found</h3>
            <p className="mt-2 text-slate-500 max-w-md mx-auto">We couldn't find any products matching your current search or category filter.</p>
            <button 
              onClick={() => {setSearchQuery(''); setActiveCategory('All');}}
              className="mt-6 bg-slate-100 text-slate-900 px-6 py-2.5 rounded-full font-medium hover:bg-slate-200 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
