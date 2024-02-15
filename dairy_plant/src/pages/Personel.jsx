import React, { useState, useEffect } from 'react';
import PersonelItem from '../components/PersonelItem';
import Footer from '../components/Footer';
import personelData from './personelData.json'
import './../styles/personel.css'


const Personel = () => {
  const [doctors, setPersonel] = useState([]);

  useEffect(() => {
    setPersonel(personelData)
  }, []);


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