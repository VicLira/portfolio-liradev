import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import '../../global/Styles.css';
import './CardGroup.css';

import { FaCalendarAlt } from "react-icons/fa";
import Line from '../Line';
import LoadImg from '../LoadImg';

function CardGroup() {
    const [cardData, setCardData] = useState([]);
    const API_PATH = process.env.REACT_APP_API_PATH;

    useEffect(() => {
        const fetchCardData = async () => {
            try {
                const response = await axios.get(`${API_PATH}/cards`);
                setCardData(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados dos cards:', error);
            }
        };

        fetchCardData();
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 3; // Número de cards por página

    // Lógica para calcular os índices dos cards na página atual
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = cardData.slice(indexOfFirstCard, indexOfLastCard);

    // Número total de páginas
    const totalPages = Math.ceil(cardData.length / cardsPerPage);

    // Função para mudar a página
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Gerar os botões de paginação dinamicamente
    const renderPageNumbers = () => {
        const pageNumbers = [];

        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => paginate(i)}
                    className={currentPage === i ? 'active pagination-button' : 'pagination-button'}
                >
                    {i}
                </button>
            );
        }

        return pageNumbers;
    };

    return (
        <div className='card-group-wrapper'>

            {/* INICIO CARD-GROUP*/}
            <div className='card-group'>
                {currentCards == null ? 'CurrentCards Sem dados' : currentCards.map(card => (
                    <div key={card._id} className='card'>

                        <div className='card-top'>
                            <LoadImg classes={'blog-img'} imgURL={card.thumbnail_src} imgTitle={"Imagem do blog"} />
                        </div>

                        {/* INICIO CARD-BODY*/}
                        <div className='card-body'>
                            <h3 className='terteary-title'>{card.title}</h3>
                            <p className='primary-text'>
                                {/* LIMITADOR DE CARACTERES */}
                                {card.description.length > 200 ? card.description.slice(0, 200) + '...' : card.description}
                            </p>
                        </div>

                        {/* INICIO CARD-FOOTER*/}
                        <div className='card-footer'>
                            <div className='card-date'>
                                <FaCalendarAlt className='card-icon'/>
                                <span className='primary-text'> {new Date(card.date).toLocaleDateString('pt-BR')}</span>
                            </div>
                            <Link className='button-wrapper' to={`/details/${card._id}`}>
                                <button className='card-button'>
                                    Ler Mais
                                </button>
                            </Link>
                        </div>
                        {/* FIM CARD-FOOTER*/}
                    </div>
                ))}
                {/* FIM CARD*/}
            </div>

            <div className="pagination">
                <Line />
                <div>
                    {renderPageNumbers()}
                </div>
                <Line />
            </div>
        </div>
    );
}

export default CardGroup;
