import React, { useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import '../../global/Styles.css';
import './NewArticle.css';
import Field from '../../components/Field';

import { IoIosAddCircle } from "react-icons/io";
import { FaCircleChevronLeft } from "react-icons/fa6";


function NewArticle() {
  const [formData, setFormData] = useState({
    input_title: '',
    input_description: '',
    input_thumbnailSrc: null,
    input_tags: '',
    input_author: '',
    input_date: new Date()
  });

  const MySwal = withReactContent(Swal);

  const handleInputChange = (event) => {
    const { name, value} = event.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }))
  };

  const handleImageChange = async() => {
    const { value: thumbnailSrc } = await MySwal.fire({
      title: 'Enter Image URL',
      input: 'url',
      inputLabel: 'ThumbnailSrc URL',
      inputPlaceholder: 'Enter the URL of the image'
    });

    if (thumbnailSrc) {
      setFormData(prevState => ({
        ...prevState,
        input_thumbnailSrc: thumbnailSrc
      }));
    }
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
      const {
        input_title: title,
        input_description: description,
        input_thumbnailSrc: thumbnailSrc,
        input_tags: tags,
        input_author: author,
        input_date: date
      } = formData;

      console.log('Form Data:', formData);

      const response = await axios.post(`http://${process.env.API_PATH}/cards`, {
        title,
        description,
        thumbnail_src: thumbnailSrc,
        tags: tags.split(",").map(tag => tag.trim()),
        author,
        date
      })
      
      console.log(response);
      MySwal.fire({
        title: 'Sucesso!',
        text: "Artigo postado com sucesso!",
        icon: "success"
      })
    } catch(error) {
      MySwal.fire({
        title: 'Falha ao postar!',
        text: error,
        icon: "error"
      })
    }
  }



  return (
    <section id='new-experience'>
      <Link to={'/profile'}>
        <FaCircleChevronLeft className='turn-btn'/>
      </Link>
      <div className='container'>
        <div className='col'>
          <div className='img-wrapper'>
            {formData.input_thumbnailSrc ? (
              <img src={formData.input_thumbnailSrc} alt="Logo de onde trabalhou" />
            ) : (
              <div onClick={handleImageChange}>
                <IoIosAddCircle className='add-icon'/>
              </div>
            )}
          </div>
        </div>

        <div className='col'>
          <div className='form-wrapper'>
            <h1 className='primary-title white'>New Article</h1>
            <form className='add-form' onSubmit={handleSubmit}>
              <Field inputType={'text'} inputName={'title'} placeholder={'Title'} onChange={handleInputChange} />
              <Field inputType={'text'} inputName={'description'} placeholder={'Description'} onChange={handleInputChange} />
              <Field inputType={'text'} inputName={'tags'} placeholder={'Tags (IA, MACHINE-LEARNING)'} onChange={handleInputChange} />
              <Field inputType={'text'} inputName={'author'} placeholder={'Author'} onChange={handleInputChange} />
            <button type='submit' className='primary-btn'>Submit</button>
            </form> 

          </div>
        </div>
      </div>
    </section>
  );
}

export default NewArticle;
