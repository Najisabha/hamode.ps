
import { Product, ContactMessage } from '../types';

const PRODUCTS_KEY = 'hamoude_products';
const MESSAGES_KEY = 'hamoude_messages';
const VISITS_KEY = 'hamoude_visits';

// --- Seed Data ---
const initialProducts: Product[] = [
  { id: '1', name: 'ثلاجة حديثة', description: 'ثلاجة بسعة 500 لتر مع تقنية التبريد المزدوج.', imageUrl: 'https://picsum.photos/seed/fridge/400/300', price: 3500, discountPrice: 3200, details: 'الأبعاد: 180x70x70 سم. اللون: فضي. كفاءة الطاقة: A++.', warranty: 'ضمان 5 سنوات شامل' },
  { id: '2', name: 'غسالة أوتوماتيكية', description: 'غسالة ملابس بحمولة 8 كجم و 12 برنامج غسيل.', imageUrl: 'https://picsum.photos/seed/washer/400/300', price: 2200, details: 'سرعة الدوران: 1200 دورة/دقيقة. اللون: أبيض. محرك انفرتر.', warranty: 'ضمان 10 سنوات على المحرك' },
  { id: '3', name: 'مكيف هواء سبليت', description: 'مكيف هواء بقوة 1.5 حصان، تبريد وتدفئة.', imageUrl: 'https://picsum.photos/seed/ac/400/300', price: 2800, discountPrice: 2650, details: 'توزيع هواء رباعي الاتجاهات. فلتر مضاد للبكتيريا. وضع النوم.', warranty: 'ضمان 3 سنوات' },
  { id: '4', name: 'فرن كهربائي مدمج', description: 'فرن متعدد الوظائف مع شواية ومروحة توزيع حرارة.', imageUrl: 'https://picsum.photos/seed/oven/400/300', price: 1800, details: 'السعة: 65 لتر. 8 وظائف طهي. باب زجاجي مزدوج.', warranty: 'ضمان سنتان' },
  { id: '5', name: 'شاشة تلفزيون ذكية 4K', description: 'شاشة 55 بوصة بدقة 4K UHD ونظام تشغيل ذكي.', imageUrl: 'https://picsum.photos/seed/tv/400/300', price: 2500, details: 'الدقة: 3840x2160. HDR10+. واي فاي مدمج. 3 منافذ HDMI.', warranty: 'ضمان سنتان' },
  { id: '6', name: 'مكنسة كهربائية لاسلكية', description: 'مكنسة قوية ببطارية تدوم طويلاً وفلتر HEPA.', imageUrl: 'https://picsum.photos/seed/vacuum/400/300', price: 950, details: 'وقت التشغيل: 45 دقيقة. خفيفة الوزن. سهلة التفريغ.', warranty: 'ضمان سنة واحدة' }
];


const seedData = () => {
  if (!localStorage.getItem(PRODUCTS_KEY)) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(initialProducts));
  }
   if (!localStorage.getItem(VISITS_KEY)) {
    localStorage.setItem(VISITS_KEY, '0');
  }
};

seedData();

// --- Product Management ---
export const getProducts = (): Product[] => {
  const data = localStorage.getItem(PRODUCTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const addProduct = (product: Omit<Product, 'id'>): Product => {
  const products = getProducts();
  const newProduct: Product = { ...product, id: new Date().toISOString() };
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify([newProduct, ...products]));
  return newProduct;
};

export const deleteProduct = (id: string): void => {
  let products = getProducts();
  products = products.filter(p => p.id !== id);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
};

// --- Message Management ---
export const getMessages = (): ContactMessage[] => {
  const data = localStorage.getItem(MESSAGES_KEY);
  return data ? JSON.parse(data) : [];
};

export const addMessage = (message: Omit<ContactMessage, 'id' | 'date'>): ContactMessage => {
  const messages = getMessages();
  const newMessage: ContactMessage = { 
    ...message, 
    id: new Date().toISOString(), 
    date: new Date().toLocaleString('ar-SA')
  };
  localStorage.setItem(MESSAGES_KEY, JSON.stringify([newMessage, ...messages]));
  return newMessage;
};

// --- Statistics Management ---
export const getVisitCount = (): number => {
  const count = localStorage.getItem(VISITS_KEY);
  return count ? parseInt(count, 10) : 0;
};

export const incrementVisitCount = (): void => {
  // Simple increment on each page load. For "unique" visits, a session-based check could be added.
  const currentCount = getVisitCount();
  localStorage.setItem(VISITS_KEY, (currentCount + 1).toString());
};
