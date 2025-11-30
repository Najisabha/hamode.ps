
import React from 'react';
import { Product } from '../types';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 scroll-reveal ${isVisible ? 'visible' : ''}`}
    >
      <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-2xl font-bold text-hamoude-primary mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="flex items-baseline space-x-2 rtl:space-x-reverse">
          {product.discountPrice ? (
            <>
              <p className="text-2xl font-bold text-hamoude-accent">{product.discountPrice.toFixed(2)} ₪</p>
              <p className="text-lg text-gray-400 line-through">{product.price.toFixed(2)} ₪</p>
            </>
          ) : (
            <p className="text-2xl font-bold text-hamoude-primary">{product.price.toFixed(2)} ₪</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
