import React, { useState } from "react";
import './../styles/personelItem.css'
import MyPopup from './CustomPopup'
import axios from 'axios';

const PersonelItem = ({ doctor }) => {
  const [isShow, setIsShow] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editedMember, setEditedMember] = useState(null);
  const [isAddSuccess, setIsAddSuccess] = useState(false);
  const [isShowAlert, setIsShowAlert] = useState(false);

  function handleMemberChange(member) {
    setIsShow(false);
    setEditedMember(member);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setEditedMember((prevMember) => ({
      ...prevMember,
      [name]: value,
    }));
  }

  function handleSaveChanges(other) {
    setEditedMember(null);
    doctor.members.map(async member => {
      if (member.id === other.id) {
        if (editedMember.name !== '' && editedMember.contact !== '' && editedMember.experience !== '') {
          member.name = editedMember.name;
          member.contact = editedMember.contact;
          member.experience = editedMember.experience;

          try {
            await axios.put(`http://localhost:3001/members/${member.id}`, {
              name: member.name,
              contact: member.contact,
              experience: member.experience
            });
            console.log('Member information updated successfully');
          } catch (error) {
            console.error('Error updating member information:', error.response.data);
          }
        }
      }
    });
    setIsShow(true);
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function handleSaveAddingChange() {
    let isUniq = false;
    let randomId;

    do {
      randomId = getRandomInt(103, 999);
      isUniq = !doctor.schedule.some(one => one.id === randomId);
    } while (!isUniq);

    try {
      if (isUniq) {
        setIsShowAlert(true);
        if (editedMember?.date !== undefined && editedMember?.time !== undefined && editedMember?.room !== undefined) {
          const newSchedule = {
            positionId: doctor.id,
            date: editedMember.date,
            time: editedMember.time,
            room: editedMember.room
          };

          axios.post('http://localhost:3001/schedules', newSchedule)
            .then(response => {
              console.log('Schedule added successfully:', response.data.schedule);
              doctor.schedule.push(response.data.schedule);
              setIsAdding(false);
              setIsAddSuccess(true);
            })
            .catch(error => {
              console.error('Error adding schedule:', error.response.data.error);
              setIsAdding(false);
              setIsAddSuccess(false);
            });
        } else {
          setIsAddSuccess(false);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setIsAdding(false);
      setEditedMember(null);
    }
  }

  function handleCancelChanges() {
    setIsShow(true);
    setEditedMember(null);
    setIsAdding(false);
  }

  function handleAddShedule() {
    setIsAdding(true);
  }
  return (
    <div className="doctor-container">
      {isShowAlert && (isAddSuccess ? (
        <div className="alert alert-success text-bg-success" role="alert">
          Добавление выполнено успешно!
          <button style={{ padding: '.7rem' }} onClick={() => setIsShowAlert(false)} type="button" className="btn-close" aria-label="Close"></button>
        </div>
      ) : (<div className="alert alert-success text-bg-danger" role="alert">
        Не все поля заполнены!
        <button style={{ padding: '.7rem' }} onClick={() => setIsShowAlert(false)} type="button" className="btn-close" aria-label="Close"></button>
      </div>))}


      <div className="doctorItem-title">
        <h2 className="doctor-name">{doctor.name}</h2>
      </div>
      <div className="doctor-body-container">
        <div className="doctor-member">
          <ul className="doctorItem-member-container">
            {doctor.members.map(member => (
              <li key={member.id} >
                <div className="doctor_member-textbox">
                  <h3 className="doctorItem_member-name">{member.name}</h3>
                  <p>Стаж работы: {member.experience}</p>
                </div>
                <MyPopup
                  item={<button className='popup-btn'>Подробнее</button>}
                  popupContent={<div style={{
                    display: 'flex',
                    gap: '2rem', padding: '2rem 3rem'
                  }}>

                    {isShow ? <div style={{ fontSize: '1.2rem' }}>
                      <p style={{ fontSize: '2rem', margin: '1rem 0' }}>{member.name}</p>
                      <p style={{ marginBottom: '.5rem' }}>Контакты: {member.contact}</p>
                      <p style={{ marginBottom: '.7rem' }}>Стаж работы: {member.experience}</p>
                      <button className="popup-btn" onDoubleClick={() => handleMemberChange(member)}>Изменить</button>
                    </div> : <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <label htmlFor="name">Имя</label>
                      <input
                        type="text"
                        name="name"
                        value={editedMember?.name || ''}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="contact">Контакты</label>
                      <input
                        type="text"
                        name="contact"
                        value={editedMember?.contact || ''}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="experience">Стаж работы</label>
                      <input
                        type="text"
                        name="experience"
                        value={editedMember?.experience || ''}
                        onChange={handleInputChange}
                      />
                      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button className="popup-btn" onClick={() => handleSaveChanges(member)}>Сохранить</button>
                        <button className="popup-btn" onClick={handleCancelChanges}>Отмена</button>
                      </div>
                    </div>}
                  </div>}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="doctorItem-schedule">
          <h3 className="doctorItem_schedule-title">Расписание:</h3>
          <div className="doctor_schedule-textbox">
            {doctor.schedule.map(item => (
              <li key={item.id}>
                <p className="doctorItem_shedule date">Дата: {item.date}</p>
                <p className="doctorItem_shedule time">Время: {item.time}</p>
                <p className="doctorItem_shedule room">Место: {item.room}</p>
                <hr />
              </li>
            ))}
            {!isAdding ?
              <button onClick={handleAddShedule} className="popup-btn" style={{ marginLeft: '15%' }}>Добавить</button>
              :
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <input type="date"
                  name="date"
                  value={editedMember?.date || ''}
                  onChange={handleInputChange} />
                <input type="time"
                  name="time"
                  value={editedMember?.time || ''}
                  onChange={handleInputChange} />
                <input type="text" placeholder="Место"
                  name="room"
                  value={editedMember?.room || ''}
                  onChange={handleInputChange} />
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
                  <button className="popup-btn" onClick={handleSaveAddingChange}>Добавить</button>
                  <button onClick={handleCancelChanges} className="popup-btn">Отмена</button>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};


export default PersonelItem;