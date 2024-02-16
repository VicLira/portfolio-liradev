import React from 'react';

import '../../global/Styles.css';
import './About.css';
import Header from '../../components/Header';
import SocialMedia from '../../components/SocialMedia';
import LoadImg from '../../components/LoadImg';
import AboutCard from '../../components/AboutCard';


function About() {
  return (
    <section id='about'>
      <Header />
      <div className='container'>
        <div className='col'>
          <div className='card-presentation'>
            <div>
              <h1 className='primary-title white'>Sobre Mim</h1>
              <h2 className='secondary-title white'>Minha Trajetoria</h2>
            </div>
            <SocialMedia />
          </div>
        </div>

        <div className='col'>
          <div className='trail-wrapper'>
            <LoadImg classes={'trail-img'} imgTitle={'imagem de trilha demonstrando onde estudei'} imgURL={require('../../public/images/trail.png')}/>
            <div className='column'>
              <AboutCard 
                classes={'study-trail-item'} 
                imgTitle={'Imagem do Ensino Médio Técnico ETEC Cidade Tiradentes'} 
                imgURL={require('../../public/images/logo_etec_white.png')} 
                studyTitle={'Ensino Médio Técnico | Desenvolvimento de Sistemas'} 
                studyDate={'ETEC de Cidade Tiradentes | 2020 - 2022'}
              />
              <AboutCard 
                classes={'study-trail-item'} 
                imgTitle={'Imagem do Faculdade Sptech'} 
                imgURL={require('../../public/images/sptech_logo.png')}
                studyTitle={'Ensino Médio Técnico | Desenvolvimento de Sistemas'} 
                studyDate={'ETEC de Cidade Tiradentes | 2020 - 2022'}
              />
            </div>
            
          </div>
          <LoadImg classes={'qrcode-card'} imgTitle={'qrcode card para contato whatsapp'} imgURL={require('../../public/images/qrcode-card.png')}/>
        </div>
      </div>
    </section>
  );
}

export default About;
