import { FaMapMarkerAlt } from "react-icons/fa";
import avatarmale from "../assets/imgs/male.jpg";
import avatarfemale from "../assets/imgs/female.jpg";

const BookingSummary = ({ data, bookingInfo }) => {
  return (
    <div className="card booking-card">
      <div className="card-header">
        <h4 className="card-title">Appointment Summary</h4>
      </div>
      <div className="card-body">

        <div className="booking-doc-info">
          <a href="doctor-profile.html" className="booking-doc-img">
            <img src={data.gender === "m" ? avatarmale : avatarfemale} alt={data.name} />
          </a>
          <div className="booking-info">
            <h4><a href="doctor-profile.html">{data.name}</a></h4>
            <div className="rating">
              Specialist Doctor
                </div>
            <div className="clinic-details">
              <p className="doc-location"><FaMapMarkerAlt /> {data.org}</p>
            </div>
          </div>
        </div>

        <div className="booking-summary">
          <div className="booking-item-wrap">
            <ul className="booking-date">
              <li>Day &amp; Date <span>{new Date(bookingInfo.date).toLocaleDateString('en-us', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}</span></li>
              <li>Time <span>{bookingInfo.time}</span></li>
            </ul>
            <ul className="booking-fee">
              <li>Consulting Fee <span>$---</span></li>
              <li>Booking Fee <span>$--</span></li>
              <li>Video Call <span>$--</span></li>
            </ul>
            <div className="booking-total">
              <ul className="booking-total-list">
                <li>
                  <span>Total</span>
                  <span className="total-cost">$---</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingSummary;