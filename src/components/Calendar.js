import { useState, useEffect, useCallback } from 'react';
import { IoCaretBackCircle, IoCaretForwardCircle } from "react-icons/io5";
import TimeSlotModal from './TimeSlotModal';
import './calendar.css';

const Calendar = ({ disableOffDays, data }) => {

  const [navMonth, setNavMonth] = useState(0);
  const monthNum = new Date(new Date().setMonth(new Date().getMonth() + navMonth, 1)).getMonth();
  const monthName = new Date(new Date().setMonth(monthNum, 1)).toLocaleDateString('en-us', { month: 'long' });
  const fullYear = new Date(new Date().setMonth(new Date().getMonth() + navMonth, 1)).getFullYear();
  const paddingDays = new Date(fullYear, monthNum, 1).getDay();
  const daysInMonth = new Date(fullYear, monthNum + 1, 0).getDate();

  const [anySlotSelected, setAnySlotSelected] = useState(false);

  // Modal states
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      setTimeSlots([]);
    }, 400);
    setAnySlotSelected(false);
  };
  const handleShow = () => setShow(true);

  const [dateInfo, setDateInfo] = useState('Default dateInfo');
  const [timeSlots, setTimeSlots] = useState([]);

  const load = useCallback(() => {
    const day = new Date().getDate();

    document.getElementById('calendar').innerHTML = '';

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
      const daySquare = document.createElement('div');
      daySquare.classList.add('day');

      if (i > paddingDays) {
        daySquare.innerHTML = `<span>${i - paddingDays}</span>`;
        const dateMade = `${fullYear}-${(monthNum + 1)}-${i - paddingDays}`;
        const dayMade = new Date(dateMade).toLocaleDateString('en-us', { weekday: 'short' }).toLowerCase();
        daySquare.setAttribute('date', dateMade);
        daySquare.classList.add(dayMade);

        if (i - paddingDays === day && navMonth === 0) {
          daySquare.id = 'currentDay';
        }
        if (new Date(dateMade) < new Date().setHours(0, 0, 0, 0)) {
          daySquare.classList.add("pastday");
        }
        if (new Date(dateMade) > new Date()) {
          daySquare.classList.add("futureday");
        }

      } else {
        daySquare.classList.add('padding');
      }

      document.getElementById('calendar').appendChild(daySquare);
    }
    const onDays = Object.keys(data.availibility);
    disableOffDays(onDays);

    const clickableDay = document.getElementById("calendar").querySelectorAll("div.day:not(.pastday):not(.disabled-day):not(.padding)");
    for (let i = 0; i < clickableDay.length; i++) {
      clickableDay.item(i).addEventListener('click', function () {
        const dateAttr = clickableDay.item(i).getAttribute("date");
        setDateInfo(new Date(dateAttr));
        const clickedDay = clickableDay.item(i).getAttribute("class").split(" ", 2)[1];
        const dateStrStart = dateAttr + ' ' + data.availibility[clickedDay].split(" - ")[0];
        const dateStrEnd = dateAttr + ' ' + data.availibility[clickedDay].split(" - ")[1];
        const dateEpochStart = parseInt(new Date(dateStrStart).valueOf());
        const dateEpochEnd = parseInt(new Date(dateStrEnd).valueOf());
        const durationMS = parseInt(data.visitDurationInMin) * 60 * 1000;
        let timeSlotArr = [];
        for (let j = dateEpochStart; j < dateEpochEnd; j = j + durationMS) {
          let timeSlotStart = new Date(j).toLocaleDateString('en-us', { hour: '2-digit', minute: '2-digit' }).split(', ')[1];
          let timeSlotEnd = new Date(j + durationMS - 60 * 1000).toLocaleDateString('en-us', { hour: '2-digit', minute: '2-digit' }).split(', ')[1];
          let timeSlot = timeSlotStart + ' - ' + timeSlotEnd;

          timeSlotArr.push(timeSlot);
        }
        clickableDay.item(i).addEventListener("click", handleShow());
        setTimeSlots(timeSlotArr);
      });
    }

  }, [navMonth, data.availibility, data.visitDurationInMin, daysInMonth, disableOffDays, fullYear, monthNum, paddingDays])

  useEffect(() => {
    load();
  }, [load])

  return (
    <div id="container">
      <div id="header">
        <div id="monthDisplay">{monthName} {fullYear}</div>
        <div>
          <IoCaretBackCircle id="backButton" className="backIcon" title="Previous Month" onClick={() => { setNavMonth(navMonth - 1) }} />
          <button className="btn btn-warning" onClick={() => setNavMonth(0)}>Today</button>
          <IoCaretForwardCircle id="nextButton" className="nextIcon" title="Next Month" onClick={() => { setNavMonth(navMonth + 1) }} />
        </div>
      </div>

      <div id="weekdays">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>

      <div id="calendar"></div>

      <TimeSlotModal data={data} show={show} handleClose={handleClose} dateInfo={dateInfo} timeSlots={timeSlots} anySlotSelected={anySlotSelected} setAnySlotSelected={setAnySlotSelected} />

    </div>
  )
}

export default Calendar;
