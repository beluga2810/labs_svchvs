import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import './../styles/schedulePage.css'
import ScheduleItem from './../components/ScheduleItem'
import axios from 'axios';

const SchedulePage = () => {
    const [schedules, setSchedules] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:3001/schedules')
            .then(response => {
                setSchedules(response.data);
            })
            .catch(error => {
                console.error('Error fetching schedule data:', error);
            });
    }, []);



    return (
        <>
            <div className="with-header">
                <div className="schedule_page-container">
                    <table>
                        <thead className='schedule_page-thed'>
                            <tr>
                                <th>Кабинет</th>
                                <th>Персонал</th>
                                <th>Дата</th>
                                <th>Время</th>
                                <th>Статус работы</th>
                            </tr>
                        </thead>
                        <tbody className='schedule_page-tbody'>
                            {schedules.map(schedule => (
                                <ScheduleItem key={schedule.id} schedule={schedule} />
                            ))}
                        </tbody>
                    </table>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default SchedulePage;