import React, { useState } from 'react';
import { Star } from 'lucide-react';
import ProductModal from './ProductModal';

export default function ProductCard({ product }: { product: any, key?: React.Key }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div 
        className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col group"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative aspect-square bg-slate-100 overflow-hidden">
          <img 
            src={product.Images?.[0] || 'https://picsum.photos/seed/product/400/400'} 
            alt={product.Title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-bold px-2.5 py-1.5 rounded-lg shadow-md backdrop-blur-sm bg-opacity-90">
            100% FREE
          </div>
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <div className="text-xs font-bold text-amber-600 tracking-wider uppercase mb-2">{product.product_category?.split('â€º').pop()?.trim() || 'Other'}</div>
          <h3 className="text-lg font-bold text-slate-900 line-clamp-2 mb-2 leading-snug group-hover:text-amber-600 transition-colors">{product.Title}</h3>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < 5 ? 'fill-current' : ''}`} />
              ))}
            </div>
            <span className="ml-2 text-xs font-medium text-slate-500">{product.total_reviews || product.reviews?.length || 0} reviews</span>
          </div>
          
          <p className="text-sm text-slate-600 line-clamp-2 mb-5 flex-grow">
            "{product.reviews?.[0]?.review || "Great product!"}"
          </p>
          
<a
  href={product['Amazon Link'] || product.AmazonLink} 
  target="_blank"
  rel="noopener noreferrer"
  className="w-full flex items-center justify-center gap-2 bg-[#FF9900] hover:bg-[#E38800] text-slate-900 font-medium py-3 px-4 rounded-xl transition-colors duration-200"
  onClick={(e) => e.stopPropagation()}
>
  View Details on Amazon
</a>
        </div>
      </div>

      {isModalOpen && (
        <ProductModal product={product} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
