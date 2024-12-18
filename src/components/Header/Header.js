// Header.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollUp, setIsScrollUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userNickname, setUserNickname] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      if (window.scrollY > lastScrollY) {
        setIsScrollUp(true);
      } else {
        setIsScrollUp(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    // 로컬스토리지에서 카카오 닉네임 불러오기
    const storedNickname = localStorage.getItem('savedNickname');
    if (storedNickname) {
      setUserNickname(storedNickname);
      console.log('Set userNickname state from savedNickname:', storedNickname);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const removeKey = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('savedEmail');
    localStorage.removeItem('savedNickname'); 
    setUserNickname(null);
    navigate('/signin');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div id="container">
      <header className={`app-header ${isScrolled ? 'scrolled' : ''} ${isScrollUp ? 'scroll-up' : ''}`}>
        <div className="header-left">
          <div className="logo">
            <Link to="/">
              <img src="/lolo.png" alt="Logo" style={{ height: '100px', width: '100px' }} />
            </Link>
          </div>
          <nav className="nav-links desktop-nav">
            <ul>
              <li><Link to="/">홈</Link></li>
              <li><Link to="/popular">대세 콘텐츠</Link></li>
              <li><Link to="/wishlist">내가 찜한 리스트</Link></li>
              <li><Link to="/search">찾아보기</Link></li>
            </ul>
          </nav>
        </div>
        <div className="header-right">
          {userNickname ? (
            <div className="user-info">
              <span className="user-email">{userNickname}</span>
              <button className="icon-button logout-button" onClick={removeKey}>
                로그아웃
              </button>
            </div>
          ) : (
            <button className="icon-button" onClick={() => navigate('/signin')}>
              <FontAwesomeIcon icon={faUser} />
            </button>
          )}
          <button className="icon-button mobile-menu-button" onClick={toggleMobileMenu}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </header>

      <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
        <button className="close-button" onClick={toggleMobileMenu}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <nav>
          <ul>
            <li><Link to="/" onClick={toggleMobileMenu}>홈</Link></li>
            <li><Link to="/popular" onClick={toggleMobileMenu}>대세 콘텐츠</Link></li>
            <li><Link to="/wishlist" onClick={toggleMobileMenu}>내가 찜한 리스트</Link></li>
            <li><Link to="/search" onClick={toggleMobileMenu}>찾아보기</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;