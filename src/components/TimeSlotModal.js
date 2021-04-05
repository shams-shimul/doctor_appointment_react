import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaArrowCircleRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useState } from 'react';

const TimeSlotModal = (props) => {

  const [bookingInfo, setBookingInfo] = useState({});

  const { data, show, handleClose, dateInfo, timeSlots, anySlotSelected, setAnySlotSelected } = props;

  const toggleSlotClass = (index) => {
    setBookingInfo({ ...bookingInfo, id: index, date: dateInfo, time: timeSlots[index], })

    document.getElementById(`slot-${index}`).classList.toggle('btn-timing');

    let restSlots = document.querySelectorAll(`.time-slot-btn:not(#slot-${index})`);
    for (let i = 0; i < restSlots.length; i++) {
      if (restSlots.item(i).classList.contains("btn-outline-success")) {
        restSlots.item(i).classList.remove("btn-outline-success")
        restSlots.item(i).classList.add("btn-timing")
      }
    }
    document.getElementById(`slot-${index}`).classList.toggle('btn-outline-success');

    let allSlots = document.querySelectorAll(".time-slot-btn");
    for (let i = 0; i < allSlots.length; i++) {
      if (allSlots.item(i).classList.contains("btn-outline-success")) {

        setAnySlotSelected(true);
        return;
      }
      if (i === (allSlots.length - 1)) {
        setAnySlotSelected(false);
      }
    }
  }

  const checkBookedStatus = (timestr, id) => {
    if (sessionStorage.getItem(`bookedDate-${id}`) === dateInfo.toString() && sessionStorage.getItem(`bookedTime-${id}`) === timestr) {
      return true
    }
    return false;
  }

  return (
    <Modal size="lg" show={show} backdrop="static" onHide={handleClose}
      keyboard={false} centered>
      <Modal.Header closeButton>
        <Modal.Title>Choose from available time slots on <h3 style={{ marginTop: '0.5em', color: '#009efb' }}>{new Date(dateInfo).toLocaleDateString('en-us', { weekday: 'long', month: 'long', year: 'numeric', day: 'numeric' })}</h3></Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row>
            {timeSlots.map((item, index) => {
              if (checkBookedStatus(item, index)) {
                return (
                  <Col xs={12} md={4}>
                    <button disabled id={`slot-${index}`} className='time-slot-btn mt-1 mb-1 btn btn-block btn-timing-disabled' onClick={() => toggleSlotClass(index)} title="Not available" >
                      {item}
                    </button>
                  </Col>
                )
              } else {
                return (
                  <Col xs={12} md={4}>
                    <button id={`slot-${index}`} className='time-slot-btn mt-1 mb-1 btn btn-block btn-timing' onClick={() => toggleSlotClass(index)} >{item}
                    </button>
                  </Col>
                )
              }
            })}
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer style={{ justifyContent: 'center' }}>
        <Link to={anySlotSelected ? { pathname: `/doctors/${data.id}/appointment`, state: { data: data, bookingInfo: bookingInfo } } : ""} className={anySlotSelected ? 'btn btn-info' : 'btn btn-outline-light active'} id="proceed-btn" style={anySlotSelected ? { cursor: 'pointer' } : { pointerEvents: 'none' }} >
          {anySlotSelected ? <>Proceed to Book Appointment <FaArrowCircleRight /></> : 'Please select ONE time-slot at a time'}
        </Link>
      </Modal.Footer>
    </Modal>
  );
}

export default TimeSlotModal