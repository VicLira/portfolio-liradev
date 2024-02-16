import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

import '../../global/Styles.css';
import './Login.css';
import Field from '../../components/Field';
import LoadImg from '../../components/LoadImg';

function Login() {
    // const auth = useContext(AuthContext);
    const [formData, setFormData] = useState();
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSignIn = async (event) => {
        event.preventDefault();
        try {
            const { input_email: email, input_password: password } = formData;
            console.log(email, password)
            await signIn({ email, password, to: '/profile', navigate });
            
        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
    };

    return (
        <section id='login'>
            <div className='side-wrapper'>
                <LoadImg classes='auth-img' imgTitle='Uma imagem de um simples robô dando oi' imgURL={require('../../public/images/login-img.png')} />
            </div>

            <div className='side-wrapper'>
                <div className='auth-wrapper'>
                    <form onSubmit={handleSignIn}>
                        <h1 className='primary-title white'>Login</h1>
                        <Field inputType='email' inputName='email' placeholder='Email' onChange={handleChange} />
                        <Field inputType='password' inputName='password' placeholder='Senha' onChange={handleChange} />
                        <button type="submit" className='primary-btn'>Submit</button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Login;
