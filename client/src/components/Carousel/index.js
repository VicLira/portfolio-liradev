import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../global/Styles.css';
import './Carousel.css';

function loadImg(selectedItemIndex, index, itemTitle, imageURL) {
    return <img
        key={index}
        className={`selected carousel-img ${index === selectedItemIndex ? 'selected' : index < selectedItemIndex ? 'prev' : 'next'}`}
        src={imageURL}
        alt={`Imagem ${itemTitle}`}
    />
}

function Carousel({ imgPosition, showText, carouselData }) {
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);

    // Função que baseado no tamanho da lista, retorna o próximo item ao item selecionado
    const nextItem = () => {
        setSelectedItemIndex((selectedItemIndex + 1) % carouselData.length);
    };

    // Função que baseado no tamanho da lista, retorna o item anterior ao item selecionado
    const prevItem = () => {
        setSelectedItemIndex((selectedItemIndex - 1 + carouselData.length) % carouselData.length);
    };

    // Função de mensagem caso os dados não sejam carregados
    if (!carouselData || carouselData.length === 0) {
        return <div>Nenhum dado disponível para exibição.</div>;
    }

    return (
        <div className={'carousel-wrapper'}>
            {/* INICIO ITEM CAROSSEL */}
            <div className={`carousel-item selected ${showText ? '' : 'no-text'} ${imgPosition}`}>
                {/* INICIO TEXTO CAROSSEL */}
                {showText && (
                    <div className={`carousel-text-wrapper ${imgPosition === 'left' ? 'text-left' : 'text-right'}`}>
                        <div>
                            <h2 className='secondary-title'>{carouselData[selectedItemIndex].title}</h2>
                            <p className='primary-text'>{carouselData[selectedItemIndex].description}</p>
                        </div>
                        <div>
                            <h2 className='secondary-title'>Meu Papel</h2>
                            {carouselData[selectedItemIndex] && carouselData[selectedItemIndex].roles && (
                                <ul>
                                    {carouselData[selectedItemIndex] == null ? 'Sem dados carousel para carregar' : carouselData[selectedItemIndex].roles.map((role, roleIndex) => (
                                        <li key={roleIndex} className='carousel-role'>{role}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                )}
                {/* FIM TEXTO CAROSSEL */}
                {/* INICIO IMAGEM CAROSSEL */}
                <div className={`carousel-img-wrapper`}>
                    {carouselData == null ? 'Sem dados para carregar' : carouselData.map((item, index) => {
                        if (index === selectedItemIndex - 1 || index === selectedItemIndex || index === selectedItemIndex + 1) {
                            return loadImg(selectedItemIndex, index, item.title, item.image_url);
                        }
                        return null;
                    })}
                
                    {/* INICIO CONTROLES DO CAROSSEL */}
                    <div className='carousel-control-wrapper'>
                        <button onClick={prevItem} className='carousel-control prev'>&#x022C0;</button>
                        <button onClick={nextItem} className='carousel-control next'>&#x022C1;</button>
                    </div>
                    {/* FIM CONTROLES DO CARROSEL CAROSSEL */}
                </div>
                {/* FIM IMAGEM CAROSSEL */}
                
            </div>
            {/* FIM ITEM CAROSSEL */}
        </div>
    );
}

Carousel.propTypes = {
    imgPosition: PropTypes.oneOf(['left', 'right']),
    showText: PropTypes.bool,
};

Carousel.defaultProps = {
    imgPosition: 'left',
    showText: true,
};

export default Carousel;
