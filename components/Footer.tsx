
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-hamoude-primary text-white py-8">
      <div className="container mx-auto px-6 text-center">
        <p>&copy; {new Date().getFullYear()} شركة الحمود للمواد الكهربائية. جميع الحقوق محفوظة.</p>
        <div className="mt-4">
          <Link to="/admin" className="text-sm text-gray-400 hover:text-white transition-colors">
            Admin Panel
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
