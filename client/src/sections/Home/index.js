import React from 'react';

import '../../global/Styles.css';
import './Home.css';

import SocialMedia from '../../components/SocialMedia';

import homePicSrc from '../../public/images/home-pic.png';
import homeDivisorSrc from '../../public/images/home-divisor.svg';
import Header from '../../components/Header';

function homePic() {
  return <img className='homePic' src={homePicSrc} alt="Retrato de Victor Lira, autor da página" />;
}

function homeDivisor() {
  return <img className='homeDivisor' src={homeDivisorSrc} alt="Retrato de Victor Lira, autor da página" />;
}

function Home() {

  return (
    <section id='home'>
        <Header />
        <div className='container'>
          <div className='text-block'>
            
            <div className='text-block-header'>
              <div>
                <h3>Olá, me chamo Victor Lira</h3>
                <span>Engenheiro de Dados</span>
              </div>
              

              <SocialMedia orientation="horizontal"/>

            </div>

            <div className='text-block-body'>
              <h1 className='primary-title'>Apaixonado por Tecnologia</h1>
              <h2 className='secondary-title'>Apaixonado por Dados</h2>
            </div>
          </div>

          {homePic()}
        </div>
        {homeDivisor()}
    </section>
  );
}

export default Home;
