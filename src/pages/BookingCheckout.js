import { useLocation } from "react-router";
import BookingForm from "../components/BookingForm";
import BookingSummary from "../components/BookingSummary";

const BookingCheckout = () => {
  const { state } = useLocation();
  return (
    <div className="row">

      <div className="col-md-7 col-lg-8">
        <div className="card">
          <div className="card-body">
            <BookingForm data={state.data} bookingInfo={state.bookingInfo} />
          </div>
        </div>
      </div>

      <div className="col-md-5 col-lg-4">
        <BookingSummary data={state.data} bookingInfo={state.bookingInfo} />
      </div>

    </div>
  )
}

export default BookingCheckout;