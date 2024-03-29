import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import '../../global/Styles.css';
import './NewExperience.css';
import Field from '../../components/Field';

import { IoIosAddCircle } from "react-icons/io";
import { FaCircleChevronLeft } from "react-icons/fa6";

function NewExperience() {
  const API_PATH = process.env.REACT_APP_API_PATH;
  const [formData, setFormData] = useState({
    input_title: '',
    input_description: '',
    input_roles: '',
    input_type: '',
    input_startDate: null,
    input_endDate: null,
    input_image_url: null
  });

  const MySwal = withReactContent(Swal);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
      setFormData(prevState => ({
          ...prevState,
          [name]: value
      }));
  };

  const handleImageChange = async () => {
    const { value: imageUrl } = await MySwal.fire({
      title: 'Enter Image URL',
      input: 'url',
      inputLabel: 'Image URL',
      inputPlaceholder: 'Enter the URL of the image'
    });

    if (imageUrl) {
      setFormData(prevState => ({
        ...prevState,
        input_image_url: imageUrl
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const {
        input_image_url: image_url,
        input_title: title,
        input_description: description,
        input_roles: roles,
        input_type: type,
        input_startDate: startDate,
        input_endDate: endDate,
      } = formData;
      
      console.log('Form Data:', formData);
      
      const response = await axios.post(`${API_PATH}/experiences`, {
        image_url,
        title,
        description,
        start_date: startDate,
        end_date: endDate,
        roles: roles == null ? 'Sem roles para carregar' : roles.split(",").map(tag => tag.trim()),
        type,
      });

      // Resetando os campos do formulário
      setFormData({
        image_url: null,
        title: '',
        description: '',
        start_date: null,
        end_date: null,
        roles: '',
        type: ''
      });


      MySwal.fire({
        title: 'Sucesso!',
        text: "Experiencia postada com sucesso!",
        icon: "success"
      })
    } catch(error) {
      MySwal.fire({
        title: 'Falha ao postar!',
        text: error,
        icon: "error"
      })
    }
  };

  return (
    <section id='new-experience'>
      <Link to={'/profile'}>
        <FaCircleChevronLeft className='turn-btn'/>
      </Link>
      
      <div className='container'>
        <div className='col'>
          <div className='img-wrapper'>
            {formData.input_image_url ? (
              <img src={formData.input_image_url} alt="Logo de onde trabalhou" />
            ) : (
              <div onClick={handleImageChange}>
                <IoIosAddCircle className='add-icon'/>
              </div>
            )}
          </div>
        </div>

        <div className='col'>
          <div className='form-wrapper'>
            <h1 className='primary-title white'>New Experience</h1>
            <form className='add-form' onSubmit={handleSubmit}>
              <Field inputType={'text'} inputName={'title'} placeholder={'Name'} onChange={handleInputChange} isTextarea={false}/>
              <Field inputType={'text'} inputName={'description'} placeholder={'Description'} onChange={handleInputChange} isTextarea={true}/>
              <Field inputType={'text'} inputName={'roles'} placeholder={'Roles(front, back)'} onChange={handleInputChange} isTextarea={false}/>
              <Field inputType={'text'} inputName={'type'} placeholder={'Type (job, study)'} onChange={handleInputChange} isTextarea={false}/>
              <div className='col'>
                <Field inputType={'date'} inputName={'startDate'} placeholder={'Start Date'} onChange={handleInputChange} isTextarea={false}/>
                <Field inputType={'date'} inputName={'endDate'} placeholder={'End Date'} onChange={handleInputChange} isTextarea={false}/>
              </div>
              
            <button type='submit' className='primary-btn'>Submit</button>
            </form> 
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewExperience;
