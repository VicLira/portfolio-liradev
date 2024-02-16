import React, { useContext, useEffect } from 'react';
import {
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from 'react-router-dom';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import NewExperience from './pages/NewExperience';
import NewArticle from './pages/NewArticle';
import About from './pages/About';
import CardDetails from './pages/CardDetails';

function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth_login');
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/auth_login',
    element: <Login />,
  },
  {
    path: '/profile',
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
  },
  {
    path: '/new_experience',
    element: (
      <PrivateRoute>
        <NewExperience />
      </PrivateRoute>
    ),
  },
  {
    path: '/new_article',
    element: (
      <PrivateRoute>
        <NewArticle />
      </PrivateRoute>
    ),
  },
  {
    path: '/details/:id',
    element: <CardDetails />,
    loader: ({ params }) => {
      // Valide o ID aqui (por exemplo, verifique se é um número válido)
      const isValidId = /^\d+$/.test(params.id);
      if (!isValidId) {
        // Redirecione para uma página de erro ou retorne null para renderizar nada
        return null;
      }
  
      // Carregue os dados do card usando o ID
      return fetch(`http://localhost:5000/cards/${params.id}`).then((response) => response.json());
    },
  },
  {
    path: '/about',
    element: <About />,
  },
]);

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
