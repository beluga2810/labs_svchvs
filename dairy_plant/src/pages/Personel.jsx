import React, { useState, useEffect } from 'react';
import PersonelItem from '../components/PersonelItem';
import Footer from '../components/Footer';
import './../styles/personel.css'
import axios from 'axios';


const Personel = () => {
  const [doctors, setPersonel] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/personnel');

        setPersonel(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [])

  if (doctors.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="doctors_page-container">
        {doctors.map(doctor => (
          <PersonelItem key={doctor.id} doctor={doctor} />
        ))}
      </div>
      <Footer />
    </>

  );
}

export default Personel;