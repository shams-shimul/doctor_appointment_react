import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from 'react-router-dom';

const BookingForm = () => {
  const { state } = useLocation();
  const [patientInfo, setPatientInfo] = useState({ firstName: '', lastName: '', email: '', phone: '', pretext: '' });

  const [tncStatus, setTncStatus] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const formValidityHandle = useCallback(() => {
    if (patientInfo.firstName && patientInfo.lastName && patientInfo.email && patientInfo.phone && tncStatus) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [patientInfo, tncStatus]);

  const checkVal = (e) => {
    if (!e.target.value) {
      e.target.style.borderColor = "red";
      e.target.previousElementSibling.style.color = "red";
      e.target.placeholder = "⚠️ Required";
    } else {
      e.target.style.borderColor = "#dbdbdb";
      e.target.previousElementSibling.style.color = "#959595";
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPatientInfo({ ...patientInfo, [name]: value });
    checkVal(e);
  };

  const bookSlot = useCallback((e) => {
    if (isFormValid) {
      sessionStorage.setItem(`bookedDate-${state.bookingInfo.id}`, state.bookingInfo.date);
      sessionStorage.setItem(`bookedTime-${state.bookingInfo.id}`, state.bookingInfo.time);
    }
    else {
      alert("Please fill out all required fields and check the T&C checkbox.");
      e.preventDefault();
    }
  }, [isFormValid, state.bookingInfo.id, state.bookingInfo.date, state.bookingInfo.time])

  useEffect(() => {
    formValidityHandle();
  }, [formValidityHandle])

  return (
    <form>
      <div className="info-widget">
        <h4 className="card-title">Personal Information</h4>
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <div className="form-group card-label">
              <label htmlFor="fName">First Name</label>
              <input className="form-control" name="firstName" id="fName" type="text" value={patientInfo.firstName} onChange={handleChange} onBlur={checkVal} />
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="form-group card-label">
              <label htmlFor="lName">Last Name</label>
              <input className="form-control" name="lastName" id="lName" type="text" value={patientInfo.lastName} onChange={handleChange} onBlur={checkVal} />
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="form-group card-label">
              <label htmlFor="email">Email</label>
              <input className="form-control" name="email" id="email" type="email" value={patientInfo.email} onChange={handleChange} onBlur={checkVal} />
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="form-group card-label">
              <label htmlFor="phone">Phone</label>
              <input className="form-control" name="phone" id="phone" type="text" value={patientInfo.phone} onChange={handleChange} onBlur={checkVal} />
            </div>
          </div>
          <div className="col-sm-12">
            <div className="form-group card-label">
              <label htmlFor="pretext">Pretext of Current Health Issues (optional)</label>
              <textarea className="form-control" name="pretext" id="pretext" onChange={handleChange} >{patientInfo.pretext}</textarea>
            </div>
          </div>
        </div>
      </div>

      <div className="payment-widget">
        <h4 className="card-title">Payment Method <span className='text-muted'>[ Dummy Section ]</span></h4>
        <div className="payment-list">
          <label className="payment-radio credit-card-option">
            <input type="radio" name="radio" checked />
            <span className="checkmark"></span>
                    Credit card
                  </label>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group card-label">
                <label htmlFor="card_name">Name on Card</label>
                <input className="form-control" id="card_name" type="text" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group card-label">
                <label htmlFor="card_number">Card Number</label>
                <input className="form-control" id="card_number" placeholder="1234  5678  9876  5432" type="text" />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group card-label">
                <label htmlFor="expiry_month">Expiry Month</label>
                <input className="form-control" id="expiry_month" placeholder="MM" type="text" />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group card-label">
                <label htmlFor="expiry_year">Expiry Year</label>
                <input className="form-control" id="expiry_year" placeholder="YY" type="text" />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group card-label">
                <label htmlFor="cvv">CVV</label>
                <input className="form-control" id="cvv" type="text" />
              </div>
            </div>
          </div>
        </div>
        <div className="payment-list">
          <label className="payment-radio paypal-option">
            <input type="radio" name="radio" />
            <span className="checkmark"></span>
                    Paypal
          </label>
        </div>

        <div className="terms-accept">
          <div className="custom-checkbox">
            <input type="checkbox" id="terms_accept" onClick={() => { setTncStatus(!tncStatus) }} />
            <label htmlFor="terms_accept" >&nbsp;I have read and accept <span className="disabled">Terms &amp; Conditions</span></label>
          </div>
        </div>

        <div className="submit-section mt-4">
          <Link to={{ pathname: `/doctors/${state.data.id}/appointment-confirmation`, state: { data: state.data, bookingInfo: state.bookingInfo, patientInfo: patientInfo } }} className={isFormValid ? "btn btn-info submit-btn" : "btn btn-secondary disabled submit-btn"} onClick={bookSlot}>Confirm and Pay</Link>
        </div>

      </div>
    </form>
  );
}
export default BookingForm;