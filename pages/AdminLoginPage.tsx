import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [token, setToken] = useState('');
  const [mockToken, setMockToken] = useState('');
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    if (authService.isAuthenticated()) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleCredentialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (credentials.username === 'admin' && credentials.password === 'admin') {
      const generatedToken = Math.floor(100000 + Math.random() * 900000).toString();
      // Log the token to the console for development/testing
      console.log('--- Development 2FA Token ---');
      console.log(`Your verification code is: ${generatedToken}`);
      console.log('-----------------------------');
      setMockToken(generatedToken);
      setStep(2);
      setError('');
    } else {
      setError('اسم المستخدم أو كلمة المرور غير صحيحة.');
    }
  };
  
  const handleTokenVerification = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (token === mockToken) {
      authService.login();
      navigate('/admin/dashboard');
    } else {
      setError('رمز التحقق غير صحيح.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans p-4">
      <div className={`w-full max-w-md bg-white p-8 rounded-lg shadow-lg transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}>
        <div className="text-center mb-8">
           <div className="bg-hamoude-accent text-hamoude-primary text-4xl font-bold w-16 h-16 flex items-center justify-center rounded-md mx-auto mb-4">
            H
          </div>
          <h1 className="text-3xl font-bold text-hamoude-primary">لوحة تحكم المسؤول</h1>
        </div>

        {step === 1 && (
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-700">اسم المستخدم</label>
              <input 
                type="text" 
                name="username"
                value={credentials.username}
                onChange={handleCredentialChange}
                className="w-full mt-2 p-3 border rounded-md focus:ring-hamoude-accent focus:border-hamoude-accent" 
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-gray-700">كلمة المرور</label>
              <input 
                type="password" 
                name="password"
                value={credentials.password}
                onChange={handleCredentialChange}
                className="w-full mt-2 p-3 border rounded-md focus:ring-hamoude-accent focus:border-hamoude-accent" 
                dir="ltr"
              />
            </div>
            <button type="submit" className="w-full bg-hamoude-primary text-white p-3 rounded-md hover:bg-blue-900 transition-colors">تسجيل الدخول</button>
          </form>
        )}

        {step === 2 && (
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">التحقق الثنائي (2FA)</h2>
            <p className="text-gray-600 mb-6">
              تم إرسال رمز التحقق إلى بريدك الإلكتروني المسجل (`m***@gmail.com`).
              <br />
              <span className="text-sm text-gray-500">(لأغراض التجربة، تحقق من وحدة تحكم المطور F12).</span>
            </p>
            <form onSubmit={handleTokenVerification} className="space-y-4">
                <input
                    type="text"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    className="w-full text-center p-3 border rounded-md focus:ring-hamoude-accent focus:border-hamoude-accent text-2xl tracking-widest"
                    placeholder="_ _ _ _ _ _"
                    maxLength={6}
                    dir="ltr"
                />
                <button type="submit" className="w-full bg-hamoude-accent text-white p-3 rounded-md hover:bg-yellow-600 transition-colors">تحقق</button>
            </form>
          </div>
        )}
        
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default AdminLoginPage;