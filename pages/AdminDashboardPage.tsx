
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { getProducts, addProduct, deleteProduct, getVisitCount, getMessages } from '../services/dataService';
import { Product, ContactMessage } from '../types';

type Tab = 'products' | 'about' | 'messages';

// --- Product Management Component ---
const ProductManager: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [newProduct, setNewProduct] = useState({ 
        name: '', description: '', imageUrl: 'https://picsum.photos/400/300', 
        price: '', discountPrice: '', details: '', warranty: '' 
    });

    useEffect(() => {
        setProducts(getProducts());
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const priceNum = parseFloat(newProduct.price);
        const discountPriceNum = newProduct.discountPrice ? parseFloat(newProduct.discountPrice) : undefined;
        if (newProduct.name && newProduct.description && !isNaN(priceNum) && newProduct.details && newProduct.warranty) {
            addProduct({ 
                ...newProduct, 
                price: priceNum, 
                discountPrice: discountPriceNum, 
                imageUrl: `https://picsum.photos/seed/${Math.random()}/400/300` 
            });
            setProducts(getProducts());
            setNewProduct({ name: '', description: '', imageUrl: 'https://picsum.photos/400/300', price: '', discountPrice: '', details: '', warranty: '' });
        }
    };

    const handleDeleteProduct = (id: string) => {
        if (window.confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
            deleteProduct(id);
            setProducts(getProducts());
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-4">إضافة منتج جديد</h3>
                <form onSubmit={handleAddProduct} className="space-y-4">
                    <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} placeholder="اسم المنتج" className="w-full p-2 border rounded" required />
                    <input type="text" name="description" value={newProduct.description} onChange={handleInputChange} placeholder="وصف المنتج" className="w-full p-2 border rounded" required />
                    <textarea name="details" value={newProduct.details} onChange={handleInputChange} placeholder="التفاصيل الكاملة للمنتج" className="w-full p-2 border rounded" required rows={4}></textarea>
                    <textarea name="warranty" value={newProduct.warranty} onChange={handleInputChange} placeholder="معلومات الضمان" className="w-full p-2 border rounded" required rows={2}></textarea>
                    <input type="number" name="price" value={newProduct.price} onChange={handleInputChange} placeholder="السعر الأصلي" className="w-full p-2 border rounded" required step="0.01" />
                    <input type="number" name="discountPrice" value={newProduct.discountPrice} onChange={handleInputChange} placeholder="السعر بعد الخصم (اختياري)" className="w-full p-2 border rounded" step="0.01" />
                    <button type="submit" className="w-full bg-hamoude-accent text-white p-2 rounded hover:bg-yellow-600">إضافة المنتج</button>
                </form>
            </div>
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-4">المنتجات الحالية</h3>
                <div className="overflow-x-auto max-h-[60vh]">
                    <table className="w-full text-right">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-3">الاسم</th>
                                <th className="p-3">السعر</th>
                                <th className="p-3">إجراء</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(p => (
                                <tr key={p.id} className="border-b">
                                    <td className="p-3">{p.name}</td>
                                    <td className="p-3">{p.discountPrice || p.price} ₪</td>
                                    <td className="p-3">
                                        <button onClick={() => handleDeleteProduct(p.id)} className="text-red-500 hover:text-red-700">حذف</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// --- About Component ---
const AboutComponent: React.FC = () => {
    const visitCount = getVisitCount();
    return (
        <div className="bg-white p-8 rounded-lg shadow text-center">
            <h3 className="text-2xl font-bold text-hamoude-primary mb-4">حول الموقع</h3>
            <p className="text-lg">عدد زيارات المستخدمين للصفحة الرئيسية:</p>
            <p className="text-6xl font-extrabold text-hamoude-accent mt-2">{visitCount}</p>
        </div>
    );
};

// --- Messages Component ---
const Messages: React.FC = () => {
    const messages: ContactMessage[] = getMessages();
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">رسائل التواصل</h3>
            <div className="overflow-x-auto max-h-[70vh]">
                <table className="w-full text-right">
                    <thead className="bg-gray-50 sticky top-0">
                        <tr>
                            <th className="p-3">الاسم</th>
                            <th className="p-3">البريد الإلكتروني</th>
                            <th className="p-3">الرسالة</th>
                            <th className="p-3">التاريخ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.length > 0 ? messages.map(m => (
                            <tr key={m.id} className="border-b">
                                <td className="p-3 font-medium">{m.name}</td>
                                <td className="p-3 text-gray-600">{m.email}</td>
                                <td className="p-3 whitespace-pre-wrap">{m.message}</td>
                                <td className="p-3 text-sm text-gray-500">{m.date}</td>
                            </tr>
                        )) : (
                            <tr><td colSpan={4} className="text-center p-8 text-gray-500">لا توجد رسائل حالياً.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('products');

  const handleLogout = () => {
    authService.logout();
    navigate('/admin');
  };
  
  const TabButton: React.FC<{ tabName: Tab; label: string }> = ({ tabName, label }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`px-4 py-2 rounded-md font-medium transition-colors ${activeTab === tabName ? 'bg-hamoude-accent text-white' : 'text-gray-600 hover:bg-gray-200'}`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-100 font-sans p-8">
        <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-hamoude-primary">لوحة التحكم</h1>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">تسجيل الخروج</button>
        </header>
        
        <nav className="flex space-x-4 rtl:space-x-reverse mb-8 bg-white p-2 rounded-lg shadow-sm">
            <TabButton tabName="products" label="إدارة الكتالوج" />
            <TabButton tabName="about" label="حول" />
            <TabButton tabName="messages" label="رسائل التواصل" />
        </nav>
        
        <main>
            {activeTab === 'products' && <ProductManager />}
            {activeTab === 'about' && <AboutComponent />}
            {activeTab === 'messages' && <Messages />}
        </main>
    </div>
  );
};

export default AdminDashboardPage;
