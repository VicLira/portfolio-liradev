import React, { useState, useEffect} from 'react';
import axios from 'axios';

import '../../global/Styles.css';
import './Experiences.css';

import Carousel from '../../components/Carousel';

function Experiences() {
  const [experienceStudyData, setExperienceStudyData] = useState([]);
  const [experienceJobData, setExperienceJobData] = useState([]);
  const API_PATH = process.env.REACT_APP_API_PATH;

  useEffect(() => {
    const fetchExperienceStudyData = async () => {
      try {
        const response = await axios.get(`${API_PATH}/experiences/type/?type=study`)
        console.log(response.data)
        setExperienceStudyData(response.data)
          } catch(error) {
              console.error('Erro ao buscar dados das experiências:', error);
          }
      };

      fetchExperienceStudyData();
  }, [])

  useEffect(() => {
      const fetchExperienceJobData = async () => {
          try {
              const response = await axios.get(`${API_PATH}/experiences/type/?ctype=job`)
              console.log(response.data)
              setExperienceJobData(response.data)
          } catch(error) {
              console.error('Erro ao buscar dados das experiências:', error);
          }
      };

      fetchExperienceJobData();
  }, []);

  return (
    <section id='experiences'>
        <div className='container'>
          <section id='projects-carousel'><Carousel imgPosition='right' showText={true} carouselData={experienceStudyData} /></section>
          <section id='experiences-carousel'><Carousel imgPosition='left' showText={true} carouselData={experienceJobData}/></section>
        </div>
    </section>
  );
}

export default Experiences;
