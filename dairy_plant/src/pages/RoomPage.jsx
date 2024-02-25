import './../styles/roomPage.css'
import Footer from '../components/Footer';
import React, { useState, useEffect } from 'react';
import RoomItem from '../components/RoomItem';
import axios from 'axios';

const RoomPage = () => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/schedules')
            .then(response => {
                setRooms(response.data);
            })
            .catch(error => {
                console.error('Error fetching schedule data:', error);
            });
    }, []);



    return (
        <>
            <div className="with-header">
                <p className="roomPage-title">Информация о кабинетах</p>
                <div className="roomPage-container">
                    {rooms.map(room => (
                        <RoomItem key={room.id} room={room} />
                    ))}
                </div>
                <Footer />
            </div>
        </>
    );
}

export default RoomPage;