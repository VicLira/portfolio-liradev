import React from 'react';
import { Link } from 'react-router-dom';

import '../../global/Styles.css';
import './Profile.css';
import Header from '../../components/Header';
import Button from '../../components/Button';

import { IoIosAddCircle } from "react-icons/io";


function Profile() {
  return (
    <section id='profile'>
      <Header />
      <div className='container'>
        <div className='img-side side'>

        </div>
        <div className='add-side side'>
          <div className='add-card'>
            <h1 className='primary-title white'>Profile</h1>
            <div className='buttons-wrapper'>
              <Link to="/new_article" className='add-btn-wrapper'>
                <Button classes={'add-btn'} buttonText={'Add Article'}/>
                <IoIosAddCircle className='btn-icon' />
              </Link>

              <Link to="/new_experience" className='add-btn-wrapper'>
                  <Button classes={'add-btn'} buttonText={'Add Experience'}/>
                  <IoIosAddCircle className='btn-icon' />
              </Link>
              
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

export default Profile;
