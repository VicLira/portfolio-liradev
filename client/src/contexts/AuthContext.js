import React, { createContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export function AuthProvider({ children, redirectTo }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    // Ainda não foi criado, mas tem itenção manter usuario logado mesmo que ele feche a pagina
    // useEffect(() => {
    //     const token = Cookies.get('reactauth.token');

    //     if (token) {
    //         fetchUserDetails(token);
    //     }
    // }, []);

    // async function fetchUserDetails(token) {
    //     try {
    //         const response = await fetch(`http://${process.env.API_PATH}/users/fetchUserDetails`, {
    //             headers: {
    //                 'Authorization': `Bearer ${token}`
    //             }
    //         });
    //         if (response.ok) {
    //             const userData = await response.json();
    //             setUser(userData.user);
    //             if (redirectTo) {
    //                 redirectTo('/profile');
    //             }
    //         } else {
    //             handleAuthError(response.status);
    //         }
    //     } catch (error) {
    //         handleAuthError(error);
    //     }
    // }

    async function signIn({ email, password, to, navigate }) {
        

        try {
            const response = await fetch(`http://${process.env.API_PATH}/users/signIn`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const { token, user } = await response.json();

                Cookies.set('reactauth.token', token, {
                    expires: 1 / 24 // 1 hour in days
                });

                setUser(user);
                if (to) {
                    setUser({email, password});
                    setIsAuthenticated(true);
                    navigate(to); // Redireciona usando o valor de "to"
                } else if (redirectTo) {
                    navigate(redirectTo); // Redireciona usando o "redirectTo" do AuthProvider
                }
            } else {
                handleAuthError(response.status);
            }
        } catch (error) {
            handleAuthError(error);
        }
    }

    function handleAuthError(error) {
        console.error('Erro de autenticação:', error);
        // Tratar o erro de autenticação aqui, por exemplo, redirecionar para uma página de erro.
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    );
}
