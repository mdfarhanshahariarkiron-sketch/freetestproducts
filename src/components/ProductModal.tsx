import React, { useEffect } from 'react';
import { X, Star, Info, CheckCircle2, ShoppingCart, ExternalLink } from 'lucide-react';

export default function ProductModal({ product, onClose }: { product: any, onClose: () => void }) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0">
        
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-slate-900 bg-opacity-75 transition-opacity backdrop-blur-sm" 
          aria-hidden="true"
          onClick={onClose}
        ></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl w-full">
          <div className="absolute top-0 right-0 pt-4 pr-4 z-20">
            <button
              type="button"
              className="bg-white/80 backdrop-blur-md rounded-full p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none shadow-sm"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="w-full md:w-1/2 bg-slate-100 relative">
              <div className="aspect-square md:aspect-auto md:h-full relative">
                <img 
                  src={product.Images?.[0] || 'https://picsum.photos/seed/product/400/400'} 
                  alt={product.Title} 
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute top-4 left-4 bg-amber-500 text-white text-sm font-bold px-3 py-1.5 rounded-lg shadow-md">
                100% FREE REBATE
              </div>
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col max-h-[85vh] overflow-y-auto">
              <div className="text-xs font-bold text-amber-600 tracking-wider uppercase mb-2">
                {product.product_category?.split('â€º').pop()?.trim() || 'Other'}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 leading-tight">
                {product.Title}
              </h2>
              
              <div className="flex items-center mb-6 pb-6 border-b border-slate-100">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < 5 ? 'fill-current' : ''}`} />
                  ))}
                </div>
                <span className="ml-2 text-sm text-slate-700 font-bold">5.0 out of 5</span>
                <span className="mx-2 text-slate-300">•</span>
                <span className="text-sm text-slate-500">{product.total_reviews || product.reviews?.length || 0} ratings</span>
              </div>

              {/* Key Features */}
              {product.features && (
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-slate-900 mb-2 uppercase tracking-wider">Key Features</h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {product.features.map((feature: string, idx: number) => (
                      <li key={idx} className="text-sm text-slate-600 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Info className="w-5 h-5 text-amber-500" />
                  Farhan's Short Review
                </h3>
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 text-slate-700 italic leading-relaxed">
                  "{product.reviews?.[0]?.review || "Great product!"}"
                </div>
              </div>

              <div className="mb-8 flex-grow">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  How to get it FREE
                </h3>
                <div className="space-y-4 bg-emerald-50/50 rounded-xl p-5 border border-emerald-100/50">
                  {(product.instructions || "1. Buy the product on Amazon.\n2. Leave a review.\n3. Send us the order ID and review link.\n4. Get your rebate via PayPal.").split('\n').map((step: string, index: number) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm font-bold mt-0.5">
                        {index + 1}
                      </div>
                      <p className="ml-3 text-slate-700 text-sm leading-relaxed font-medium">{step.replace(/^\d+\.\s*/, '')}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-slate-100">
                {product['Amazon Link'] || product.AmazonLink ? (
                  <a 
                    href={product['Amazon Link'] || product.AmazonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-amber-500 text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-amber-600 transition-all hover:shadow-lg hover:shadow-amber-500/30 flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Get it Free on Amazon
                    <ExternalLink className="w-5 h-5 ml-1 opacity-70" />
                  </a>
                ) : (
                  <button 
                    className="w-full bg-amber-500 text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-amber-600 transition-all hover:shadow-lg hover:shadow-amber-500/30 flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                    onClick={() => alert("In a real app, this would redirect to the Amazon product page with your affiliate/tracking link.")}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Get it Free on Amazon
                    <ExternalLink className="w-5 h-5 ml-1 opacity-70" />
                  </button>
                )}
                <p className="text-center text-xs text-slate-400 mt-4">
                  By participating, you agree to our review terms and conditions. Rebates are processed within 48 hours of review verification.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
