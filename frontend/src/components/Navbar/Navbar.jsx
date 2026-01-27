import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate, Link } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiLogOut, FiPackage, FiCalendar } from 'react-icons/fi';
import Login from '../Login/Login';
import { useCart } from '../../CartContext/CartContext';
import logoImage from '../../assets/Logo-Miska.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setShowLoginModal(location.pathname === '/login');
    const isAuth = Boolean(localStorage.getItem('loginData'));
    setIsAuthenticated(isAuth);
    if (isAuth) {
      setUserInfo(JSON.parse(localStorage.getItem('userInfo')));
    }
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'Reservations', href: '/book-table' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleLoginSuccess = () => {
    localStorage.setItem('loginData', JSON.stringify({ loggedIn: true }));
    setUserInfo(JSON.parse(localStorage.getItem('userInfo')));
    setIsAuthenticated(true);
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUserInfo(null);
    navigate('/login');
    window.location.reload();
  };

  const UserDropdown = () => {
    return (
      <div className="relative group">
        <button className="flex items-center gap-2 px-3 py-1 rounded-full border 
        border-amber-500/30 hover:border-amber-500 transition-all">
          <div className="w-8 h-8 rounded-full bg-amber-500 text-[#1a120b] 
          flex items-center justify-center font-bold text-sm">
            {userInfo?.name ? userInfo.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <span
            className="hidden md:block text-amber-100 text-sm font-cinzel">
            {userInfo?.name}
          </span>
        </button>

        <div className="absolute right-0 top-full pt-4 w-56 opacity-0 invisible 
        group-hover:opacity-100 group-hover:visible transition-all duration-300 
        transform translate-y-2 group-hover:translate-y-0">
          <div className="bg-[#1a120b] border border-amber-900/50 rounded-lg 
          shadow-2xl overflow-hidden backdrop-blur-md">
            <div className="py-1">
              <Link to="/myorders" className="flex items-center gap-3 px-4 py-3 text-sm 
              text-amber-100/80 hover:bg-amber-900/30 hover:text-amber-500 transition-colors 
              border-b border-amber-900/20">
                <FiPackage /> My Orders
              </Link>
              <Link to="/my-bookings" className="flex items-center gap-3 px-4 py-3 text-sm text-amber-100/80 
              hover:bg-amber-900/30 hover:text-amber-500 transition-colors border-b border-amber-900/20">
                <FiCalendar /> My Bookings
              </Link>
              <button onClick={handleLogout} className="w-full text-left flex items-center gap-3 px-4 py-3 
              text-sm text-red-400 hover:bg-red-900/20 transition-colors">
                <FiLogOut /> Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b border-transparent 
          ${scrolled ? 'bg-[#1a120b]/90 backdrop-blur-md py-3 shadow-lg border-amber-900/30'
            : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logoImage}
              alt="MiskaPho Logo"
              style={{ filter: 'brightness(0) invert(1)' }}
              className="w-12 h-12 md:w-14 md:h-14 object-contain mr-3 group-hover:scale-110 
              transition-transform duration-300"/>
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-dancingscript text-amber-100 font-bold 
              leading-none tracking-wide">
                MiskaPho
              </span>
              <span className="text-[10px] md:text-xs text-amber-500/80 font-cinzel 
              tracking-[0.3em] uppercase ml-1">
                Restaurant
              </span>
            </div>
          </Link>

          {/* menu */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                className={({ isActive }) =>
                  `text-sm font-cinzel uppercase tracking-[0.15em] transition-all duration-300 
                  relative group py-2
                  ${isActive ? 'text-amber-500' : 'text-amber-100/70 hover:text-amber-100'}`
                }>
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-amber-500 transition-all 
                duration-300 group-hover:w-full"></span>
              </NavLink>
            ))}
          </div>

          {/* icon */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              to="/cart"
              className="relative text-amber-100/70 hover:text-amber-500 transition-colors group">
              <FiShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-600 text-[#1a120b] text-[10px]
                w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
            {isAuthenticated ? (
              <UserDropdown />
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="flex items-center gap-2 px-6 py-2 border border-amber-500/50 rounded-full 
                text-xs font-cinzel uppercase tracking-widest text-amber-500 hover:bg-amber-500 
                hover:text-[#1a120b] transition-all duration-300">
                <FiUser /> Login
              </button>
            )}
          </div>

          {/* responsive */}
          <div className="lg:hidden flex items-center gap-4">
            <Link to="/cart" className="relative text-amber-100 hover:text-amber-500">
              <FiShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-[9px] w-4 h-4 
                rounded-full flex items-center justify-center font-bold">{totalItems}</span>
              )}
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="text-amber-500 text-2xl">
              {isOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>

        </div>

        <div className={`fixed inset-0 bg-[#1a120b] z-40 flex flex-col items-center justify-center 
        gap-8 transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `text-2xl font-dancingscript ${isActive ? 'text-amber-500' : 'text-amber-100'}`}>
              {link.name}
            </NavLink>
          ))}
          <div className="h-[1px] w-20 bg-amber-900/50 my-2"></div>
          {isAuthenticated ? (
            <div className="flex flex-col items-center gap-4">
              <Link
                to="/myorders"
                onClick={() => setIsOpen(false)}
                className="text-amber-100/80 hover:text-amber-500 flex items-center gap-2">
                <FiPackage /> My Orders
              </Link>
              <Link
                to="/my-bookings"
                onClick={() => setIsOpen(false)}
                className="text-amber-100/80 hover:text-amber-500 flex items-center gap-2">
                <FiCalendar /> My Bookings
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-400 flex items-center gap-2 mt-4">
                <FiLogOut /> Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => { navigate('/login'); setIsOpen(false); }}
              className="text-xl font-cinzel text-amber-500 border 
              border-amber-500 px-8 py-2 rounded-full">Login
            </button>
          )}
        </div>
      </nav>

      {showLoginModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center 
        justify-center z-[60] p-4 animate-fade-in">
          <div className="bg-[#1a120b] rounded-2xl p-8 w-full max-w-md relative 
          border border-amber-900/50 shadow-2xl">
            <button
              onClick={() => navigate('/')}
              className="absolute top-4 right-4 text-amber-500/50 
            hover:text-amber-500 text-2xl transition-colors">&times;</button>
            <h2 className="text-3xl font-dancingscript text-amber-500 mb-6 text-center">
              Welcome Back
            </h2>
            <Login onLoginSuccess={handleLoginSuccess} onClose={() => navigate('/')} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;