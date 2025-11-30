
import React from 'react';
import { Link } from 'react-router-dom';

const NavLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
    <Link
      to={to}
      className="relative text-white text-lg font-medium transition-colors duration-300 hover:text-hamoude-accent group cursor-pointer"
    >
      {children}
      <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-hamoude-accent transition-all duration-300 group-hover:w-full"></span>
    </Link>
);

const Header: React.FC = () => {
  return (
    <header className="bg-hamoude-primary sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer">
          <div className="bg-hamoude-accent text-hamoude-primary text-2xl font-bold w-10 h-10 flex items-center justify-center rounded-md">
            H
          </div>
          <span className="text-white text-xl font-bold whitespace-nowrap">شركة الحمود</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
          <NavLink to="/#home">الرئيسية</NavLink>
          <NavLink to="/#about">من نحن</NavLink>
          <NavLink to="/catalog">الكتالوج</NavLink>
          <NavLink to="/#partners">الشركاء</NavLink>
          <NavLink to="/#contact">تواصل معنا</NavLink>
          <NavLink to="/admin">لوحة التحكم</NavLink>
        </nav>
        {/* Mobile menu button can be added here */}
      </div>
    </header>
  );
};

export default Header;
