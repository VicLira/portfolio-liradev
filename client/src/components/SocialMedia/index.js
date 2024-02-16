import React from 'react';
import './SocialMedia.css';

import { FaLinkedin, FaGithubSquare } from 'react-icons/fa';
import { FaSquareEnvelope } from 'react-icons/fa6';

function SocialMedia({ orientation }) {
  // Determina as classes CSS com base na orientação
  const socialMediaClasses = orientation === 'vertical' ? 'social-media vertical' : 'social-media horizontal';

  return (
    <div className={socialMediaClasses}>
      <a href="https://www.linkedin.com/in/vic-lira/"><FaLinkedin className='social-icon'/></a> 
      <a href="https://github.com/VicLira"><FaGithubSquare className='social-icon'/></a>
      <a href="mailto:victor.liracarlos@gmail.com"><FaSquareEnvelope className='social-icon'/></a> 
    </div>
  );
}

export default SocialMedia;
