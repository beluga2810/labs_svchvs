import './../styles/scheduleItem.css'
import React, { useState } from "react";

const ScheduleItem = ({schedule}) => {
    const [schedule_item, setSchedule_item] = useState({
        id: schedule.id,
        room: schedule.room,
        doctor: schedule.doctor,
        date:schedule.date,
        time: schedule.time,
        status: schedule.status
    }
    );
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    function handleDropdownItemClick(value) {
        setSchedule_item(prevState => ({
            ...prevState,
            status : value
          }));
      }
    function handleDeleteFunction() {
        setIsPopupOpen(true);
    }
    function handleCancel(){
        setIsPopupOpen(false);
    }
    function handleConfirm(schedule_id) {
        if (schedule.id === schedule_id) {
          setSchedule_item(prevState => ({
            ...prevState,
            id: null,
            room: "",
            doctor: "",
            date: "",
            time: "",
            status: ""
          }));
          console.log(schedule_item);
          handleCancel();
        } else {
          handleCancel();
        }
      }
    const rowClassName = schedule_item === null ? "schedule_item-tr-hidden" : "schedule_item-tr";
    return ( 
        <>

           {!isPopupOpen&&
           <tr className={rowClassName} key={schedule.id}>
                <td>{schedule.room}</td>
                <td>{schedule.doctor}</td>
                <td>{schedule.date}</td>
                <td>{schedule.time}</td>
                <td>
                    <div class="dropdown">
                        <button className='dropdown-btn' class="btn dropdown-toggle" type="button-d" data-bs-toggle="dropdown" aria-expanded="false">
                            {schedule_item.status}
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#" onClick={() => handleDropdownItemClick('Работает')}>Работает</a></li>
                            <li><a class="dropdown-item" href="#" onClick={() => handleDropdownItemClick('Не работает')}>Не работает</a></li>
                        </ul>
                    </div>
                </td>
            </tr>
           } 
            
        </>
     );
}
 
export default ScheduleItem;