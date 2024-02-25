import React, { useState, useEffect } from 'react';
import PersonelItem from '../components/PersonelItem';
import Footer from '../components/Footer';
import axios from 'axios';
import { jsPDF } from "jspdf";
import { ToastContainer } from 'react-toastify';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const Personel = () => {
  const [doctors, setPersonel] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/personnel');
        setPersonel(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // toast.error('Error fetching data');
      }
    };
    fetchData();
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

    doctors.forEach(doctor => {
      doc.text(`Name: ${transliterate(doctor.name)}`, 10, 10);
      doc.text('Members:', 10, 20);
      doctor.members.forEach((member, index) => {
        const yPos = 30 + index * 10;
        doc.text(`- ${transliterate(member.name)} (${member.contact}, Experience: ${transliterate(member.experience)})`, 10, yPos);
      });
      doc.text('Schedule:', 10, 80);
      doctor.schedule.forEach((schedule, index) => {
        const yPos = 90 + index * 10;
        doc.text(`- Date: ${schedule.date}, Time: ${schedule.time}, Room: ${transliterate(schedule.room)}`, 10, yPos);
      });
      doc.addPage();
    });

    doc.save('personnel.pdf');
  }

  if (doctors.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="with-header">
        <div className="doctors_page-container">
          {doctors.map(doctor => (
            <PersonelItem key={doctor.id} doctor={doctor} generatePDF={generatePDF} />
          ))}
        </div>
        <Footer />
      </div>
      <ToastContainer />
    </>
  );
}

export default Personel;
