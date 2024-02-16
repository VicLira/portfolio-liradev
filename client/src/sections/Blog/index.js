import React from 'react';

import '../../global/Styles.css';
import './Blog.css';
import CardGroup from '../../components/CardGroup';
import Footer from '../../components/Footer';

function Blog() {

  return (
    <section id='blog'>
        <div className='container'>
            <CardGroup />
        </div>
        <Footer />
    </section>
  );
}

export default Blog;
