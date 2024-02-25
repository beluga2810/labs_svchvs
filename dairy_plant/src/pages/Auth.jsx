import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserData, clearUserData } from '../toolkitRedux/slice';
import './../styles/authPage.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Auth = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistration, setIsRegistration] = useState(false);
    const [error, setError] = useState('');

    const handleAuth = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setError('Please fill in all fields.');
            return;
        }

        if (isRegistration && password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:3001/${isRegistration ? 'register' : 'login'}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();

            localStorage.setItem('token', result.token);
            dispatch(setUserData({ username }));

            window.location.href = '/';
        } catch (error) {
            console.error('Error:', error);
            dispatch(clearUserData());
            toast.error('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="custom-container">
            <div className="custom-row justify-content-center mt-5">
                <div className="custom-col-md-6">
                    <form>
                        <div className="custom-form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                className="custom-form-control"
                                placeholder="Enter username"
                                value={username}
                                id="username"
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="custom-form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="custom-form-control"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {isRegistration && (
                            <>
                                <div className="custom-form-group">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input
                                        type="password"
                                        className="custom-form-control"
                                        placeholder="Confirm Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </>
                        )}

                        {error && <p className="error-message">{error}</p>}

                        <button className="custom-btn custom-btn-primary" onClick={handleAuth}>
                            {isRegistration ? 'Register' : 'Login'}
                        </button>

                        {!isRegistration && (
                            <button className="custom-btn custom-btn-link" onClick={() => setIsRegistration(true)}>
                                Create an account
                            </button>
                        )}
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Auth;
