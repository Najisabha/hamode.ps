
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import Section from '../components/Section';
import { Product } from '../types';
import { getProducts, addMessage, incrementVisitCount } from '../services/dataService';
import { useScrollReveal } from '../hooks/useScrollReveal';

const partners = [
    { name: 'ABB', logoUrl: 'https://i.imgur.com/H8Dxori.png' },
    { name: 'GEWISS', logoUrl: 'https://i.imgur.com/0tTRGrM.png' },
    { name: 'AVE', logoUrl: 'https://i.imgur.com/JTuWVWQ.png' },
    { name: 'VIMAR', logoUrl: 'https://i.imgur.com/VnnBbG4.png' },
    { name: 'Schneider Electric', logoUrl: 'https://i.imgur.com/8VrBcGx.png' },
    { name: 'Siemens', logoUrl: 'https://i.imgur.com/rFG9Yhv.png' },
    { name: 'Opple Lighting', logoUrl: 'https://i.imgur.com/eeEFlZo.png' },
    { name: 'Philips', logoUrl: 'https://i.imgur.com/wA1IEtM.png' },
    { name: 'Simon', logoUrl: 'https://i.imgur.com/GrgpAzq.png' },
];


const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { ref: heroRef, isVisible: heroIsVisible } = useScrollReveal<HTMLDivElement>();
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error' | 'idle'; message: string }>({ type: 'idle', message: '' });
  const location = useLocation();

  useEffect(() => {
    incrementVisitCount();
    setProducts(getProducts());
  }, []);
  
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
        window.scrollTo(0, 0);
    }
  }, [location]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
        setFormStatus({ type: 'error', message: 'يرجى ملء جميع الحقول.' });
        return;
    }
    addMessage(contactForm);
    setFormStatus({ type: 'success', message: 'تم إرسال رسالتك بنجاح! شكراً لك.' });
    setContactForm({ name: '', email: '', message: '' });
    setTimeout(() => setFormStatus({ type: 'idle', message: '' }), 5000);
  };

  return (
    <div className="bg-hamoude-light text-gray-800">
      <Header />
      <main>
        {/* Hero Section */}
        <div id="home" ref={heroRef} className={`bg-hamoude-primary text-white min-h-[60vh] flex items-center scroll-reveal ${heroIsVisible ? 'visible' : ''}`}>
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4">شركة الحمود للمواد الكهربائية</h1>
            <p className="text-xl md:text-2xl text-hamoude-accent font-semibold">الجودة والموثوقية في عالم الكهرباء</p>
          </div>
        </div>

        {/* About Us Section */}
        <Section id="about" title="من نحن">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg leading-relaxed mb-8">
              تأسست شركة الحمود عام 1974 ومقرها في فلسطين - الضفة الغربية. تختص الشركة في استيراد وتسويق البضائع في منطقة الضفة الغربية، وتتمتع بخبرة واسعة في هذا المجال.
            </p>
            <h3 className="text-2xl font-bold text-hamoude-primary mb-4">أهداف الشركة</h3>
            <ul className="list-disc list-inside inline-block text-left text-lg space-y-2">
              <li>التوسع في السوق المحلي.</li>
              <li>تقديم أفضل معايير الجودة في المنتجات.</li>
            </ul>
          </div>
        </Section>

        {/* Featured Products Section */}
        <Section id="catalog" title="أبرز المنتجات" className="bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 3).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/catalog" className="bg-hamoude-accent text-white font-bold py-3 px-8 rounded-md hover:bg-yellow-600 transition-colors duration-300 text-lg inline-block">
              عرض كل المنتجات
            </Link>
          </div>
        </Section>

        {/* Partners Section */}
        <Section id="partners" title="شركاؤنا وموردونا">
            <p className="max-w-3xl mx-auto text-center text-lg leading-relaxed mb-12">
                نفخر بالتعاون مع نخبة من أفضل المصنعين والموردين العالميين والمحليين لضمان توفير منتجات تلبي أعلى معايير الجودة العالمية.
            </p>
            <div className="flex justify-center items-center flex-wrap gap-x-12 gap-y-8 md:gap-x-16">
                {partners.map(partner => (
                    <div key={partner.name} title={partner.name} className="flex items-center justify-center h-16">
                        <img 
                            src={partner.logoUrl} 
                            alt={partner.name} 
                            className="max-h-full max-w-full object-contain grayscale hover:grayscale-0 hover:scale-110 transform transition-all duration-300"
                        />
                    </div>
                ))}
            </div>
        </Section>
        
        {/* Contact Us Section */}
        <Section id="contact" title="تواصل معنا" className="bg-white">
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-lg font-medium text-hamoude-primary mb-2">الاسم</label>
                <input type="text" id="name" name="name" value={contactForm.name} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-hamoude-accent focus:border-hamoude-accent transition" />
              </div>
              <div>
                <label htmlFor="email" className="block text-lg font-medium text-hamoude-primary mb-2">البريد الإلكتروني</label>
                <input type="email" id="email" name="email" value={contactForm.email} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-hamoude-accent focus:border-hamoude-accent transition" />
              </div>
              <div>
                <label htmlFor="message" className="block text-lg font-medium text-hamoude-primary mb-2">الرسالة</label>
                <textarea id="message" name="message" rows={5} value={contactForm.message} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-hamoude-accent focus:border-hamoude-accent transition"></textarea>
              </div>
              <button type="submit" className="w-full bg-hamoude-accent text-white font-bold py-3 px-6 rounded-md hover:bg-yellow-600 transition-colors duration-300 text-lg">إرسال الرسالة</button>
            </form>
            {formStatus.type !== 'idle' && (
              <p className={`mt-4 text-center p-3 rounded-md ${formStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {formStatus.message}
              </p>
            )}
            <div className="text-center mt-12 space-y-2 text-lg text-hamoude-primary" dir="ltr">
                <p><strong>Location:</strong> Palestine - West Bank</p>
                <p><strong>Phone:</strong> +97092671748</p>
                <p><strong>Fax:</strong> +97092679144</p>
                <p><strong>Mobile:</strong> +972593990990</p>
                <p><strong>Email:</strong> BBAA1990@HOTMAIL.COM</p>
                <p><strong>General Manager:</strong> Baha Al Hamoudi</p>
                <p><strong>Commercial Registration:</strong> 562339903</p>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
