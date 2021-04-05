import { Link } from "react-router-dom";
import { FaCheckCircle, FaMapMarkerAlt } from "react-icons/fa";
import { GoCalendar } from "react-icons/go";
import avatarmale from "../assets/imgs/male.jpg";
import avatarfemale from "../assets/imgs/female.jpg";

const Doctors = ({ doctors }) => {
  return (
    <>
      {doctors.map((doctor) => {
        const { id, name, gender, org, availibility, visitDurationInMin } = doctor;
        return (
          <div className="col-sm-12 col-md-6" key={id}>
            <div className="profile-widget">
              <div className="pro-content">
                <div className="pro-header">
                  <div>
                    <img src={gender === "m" ? avatarmale : avatarfemale} alt={id} />
                  </div>
                  <div>
                    <h3 className="title">
                      <Link to={{ pathname: `doctors/${id}/schedule`, state: { data: { id, name, org, availibility, visitDurationInMin } } }}>{name}</Link> <FaCheckCircle className="verified" />
                    </h3>
                    <p className="speciality">Specialist Doctor</p>
                    <ul className="available-info">
                      <li>
                        <FaMapMarkerAlt /> {org}
                      </li>
                      <li>
                        <GoCalendar /> Available on these days: {Object.keys(availibility).map((day, ind, arr) => {
                          var str = '';
                          if (ind === arr.length - 1) {
                            str += day.substr(0, 1).toUpperCase() + day.substr(1);
                          } else {
                            str += day.substr(0, 1).toUpperCase() + day.substr(1) + ', ';
                          }
                          return str;
                        })}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="row row-sm">
                  <div className="col-6">
                    <Link to="/" className="btn btn-outline-light" style={{ width: '100%' }}>View Profile</Link>
                  </div>
                  <div className="col-6">
                    <Link to={{ pathname: `doctors/${id}/schedule`, state: { data: { id, name, gender, org, availibility, visitDurationInMin } } }} className="btn btn-info" style={{ width: '100%' }}>View Schedule</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default Doctors;