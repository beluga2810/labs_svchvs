import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import './../styles/schedulePage.css'
import ScheduleItem from './../components/ScheduleItem'
import axios from 'axios';
import { jsPDF } from "jspdf";

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

    const transliterationMap = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'zh', 'з': 'z', 'и': 'i',
        'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
        'у': 'u', 'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ъ': '', 'ы': 'y', 'ь': '',
        'э': 'e', 'ю': 'yu', 'я': 'ya',
        'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'E', 'Ж': 'Zh', 'З': 'Z', 'И': 'I',
        'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T',
        'У': 'U', 'Ф': 'F', 'Х': 'Kh', 'Ц': 'Ts', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Shch', 'Ъ': '', 'Ы': 'Y', 'Ь': '',
        'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya'
    };

    function transliterate(text) {
        return text.split('').map(char => transliterationMap[char] || char).join('');
    }

    function generatePDF() {
        const doc = new jsPDF();

        schedules.forEach(schedule => {
            doc.text(`Doctor: ${transliterate(schedule.doctor)}`, 10, 10);
            doc.text('Status:', 10, 20);
            doc.text(`- ${transliterate(schedule.status)}`, 10, 30);
            doc.text('Room:', 10, 40);
            doc.text(`- ${transliterate(schedule.room)}`, 10, 50);
            doc.text('Date and Time:', 10, 60);
            doc.text(`- Date: ${schedule.date}, Time: ${schedule.time}`, 10, 70);
            doc.addPage();
        });

        doc.save('schedule.pdf');
    }


    return (
        <>
            <div className="with-header">
                <button onClick={generatePDF} style={{ marginTop: '10px', backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Отчет</button>
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