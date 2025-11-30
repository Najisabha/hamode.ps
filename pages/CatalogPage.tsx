
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import Section from '../components/Section';
import { Product } from '../types';
import { getProducts } from '../services/dataService';

const CatalogPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(getProducts());
    window.scrollTo(0, 0); // Scroll to top on page load
  }, []);

  return (
    <div className="bg-hamoude-light text-gray-800">
      <Header />
      <main>
        <Section id="catalog-full" title="كتالوج المنتجات" className="bg-white min-h-screen">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.length > 0 ? (
              products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 text-xl">
                لا توجد منتجات لعرضها حالياً.
              </p>
            )}
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
};

export default CatalogPage;
