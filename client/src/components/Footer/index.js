import React from 'react';
import './Footer.css';

import { NavLink, useLocation } from 'react-router-dom';

function Footer() {
  const location = useLocation();

  const scrollToSection = (elementName) => {
    const section = document.getElementById(elementName);
    if (section) {
      const yOffset = -100; // Define o deslocamento que deseja aplicar (em pixels)
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const getHeaderText = () => {
    if (location.pathname === '/about') {
        return ['/', 'Home'];
    } else {
        return ['/about', 'Sobre'];
    }
  };

  return (
    <footer className='footer'>
        <div>
          <ul className='footer-list'>
              <NavLink to={getHeaderText()[0]}>{getHeaderText()[1]}</NavLink>
              <li onClick={() => scrollToSection('experiences-carousel')}>Experiências</li>
          </ul>
        </div>

        <div> <span className='footer-logo'>Agradeço a Atenção!</span> </div>
        
        <div>
          <ul className='footer-list'>
            <li onClick={() => scrollToSection('projects-carousel')}>Projetos</li>
            <li onClick={() => scrollToSection('blog-divisor')}>Artigos</li>
          </ul>
        </div>

    </footer>
  );
}

export default Footer;
