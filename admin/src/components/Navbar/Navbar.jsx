import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu, FiX, FiLogOut, FiPlusCircle, FiList, FiPackage, FiCalendar, FiGrid } from 'react-icons/fi';
import logoImage from '../../assets/Logo-Miska.png';

const navLinks = [
  { name: 'Add Items', href: '/', icon: <FiPlusCircle /> },
  { name: 'List Items', href: '/list', icon: <FiList /> },
  { name: 'Orders', href: '/orders', icon: <FiPackage /> },
  { name: "Bookings", href: "/bookings", icon: <FiCalendar /> },
  { name: "Categories", href: "/category", icon: <FiGrid /> },
];

const AdminNavbar = ({ setToken }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken("");
  };

  return (
    <nav className="bg-[#1a120b]/90 backdrop-blur-md border-b border-amber-900/30 
    shadow-xl sticky top-0 z-50 font-sans transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">

        {/* logo */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <img
            src={logoImage}
            alt="MiskaPho Logo"
            className="w-12 h-12 md:w-14 md:h-14 object-contain mr-3 group-hover:scale-110 
            transition-transform duration-300 brightness-0 invert"
          />
          <span className="text-2xl font-bold bg-gradient-to-r from-amber-200 to-amber-500 
          bg-clip-text text-transparent tracking-wide font-cinzel">Admin Panel</span>
        </div>

        {/* mobile button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-amber-500 text-3xl lg:hidden hover:text-amber-400 transition-colors 
          focus:outline-none p-2 rounded-lg hover:bg-amber-900/20">
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* menu */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map(link => (
            <NavLink
              key={link.name}
              to={link.href}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all 
              duration-300 border border-transparent 
              ${isActive
                  ? 'bg-amber-500 text-[#1a120b] shadow-[0_0_15px_rgba(245,158,11,0.4)] transform scale-105'
                  : 'text-amber-100/70 hover:text-amber-100 hover:bg-amber-900/30 hover:border-amber-500/30'
                }`
              }
            >
              {link.icon}
              <span>{link.name}</span>
            </NavLink>
          ))}

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-red-500/30 text-red-400 
            hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300 cursor-pointer 
            font-bold text-sm ml-4 shadow-lg hover:shadow-red-900/40">
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-[#2a1e14] border-t border-amber-900/30 px-4 py-4 flex flex-col gap-2
        absolute w-full left-0 top-20 shadow-2xl animate-fade-in-down">
          {navLinks.map(link => (
            <NavLink
              key={link.name}
              to={link.href}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all 
              duration-300 border border-transparent
                ${isActive
                  ? 'bg-amber-500 text-[#1a120b] shadow-[0_0_15px_rgba(245,158,11,0.4)] transform scale-105'
                  : 'text-amber-100/70 hover:text-amber-100 hover:bg-amber-900/30 hover:border-amber-500/30'
                }`
              }
            >
              {link.icon}
              <span>{link.name}</span>
            </NavLink>
          ))}

          <button
            onClick={() => {
              setMenuOpen(false);
              handleLogout();
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-red-500/30 text-red-400 
            hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300 cursor-pointer 
            font-bold text-sm ml-4 shadow-lg hover:shadow-red-900/40 justify-start w-full mt-2">
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;