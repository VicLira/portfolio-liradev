import React from 'react';

import '../../global/Styles.css';
import './BlogDivisor.css';

import blogDivisor01Src from '../../public/images/blog-divisor01.svg';
import blogDivisor02Src from '../../public/images/blog-divisor02.svg';
import robotSrc from '../../public/images/robozinho.png';

function blogDivisor01() {
  return <img className='divisor' src={blogDivisor01Src} alt="divisor da página" />;
}

function blogDivisor02() {
    return <img className='divisor' src={blogDivisor02Src} alt="divisor da página" />;
}

function robotImg() {
    return <img className='robot-img' src={robotSrc} alt="Imagem de um robo, pequeno e fofo" />;
}

function BlogDivisor() {

  return (
    <section id='blog-divisor'>
        {blogDivisor01()}
        <div className='container'>
          <div className='text-block'>
            <h1 className='primary-title'>Descubra meus artigos e estudos por aqui!</h1>
            <p className='primary-text'>Olá, me chamo Victor</p>
            <p className='secondary-text'>Engenheiro de dados</p>
          </div>
          {robotImg()}
        </div>
        {blogDivisor02()}
    </section>
  );
}

export default BlogDivisor;
