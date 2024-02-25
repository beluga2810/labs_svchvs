import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './../styles/header.css';
import Home from './../pages/Home'
import Doctors from '../pages/Personel';
import SchedulePage from '../pages/SchedulePage';
import RoomPage from './../pages/RoomPage'
import QuestionsPage from '../pages/QuestionsPage';
import Auth from '../pages/Auth';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import UserPage from '../pages/UserPage';
import { setUserData, clearUserData } from '../toolkitRedux/slice';

const Header = () => {
    const dispatch = useDispatch();
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const decodedToken = jwtDecode(token);

            if (decodedToken) {
                dispatch(setUserData({ id: decodedToken.id, username: decodedToken.username, role: decodedToken.role }));
            }
        }
    }, [dispatch, isAuthenticated]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false)
        dispatch(clearUserData());
    };

    return (
        <>
            <Router>
                <nav className="navbar navbar-expand-lg header-container">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">Молочный комбинат</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link " active aria-current="page" href="/">Главная</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/doctors">Персонал</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/schedule">График</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href='/rooms'>Кабинеты</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href='/questions'>FAQ</a>
                                </li>
                                {!isAuthenticated && (
                                    <li className="nav-item">
                                        <a className="nav-link" href="/auth">Войти</a>
                                    </li>
                                )}
                                {isAuthenticated && (
                                    <>
                                        <li className="nav-item">
                                            <a className="nav-link" href='/user'>Профиль</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/" onClick={handleLogout}>Выйти</a>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </nav>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route exect path='/Doctors' element={<Doctors />} />
                    <Route exect path='/schedule' element={<SchedulePage />} />
                    <Route exect path='/rooms' element={<RoomPage />} />
                    <Route exect path='/questions' element={<QuestionsPage />} />
                    <Route exect path='/auth' element={<Auth />} />
                    {isAuthenticated &&
                        <Route exect path='/user' element={<UserPage />} />
                    }
                </Routes>
            </Router>
        </>

    );
}

export default Header;