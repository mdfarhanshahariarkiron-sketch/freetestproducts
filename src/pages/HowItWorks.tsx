import React from 'react';
import { Search, ShoppingBag, Star, DollarSign, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HowItWorks() {
  const steps = [
    {
      icon: <Search className="w-8 h-8 text-amber-500" />,
      title: "1. Browse & Select",
      description: "Explore our curated collection of over 5,000 premium products across multiple categories. Found something you love? Contact us on social media right away to confirm availability—our daily order capacity is limited, and popular items sell out fast!"
    },
    {
      icon: <ShoppingBag className="w-8 h-8 text-amber-500" />,
      title: "2. Purchase on Amazon",
      description: "Click the 'View Details on Amazon' button. This will redirect you to the official Amazon product page. Purchase the item at full price using your regular Amazon account. Then please send us an order screenshot, order number and your PayPal account."
    },
    {
      icon: <Star className="w-8 h-8 text-amber-500" />,
      title: "3. Test & Review",
      description: "Once you receive the product, test it thoroughly for at least 5 days. Then, leave an honest, detailed review on Amazon sharing your experience with the product."
    },
    {
      icon: <DollarSign className="w-8 h-8 text-amber-500" />,
      title: "4. Get 100% Rebate",
      description: "Email us Amazon Order number, live review screenshot and a link to your published review. Once verified, we will send you a 100% rebate via PayPal within 5 to 7 days. You keep the product for free!"
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">How It Works</h1>
          <p className="mt-4 text-xl text-slate-500">
            Getting free products is simple. Follow these four steps to start your product discovery journey.
          </p>
        </div>

        <div className="space-y-12">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 flex flex-col md:flex-row items-center md:items-start gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-slate-50 rounded-full opacity-50"></div>
              <div className="flex-shrink-0 bg-amber-50 p-4 rounded-2xl border border-amber-100">
                {step.icon}
              </div>
              <div className="text-center md:text-left relative z-10">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-lg text-slate-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-slate-900 rounded-3xl p-8 md:p-12 text-center text-white shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto text-lg">
            Join thousands of others who are already discovering great products for free. No hidden fees, no subscriptions.
          </p>
          <Link to="/products" className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-full text-slate-900 bg-amber-500 hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/30">
            Browse Products Now
          </Link>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Important Rules</h3>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <ul className="space-y-4">
              {[
                "You must have an active Amazon account in good standing.",
                "Reviews must be honest and based on your actual experience.",
                "Do not mention that you received the product for free or a rebate in your Amazon review.",
                "Rebates are processed via PayPal only.",
                "You must wait at least 5 days after receiving the product before leaving a review."
              ].map((rule, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-lg">{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
