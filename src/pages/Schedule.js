import { useCallback } from "react";
import { useLocation, useParams } from "react-router";
import Calendar from "../components/Calendar";
import avatarmale from "../assets/imgs/male.jpg";
import avatarfemale from "../assets/imgs/female.jpg";

const Schedule = () => {

  const { state } = useLocation();

  const { handle } = useParams();

  const disableOffDays = useCallback((arr) => {
    const week = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    week.forEach(weekday => {
      if (!arr.includes(weekday)) {
        var className = weekday;
        var eachClassCollection = document.getElementById("calendar").querySelectorAll(`div.${className}:not(.pastday)`);
        for (var i = 0; i < eachClassCollection.length; i++) {
          eachClassCollection.item(i).classList.add("disabled-day");
        }
      }
    })
  }, [])

  return (
    <div className="row">
      <div className="col-md-5 col-lg-4">
        <div className="profile-sidebar">
          <div className="widget-profile pro-widget-content">
            <div className="profile-info-widget">
              <div className="booking-doc-img">
                <img
                  src={parseInt(handle) === 1 ? avatarmale : avatarfemale}
                  alt={state.data.name}
                />
              </div>
              <div className="profile-det-info">
                <h3>{state.data.name}</h3>
                <div className="patient-details">
                  <h5 className="mb-0">Specialist Doctor</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-7 col-lg-8">
        <div className="card">
          <div className="card-body">
            <Calendar disableOffDays={disableOffDays} data={state.data} />
          </div>
        </div>
      </div>
    </div >
  );
};

export default Schedule;
