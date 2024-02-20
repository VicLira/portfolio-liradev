import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../../global/Styles.css';
import './CardDetails.css';

import LoadImg from '../../components/LoadImg';

import { FaCalendarAlt } from "react-icons/fa";
import { FaCircleChevronLeft } from "react-icons/fa6";
// import { AiOutlineLike, AiFillLike } from "react-icons/ai";

function CardDetails() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    // const [likes, setLikes] = useState(0);
    // const [curtido, setCurtido] = useState(false);

    // const handleCurtir = () => {
    //     axios.post(`/curtir/?id=${data._id}`)
    //     .then(response => setLikes(response.data.likes))
    //     .catch(error => console.error('Erro ao curtir:', error));
    //     setCurtido(true);
    // };

    // const handleDescurtir = () => {
    //     axios.post(`descurtir/?id=${data._id}`)
    //       .then(response => setLikes(response.data.likes))
    //       .catch(error => console.error('Erro ao descurtir:', error));
    //     setCurtido(false);
    // };
  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://${process.env.API_PATH}/cards/${id}`);
                setData(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados dos cards:', error);
            }
        };

        fetchData();
    }, [id]);
  
    return (
    <>
    {data && (
        <section id='card-details-wrapper'>
            <Link to={'/'}>
                <FaCircleChevronLeft className='turn-btn'/>
            </Link>
        <div className='container'>
            <div className='col'>
                <LoadImg classes={'card-details-img'} imgURL={`${data.thumbnail_src}`} imgTitle={`Teste sincero`}/>

                <div className='row'>
                    <FaCalendarAlt className='white'/>
                    <span className='primary-text white'>{new Date(data.date).toLocaleDateString('pt-BR')}</span>
                </div>
                {/* <div className='row'>
                    <div  onClick={curtido ? handleDescurtir : handleCurtir}>
                        {curtido ? <AiOutlineLike color="white" /> : <AiFillLike color="white" />}
                    </div>
                    <span className='primary-text white'>{data.likes} Likes</span>
                </div> */}

            </div>
            <div className='col'>
                <div className='card-detail-header'>
                    <h2 className='primary-title white'>{data.title}</h2>
                    <h3 className='terteary-title white'>{data.autor}</h3>
                </div>
                
                <p className='primary-text white'>{data.description}</p>
            </div>
        </div>
            
            
        </section>
    )}
    </>
);
};
  

export default CardDetails;
