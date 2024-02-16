import React from 'react';
import './Header.css';
import '../../global/Styles.css';

import { NavLink, useLocation } from 'react-router-dom';

function Header() {
    const location = useLocation();

    // Função para rolar até a seção desejada
    const scrollToSection = (elementName) => {
        const section = document.getElementById(elementName);
        if (section) {
            const yOffset = -100; // Define o deslocamento que deseja aplicar (em pixels)
            const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    // Determinar o texto para exibir com base na rota atual
    const getHeaderText = () => {
        if (location.pathname === '/about' ||
            location.pathname === '/profile') {
            return ['/', 'Home'];
        } else {
            return ['/about', 'Sobre'];
        }
    };

    return (
        <header className='header'>
            <div>
                <ul className='header-list'>
                    <NavLink to={getHeaderText()[0]}>{getHeaderText()[1]}</NavLink>
                    {location.pathname !== '/about' && location.pathname !== '/profile' && (
                    <li onClick={() => scrollToSection('experiences-carousel')}>Experiências</li>
                    )}
                </ul>
            </div>

            <div>
                <NavLink to={'/'} className='header-logo'>Victor Lira | Engenheiro de Dados</NavLink>
            </div>
            
            <div>
            {location.pathname !== '/about' && location.pathname !== '/profile' && (
                <ul className='header-list'>
                    <li onClick={() => scrollToSection('projects-carousel')}>Projetos</li>
                    <li onClick={() => scrollToSection('blog-divisor')}>Artigos</li>
                </ul>
            )}
            </div>
        </header>
    );
}

export default Header;
